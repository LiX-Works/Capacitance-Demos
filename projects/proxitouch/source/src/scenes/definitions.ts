import { StatePatch } from '../app/state.js';
import { CameraState } from '../engine/camera.js';
import { Vec3,mix,clamp,smooth } from '../engine/math.js';
import { COPY } from './copy.js';
export type Layout='standard'|'hero'|'ending';
export interface Beat{state:StatePatch;duration:number;cue:string;at:number;}
export interface SceneDefinition{id:string;part:'0'|'I'|'II'|'III';world:string;title:string;body:string;en:string;subtitle:string;formula:string;formulaAt:number;caption:string;layout:Layout;beats:Beat[];camera:CameraState[];scale:string;plot:'none'|'mutual'|'dual'|'mini';duration:number;}
const cam=(position:Vec3,target:Vec3=[0,.9,0],fov=34):CameraState=>({position,target,fov,offset:0});
const B=(at:number,state:StatePatch,cue=''):Beat=>({state,at,cue,duration:0});
const F=cam([8,6.4,14],[0,1.6,0]),N=cam([7.2,4.3,11.5],[0,1.1,0]);
const D=cam([8.5,8,12.5],[0,.8,0]),T=cam([9,6.2,13],[0,.9,0]),A=cam([9.5,10.5,14],[0,.6,0]),H=cam([9.6,5.4,12.6],[0,1.05,0]);
const scenes:SceneDefinition[]=[];
// 2026-10-23 English edition: the cover shows the whole idea first, the capacitor basics are merged into three
// mechanism pages, and the three single-stage pages fold into S19. Scene ids keep their original numbers so
// model code stays traceable to the reference; the HUD numbers pages by their position.
const PART:Record<number,SceneDefinition['part']>={0:'0',8:'I',9:'I',11:'I',12:'II',13:'II',14:'II',19:'II',18:'II',20:'III',21:'III',22:'III'};
function add(n:number,world:string,duration:number,beats:Beat[],camera:CameraState[],extra:Partial<SceneDefinition>={}){const id='S'+String(n).padStart(2,'0'),copy=COPY[id];scenes.push({id,part:PART[n],world,title:copy.title,body:copy.body,en:'',subtitle:'',formula:'',formulaAt:0,caption:'',layout:'standard',beats,camera,scale:'',plot:'none',duration,...extra});}
const touch=[B(0,{depth:-1,field:1}),B(.45,{depth:-.14}),B(.65,{depth:.025,field:.65}),B(1,{depth:1,field:.4})];
add(0,'signals',6.4,touch,[H,cam([8.4,5,12.8],[0,1.0,0])],{layout:'hero'});
add(8,'fringe',8.4,[B(0,{morph:0,approach:0}),B(.46,{morph:1,approach:0}),B(.56,{morph:1,approach:0}),B(1,{morph:1,approach:1})],[F,F],{plot:'mutual'});
add(9,'edl',6,[B(0,{scale:0,bias:0,interfaces:2}),B(.2,{scale:1,bias:0}),B(.4,{scale:2,bias:0}),B(.5,{scale:2,bias:.02}),B(1,{scale:2,bias:1})],[N,N],{scale:'mm → μm → nm'});
add(11,'micro',4.3,[B(0,{depth:-.12,bias:1}),B(.3,{depth:.015}),B(1,{depth:1})],[cam([8.2,5.6,12],[0,.8,0]),cam([7.2,4.6,12],[0,.7,0])]);
add(12,'question',2.6,[B(0,{depth:.5,morph:1}),B(1,{depth:.5,morph:1,scale:1})],[cam([10,8.5,19],[0,.9,0]),D]);
add(13,'shared',2.8,[B(0,{field:.6,depth:-1,explosion:0}),B(1,{field:.78,explosion:0})],[D,D]);
add(14,'structure',3,[B(0,{depth:-1,field:0,explosion:0}),B(1,{explosion:.62})],[cam([.4,16,1.6],[0,.8,0]),cam([10,6.7,13],[0,1.6,0])]);
add(19,'signals',6.4,touch,[T,T],{plot:'dual'});
add(18,'multiplex',0,[B(0,{depth:.35,field:.8,explosion:.38,mux:0})],[cam([10,7,14],[0,1.2,0]),cam([10,7,14],[0,1.2,0])]);
add(20,'array',7.2,[B(0,{arrayCount:1,merge:0,depth:-1}),B(.23,{arrayCount:4,merge:0}),B(.34,{arrayCount:4,merge:0}),B(.61,{arrayCount:4,merge:1}),B(.71,{arrayCount:4,merge:1}),B(.94,{arrayCount:16,merge:1}),B(1,{arrayCount:16,merge:1,scan:6})],[A,A]);
add(21,'surface',4.5,[B(0,{arrayCount:16,merge:1,depth:-1,curvature:.7}),B(.55,{depth:-.08}),B(.7,{depth:.04}),B(1,{depth:.85})],[A,A]);
add(22,'grasp',8,[B(0,{depth:-1}),B(.46,{depth:-.05}),B(.62,{depth:.03}),B(.92,{depth:.85}),B(1,{depth:.85})],[cam([10,7.8,15],[0,2.6,0]),cam([12,7.2,14],[0,2.6,0])],{layout:'ending'});
export const SCENES=scenes;
export const sceneById=(id:string)=>SCENES.find(s=>s.id===id)!;
export const pageNumber=(id:string)=>String(SCENES.findIndex(s=>s.id===id)).padStart(2,'0');
export function scenePatch(def:SceneDefinition,t:number):StatePatch{const frames:StatePatch[]=[];let state:StatePatch={};for(const b of def.beats){state={...state,...b.state};frames.push(state);}if(frames.length===1)return {...frames[0]};const p=clamp(t);let i=def.beats.findIndex((b,k)=>k<def.beats.length-1&&p>=b.at&&p<=def.beats[k+1].at);if(i<0)i=def.beats.length-2;const f=smooth(clamp((p-def.beats[i].at)/(def.beats[i+1].at-def.beats[i].at))),a=frames[i],b=frames[i+1],out:StatePatch={...a};for(const key of Object.keys(b) as (keyof StatePatch)[]){const av=a[key],bv=b[key];if(typeof bv==='number')out[key]=typeof av==='number'?mix(av,bv,f):bv;}return out;}
export function sceneCamera(def:SceneDefinition,t:number):CameraState{const n=def.camera.length-1;if(n<1)return structuredClone(def.camera[0]);const x=clamp(t)*n,i=Math.min(n-1,Math.floor(x)),f=smooth(x-i),a=def.camera[i],b=def.camera[i+1];return{position:a.position.map((v,k)=>mix(v,b.position[k],f)) as Vec3,target:a.target.map((v,k)=>mix(v,b.target[k],f)) as Vec3,fov:mix(a.fov,b.fov,f),offset:mix(a.offset||0,b.offset||0,f)};}
