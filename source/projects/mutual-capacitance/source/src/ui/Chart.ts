import {DATA} from '../physics/data.js';
import {sample,ModelState} from '../physics/model.js';
import {Scene} from '../scenes/definitions.js';
// 2026-10-23: charts are drawn at the container's real pixel size, so text and line weights keep their
// proportions in every layout. Air data only; the er=4 curves stay in the data file but are not shown.
const pf=(v:number)=>v*1e12;
type Pt={x:number;y:number|null};
const AIR=DATA.curves['1'] as any[];
const finest=(rows:any[])=>rows.filter(r=>r.nl===Math.max(...rows.map(x=>x.nl)));
interface Panel{l:number;r:number;t:number;b:number;x0:number;x1:number;y0:number;y1:number;}
export class Chart{
 root:HTMLElement;last='';
 constructor(parent:HTMLElement){this.root=document.createElement('section');this.root.className='chart';parent.append(this.root);}
 update(scene:Scene,s:ModelState){
  const kind=scene.chart;this.root.classList.toggle('hidden',kind==='none');if(kind==='none'){this.last='';return;}
  const W=Math.max(240,Math.round(this.root.clientWidth)),H=Math.max(160,Math.round(this.root.clientHeight));
  const key=[scene.id,s.theta.toFixed(3),W,H].join('|');if(key===this.last)return;this.last=key;
  const fs=Math.round(Math.min(28,Math.max(20,W/40))),head=kind==='theta'?0:Math.round(fs*2.4),Hh=H-head;
  const out:string[]=[];
  const X=(p:Panel,v:number)=>p.l+(v-p.x0)/(p.x1-p.x0)*(p.r-p.l),Y=(p:Panel,v:number)=>p.b-(v-p.y0)/(p.y1-p.y0)*(p.b-p.t);
  const line=(p:Panel,pts:Pt[],cls:string)=>{let d='',on=false;for(const q of pts){if(q.y===null||!Number.isFinite(q.y)||q.x<p.x0-1e-9||q.x>p.x1+1e-9){on=false;continue;}d+=`${on?'L':'M'}${X(p,q.x).toFixed(1)},${Y(p,q.y).toFixed(1)}`;on=true;}return `<path class="trace ${cls}" d="${d}"/>`;};
  const axes=(p:Panel,xt:number[],yt:number[],xl:string,yl:string,xs='°',showX=true)=>{let g='';for(const t of yt)g+=`<path class="grid${t===0?' zero':''}" d="M${p.l},${Y(p,t).toFixed(1)}H${p.r}"/><text class="tick" x="${p.l-8}" y="${(Y(p,t)+fs*.35).toFixed(1)}" text-anchor="end">${t}</text>`;
   for(const t of xt)g+=`<path class="xtick" d="M${X(p,t).toFixed(1)},${p.b}v5"/>`+(showX?`<text class="tick" x="${X(p,t).toFixed(1)}" y="${p.b+fs+8}" text-anchor="middle">${t}${xs}</text>`:'');
   g+=`<path class="axis" d="M${p.l},${p.t-4}V${p.b}H${p.r}"/><text class="axis-title" x="${p.l}" y="${p.t-fs*.9}">${yl}</text>`;if(showX&&xl)g+=`<text class="axis-title" x="${p.r}" y="${p.b+fs*2.5+6}" text-anchor="end">${xl}</text>`;return g;};
  const cursor=(p:Panel,x:number)=>`<path class="cursor" d="M${X(p,x).toFixed(1)},${p.t-4}V${p.b}"/>`;
  const dot=(p:Panel,x:number,y:number,cls='marker',r=5.5)=>`<circle class="${cls}" cx="${X(p,x).toFixed(1)}" cy="${Y(p,y).toFixed(1)}" r="${r}"/>`;
  const label=(p:Panel,x:number,y:number,text:string,cls='note',anchor='start',dx=8,dy=-8)=>`<text class="${cls}" x="${(X(p,x)+dx).toFixed(1)}" y="${(Y(p,y)+dy).toFixed(1)}" text-anchor="${anchor}">${text}</text>`;
  const bem=AIR.map(r=>({x:r.theta_deg,y:pf(r.C_F)})),strip=AIR.map(r=>({x:r.theta_deg,y:r.analytic.strip_F===null?null:pf(r.analytic.strip_F)})),sector=AIR.map(r=>({x:r.theta_deg,y:r.analytic.wedge_F===null?null:pf(r.analytic.wedge_F)}));
  const now=sample(s.theta,1),c=pf(now.C_F),L=Math.round(fs*3.3),R=W-Math.round(fs*1.2);
  let legend='',note='';
  if(kind==='theta'){
   const p:Panel={l:L,r:R,t:fs*2.4,b:Hh-fs*3.6,x0:0,x1:180,y0:0,y1:25};
   out.push(axes(p,[0,45,90,135,180],[0,5,10,15,20,25],'opening angle θ','C₂D (pF)'));
   out.push(`<path class="area" d="M${X(p,0)},${p.b}${bem.map(q=>`L${X(p,q.x).toFixed(1)},${Y(p,q.y!).toFixed(1)}`).join('')}L${X(p,180)},${p.b}Z"/>`,line(p,bem,'bem'));
   out.push(`<path class="floor" d="M${X(p,90)},${Y(p,bem.at(-1)!.y!)}H${p.r}"/>`,label(p,0,bem[0].y!,`${bem[0].y!.toFixed(2)} pF facing`,'note',undefined,10,4),label(p,180,bem.at(-1)!.y!,`${bem.at(-1)!.y!.toFixed(2)} pF side by side`,'note','end',0,-10));
   out.push(cursor(p,s.theta),dot(p,s.theta,c),label(p,s.theta,c,`${c.toFixed(2)} pF`,'value',s.theta>120?'end':'start',s.theta>120?-10:10,-12));
  }else if(kind==='strip'){
   const p:Panel={l:L,r:R,t:fs*2.4,b:Hh-fs*3.6,x0:0,x1:15,y0:0,y1:25};
   out.push(axes(p,[0,5,10,15],[0,5,10,15,20,25],'opening angle θ','C (pF)'));
   const band=bem.filter(q=>q.x<=15),sb=strip.filter(q=>q.x<=15) as {x:number;y:number}[];
   out.push(`<path class="gap" d="M${band.map(q=>`${X(p,q.x).toFixed(1)},${Y(p,q.y!).toFixed(1)}`).join('L')}L${sb.slice().reverse().map(q=>`${X(p,q.x).toFixed(1)},${Y(p,q.y).toFixed(1)}`).join('L')}Z"/>`);
   out.push(line(p,bem,'bem'),line(p,strip,'strip'));
   const st=interp(strip,s.theta);
   out.push(cursor(p,s.theta),st!==null?dot(p,s.theta,st,'marker strip-dot',4.5):'',dot(p,s.theta,c));
   out.push(label(p,7.5,interp(bem,7.5)!,'fringe the strips miss','note gap-note','start',14,-26));
   legend=`<i class="bem"></i>BEM <i class="strip"></i>Strip model`;
   note=st!==null?`Strip model at ${s.theta.toFixed(1)}°: <b>${(100*(st/c-1)).toFixed(1)}%</b>`:'';
  }else if(kind==='models'){
   const split=Math.round((Hh-fs*3.6)*.64);
   const p:Panel={l:L,r:R,t:fs*2.4,b:split,x0:0,x1:180,y0:0,y1:25},q:Panel={l:L,r:R,t:split+fs*3.2,b:Hh-fs*3.6,x0:0,x1:180,y0:-100,y1:0};
   out.push(axes(p,[0,30,60,90,120,150,180],[0,5,10,15,20,25],'','C (pF)','°',false));
   out.push(line(p,bem,'bem'),line(p,strip,'strip'),line(p,sector,'sector'));
   out.push(label(p,90,0,'strip and sector reach zero','note','start',8,-10),label(p,160,interp(bem,160)!,'minimum near 160°','note','end',0,-12));
   const err=(pts:Pt[])=>pts.map((q,i)=>({x:q.x,y:q.y===null?null:100*(q.y/bem[i].y!-1)}));
   out.push(axes(q,[0,30,60,90,120,150,180],[-100,-50,0],'opening angle θ','error vs BEM (%)'));
   out.push(line(q,err(strip),'strip'),line(q,err(sector),'sector'));
   out.push(cursor(p,s.theta),cursor(q,s.theta),dot(p,s.theta,c));
   const st=interp(strip,s.theta),se=interp(sector,s.theta);
   if(st!==null)out.push(dot(p,s.theta,st,'marker strip-dot',4),dot(q,s.theta,100*(st/c-1),'marker strip-dot',4));
   if(se!==null)out.push(dot(p,s.theta,se,'marker sector-dot',4),dot(q,s.theta,100*(se/c-1),'marker sector-dot',4));
   legend=`<i class="bem"></i>BEM <i class="strip"></i>Strip model <i class="sector"></i>Mapped sector`;
   note=`At ${s.theta.toFixed(0)}°: BEM <b>${c.toFixed(2)} pF</b>`+(st!==null?` · strip <b>${(100*(st/c-1)).toFixed(0)}%</b>`:' · strip: no overlap left');
  }else{
   const split=Math.round((Hh-fs*3.6)*.56);
   const p:Panel={l:L,r:R,t:fs*2.4,b:split,x0:0,x1:180,y0:0,y1:25},q:Panel={l:L,r:R,t:split+fs*3.2,b:Hh-fs*3.6,x0:0,x1:180,y0:-4,y1:10};
   out.push(axes(p,[0,30,60,90,120,150,180],[0,5,10,15,20,25],'','C (pF)','°',false),line(p,bem,'bem'));
   const d3=finest(DATA.checks3d.rows),fvm=[0,180].map(t=>(DATA.checksFVM.rows as any[]).filter(r=>r.theta_deg===t&&r.er===1).reduce((a,b)=>b.h_m<a.h_m?b:a));
   const cps=pf(DATA.validation.cps_thin_F),cpsDev=100*(cps/bem.at(-1)!.y!-1);
   const diamond=(pp:Panel,x:number,y:number)=>`<path class="check3d" d="M${X(pp,x).toFixed(1)},${(Y(pp,y)-7).toFixed(1)}l7,7 -7,7 -7,-7Z"/>`;
   const square=(pp:Panel,x:number,y:number)=>`<rect class="fvm" x="${(X(pp,x)-5).toFixed(1)}" y="${(Y(pp,y)-5).toFixed(1)}" width="10" height="10"/>`;
   const cross=(pp:Panel,x:number,y:number)=>`<path class="cps" d="M${(X(pp,x)-6).toFixed(1)},${(Y(pp,y)-6).toFixed(1)}l12,12M${(X(pp,x)+6).toFixed(1)},${(Y(pp,y)-6).toFixed(1)}l-12,12"/>`;
   for(const r of d3)out.push(diamond(p,r.theta_deg,pf(r.C3D_F)));
   out.push(axes(q,[0,30,60,90,120,150,180],[-4,0,5,10],'opening angle θ','difference from 2-D BEM (%)'));
   for(const r of d3){out.push(diamond(q,r.theta_deg,100*r.relativeDifference),label(q,r.theta_deg,100*r.relativeDifference,`${r.relativeDifference>0?'+':''}${(100*r.relativeDifference).toFixed(1)}%`,'note',r.theta_deg>150?'end':'start',r.theta_deg>150?-12:12,5));}
   for(const r of fvm)out.push(square(q,r.theta_deg,100*r.relative_to_bem));
   out.push(cross(q,180,cpsDev),label(q,180,cpsDev,`thin-strip limit ${cpsDev.toFixed(1)}%`,'note','end',-14,6));
   out.push(cursor(p,s.theta),dot(p,s.theta,c));
   legend=`<i class="bem"></i>2-D BEM <i class="check3d"></i>3-D <i class="fvm"></i>FVM <i class="cps"></i>Thin strip`;
   note='3-D: finite electrode width adds end fringing, so it sits above the 2-D curve';
  }
  this.root.innerHTML=`${head?`<div class="chart-heading"><div class="legend">${legend}</div><span>${note}</span></div>`:''}<svg viewBox="0 0 ${W} ${Hh}" style="font-size:${fs}px" role="img" aria-label="Capacitance against opening angle">${out.join('')}</svg>`;
 }
}
function interp(pts:Pt[],x:number):number|null{for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];if(x>=a.x&&x<=b.x){if(a.y===null||b.y===null)return null;return a.y+(b.y-a.y)*(x-a.x)/(b.x-a.x||1);}}return null;}
