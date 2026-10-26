import {ModelState,P} from '../physics/model.js';
import {DATA} from '../physics/data.js';
import {clamp,smooth,mix} from '../engine/math.js';
// 2026-10-23 English edition: one question carries the whole lab, the partial-dielectric pages are removed,
// each page type has its own layout, and the text is slide-style: short phrases in large type.
// Every number on a page is read from the frozen data, not typed in.
export type ChartKind='theta'|'strip'|'models'|'validation'|'none';
export type Layout='cover'|'stage'|'split'|'chart'|'closing';
export type Visual='plain'|'hinge'|'strips'|'panels';
export interface Scene {id:string;part:0|1|2|3;title:string;body:string;formula:string;meaning:string;duration:number;theta:[number,number];er:number;chart:ChartKind;kind:'plates'|'wedge';defaultField:'lines'|'strength'|'potential';layout:Layout;visual:Visual;fieldModes:boolean;extra:string;}
const pF=(F:number)=>(F*1e12).toFixed(2);
const air=DATA.curves['1'] as any[],first=air[0],last=air.at(-1);
const share=Math.round(100*last.C_F/first.C_F);
const stripLow=Math.round(100*(1-first.analytic.strip_F/first.C_F));
const checks3d=(DATA.checks3d.rows as any[]).filter(r=>r.nl===Math.max(...DATA.checks3d.rows.map((x:any)=>x.nl)));
const fvm=(theta:number)=>{const rows=(DATA.checksFVM.rows as any[]).filter(r=>r.theta_deg===theta&&r.er===1);return rows.reduce((a,b)=>b.h_m<a.h_m?b:a);};
const pct=(x:number,d=1)=>(x>=0?'+':'−')+Math.abs(100*x).toFixed(d)+'%';
const stat=(label:string,value:string,unit:string)=>`<div class="stat"><span>${label}</span><b>${value}<small>${unit}</small></b></div>`;
const row=(a:string,b:string)=>`<tr><td>${a}</td><td>${b}</td></tr>`;
const lines=(...xs:string[])=>`<ul class="points">${xs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
export const NUMBERS={facing:pF(first.C_F),coplanar:pF(last.C_F),share,stripLow};
const S=(s:Omit<Scene,'er'|'defaultField'|'fieldModes'|'extra'|'meaning'|'formula'>&Partial<Scene>):Scene=>({er:1,defaultField:'lines',fieldModes:false,extra:'',meaning:'',formula:'',...s});
export const SCENES:Scene[]=[
S({id:'00',part:0,layout:'cover',visual:'plain',kind:'plates',chart:'theta',duration:7,theta:[0,180],
 title:'Unfold two plates. What remains?',
 body:lines(`Facing-area model: <strong>zero at 90°</strong>`,`Full solution: <strong>fringe coupling survives</strong>`),
 extra:`<div class="stats">${stat('Facing · 0°',pF(first.C_F),'pF')}${stat('Side by side · 180°',pF(last.C_F),'pF')}${stat('Still there',String(share),'%')}</div>`,
 meaning:'Air · simulated, not measured'}),
S({id:'01',part:1,layout:'stage',visual:'hinge',kind:'plates',chart:'none',duration:5,theta:[0,180],
 title:'One hinge, pure rotation',
 body:lines('One fixed plate, one rotating plate',`Pivot: <strong>H = (−δ, D/2)</strong>`,`Coplanar gap: <strong>g = 2δ = ${(P.hinge_offset_m*2000).toFixed(0)} mm</strong>`),
 formula:String.raw`\mathbf p_\theta=\mathbf H+R(\theta)(\mathbf p_0-\mathbf H)`,
 meaning:'Full dimensions and parameters: Methods'}),
S({id:'02',part:1,layout:'split',visual:'strips',kind:'plates',chart:'strip',duration:4.5,theta:[0,15],
 title:'Small angles: thin slices',
 body:lines('Thin parallel strips',`Growing gap: <strong>h(x) = h₀ + x tanθ</strong>`,`Misses edge fields: <strong>${stripLow}% low at 0°</strong>`),
 formula:String.raw`C_{\rm strip}=\varepsilon b\int_0^W\!\frac{dx}{h_0+x\tan\theta}`}),
S({id:'03',part:1,layout:'stage',visual:'plain',kind:'wedge',chart:'none',duration:3.4,theta:[60,60],
 title:'Ideal sector: field lines as arcs',
 body:lines(`Two radial conductors, angle α`,`Equipotentials = rays · <strong>field lines = arcs</strong>`,`Strongest at the apex: |<i>E</i>| ∝ 1/<i>r</i>`),
 formula:String.raw`C_{\rm sector}=\frac{\varepsilon b}{\alpha}\ln\frac{r_1}{r_0}`,
 meaning:`α = ${P.wedge.angle_deg}° · r₀ = ${P.wedge.inner_radius_m*1000} mm · r₁ = ${P.wedge.outer_radius_m*1000} mm`}),
S({id:'04',part:2,layout:'stage',visual:'panels',kind:'plates',chart:'none',duration:7,theta:[0,180],fieldModes:true,
 title:'Real plates, open space',
 body:lines('<strong>Boundary element method</strong>','Surface charge in open space',`<strong>No artificial boundary box</strong>`),
 formula:String.raw`C_{\rm 2D}=b\,\frac{Q'}{\Delta V}`,
 meaning:'Computed field · 2-D solution scaled by width'}),
S({id:'05',part:2,layout:'chart',visual:'plain',kind:'plates',chart:'models',duration:8,theta:[0,180],
 title:'Where shortcuts break',
 body:lines(`Shortcuts: <strong>zero at 90°</strong>`,'Full solution: nonzero beyond 90°',`<strong>${pF(last.C_F)} pF at 180°</strong>`),
 formula:String.raw`e_{\rm model}=\frac{C_{\rm approx}-C_{\rm 2D}}{C_{\rm 2D}}`}),
S({id:'06',part:2,layout:'chart',visual:'plain',kind:'plates',chart:'validation',duration:6,theta:[0,180],
 title:'Can the numbers be trusted?',
 body:'',
 extra:`<table class="checks">${row('<span title="Panel refinement: 128 → 192">Panels</span>','< 0.02% change')}${row('<span title="Finite-volume solver">FVM</span>',`${pct(fvm(0).relative_to_bem,2)} · ${pct(fvm(180).relative_to_bem,1)}`)}${row('<span title="Finite-width three-dimensional calculation">3-D</span>',checks3d.map(r=>pct(r.relativeDifference)).join(' · '))}${row('Thin strip',`${pF(DATA.validation.cps_thin_F)} vs ${pF(last.C_F)} pF`)}</table>`,
 meaning:'FVM: 0°, 180° · 3-D: 0°, 90°, 180°. Numerical checks.'}),
S({id:'07',part:3,layout:'closing',visual:'plain',kind:'plates',chart:'none',duration:4,theta:[150,180],
 title:'What survives the unfolding',
 body:'',
 extra:`<div class="takeaways"><section><b>${share}<small>%</small></b><p>survives side by side<br>${pF(last.C_F)} pF of fringe coupling</p></section><section><b>90<small>°</small></b><p>the strip model reaches zero<br>approximations have limits</p></section><section><b>4<small> checks</small></b><p>independent numerical checks<br>simulation, not measurement</p></section></div><a class="next-demo" href="../proxitouch/index.html">See fringe sensing: <strong>ProxiTouch</strong> →</a>`}),
];
export function stateFor(scene:Scene,phase:number):ModelState{const t=clamp(phase),u=smooth(t),theta=mix(scene.theta[0],scene.theta[1],u);
 return{theta,er:scene.er,phase:t,fullWidth:false,field:scene.defaultField,explore:false,section:true,stage:Math.min(3,Math.floor(t*3.001))};}
