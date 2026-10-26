import {interaction} from '../physics/interaction.js';
import {mutualSignal} from '../models/FringeField.js';
import {ModelState} from '../app/state.js';
const MUTUAL_Y_MAX=Math.max(.01,Math.ceil(Math.max(...Array.from({length:161},(_,i)=>mutualSignal(i/160)))*1.15*100)/100);
export const mutualPlotLimit=()=>MUTUAL_Y_MAX;
export class Plots {
 root:HTMLDivElement;last='';
 constructor(parent:HTMLElement){this.root=document.createElement('div');this.root.className='plot hidden';parent.append(this.root);}
 update(type:'none'|'mutual'|'dual'|'mini',s:ModelState){
  this.root.className='plot '+type+(type==='none'?' hidden':'');
  if(type==='none'){this.last='none';return;}
  // Match SVG viewBox units to its actual CSS width. Axis text keeps its true
  // on-screen size instead of shrinking with an old fixed 380-unit diagram.
  const width=Math.max(200,Math.round(this.root.getBoundingClientRect().width));
  const font=parseFloat(getComputedStyle(this.root).fontSize)||22;
  const key=[type,s.depth,s.approach,width,font].join(',');if(key===this.last)return;this.last=key;
  const left=font*(type==='mutual'?2.4:1.45),right=width-font*.65,top=font*.62;
  const height=Math.max(104,Math.min(164,width*.37));
  const bottom=top+height,labelY=bottom+font*1.55,svgHeight=labelY+font*.48;
  const axis=`M${left},${top}V${bottom}H${right}`;
  if(type==='mutual'){
   const X=(t:number)=>left+t*(right-left),Y=(v:number)=>bottom-v/MUTUAL_Y_MAX*height;
   const path=Array.from({length:81},(_,i)=>{const t=i/80*s.approach;return `${i?'L':'M'}${X(t)},${Y(mutualSignal(t))}`;}).join(' '),signal=mutualSignal(s.approach);
   this.root.innerHTML=`<h3>Proximity response</h3><svg viewBox="0 0 ${width} ${svgHeight}" role="img" aria-label="Normalized change in mutual capacitance"><path class="axis" d="${axis}"/><text x="${left-font*.65}" y="${bottom+font*.3}" text-anchor="end">0</text><text x="${left-font*.65}" y="${top+font*.3}" text-anchor="end">${MUTUAL_Y_MAX.toFixed(2)}</text><path class="hc trace" d="${path}"/><circle class="hc dot" cx="${X(s.approach)}" cy="${Y(signal)}" r="5"/><text x="${left}" y="${labelY}">Far</text><text x="${right}" y="${labelY}" text-anchor="end">Near</text></svg><div class="readout"><span>S<sub>prox</sub></span><b>${signal.toFixed(3)}</b></div><p class="plot-note">Normalized · illustrative</p>`;return;
  }
  const row=(channel:'hc'|'cb',title:string)=>{
   const X=(d:number)=>left+(d+1)/2*(right-left),Y=(v:number)=>bottom-v*height,value=s.interaction[channel];
   const points=Array.from({length:121},(_,i)=>{const d=-1+i/60;return{d,x:X(d),y:Y(interaction(d)[channel])};}),path=(ps:typeof points)=>ps.map((p,i)=>`${i?'L':'M'}${p.x},${p.y}`).join(' ');
   return `<section class="plot-row"><h3><span class="key ${channel}"></span>${title}<b>${value.toFixed(2)}</b></h3><svg viewBox="0 0 ${width} ${svgHeight}" role="img" aria-label="${title}; normalized illustrative response"><rect class="overlap" x="${X(-.08125)}" y="${top}" width="${X(.26875)-X(-.08125)}" height="${height}"/><path class="axis" d="${axis}"/><text x="${left-font*.65}" y="${bottom+font*.3}" text-anchor="end">0</text><text x="${left-font*.65}" y="${top+font*.3}" text-anchor="end">1</text><path class="future" d="${path(points)}"/><path class="trace ${channel}" d="${path(points.filter(p=>p.d<=s.depth+.012))}"/><path class="cursor" d="M${X(s.depth)},${top}V${bottom}"/><circle class="dot ${channel}" cx="${X(s.depth)}" cy="${Y(value)}" r="5"/><text x="${left}" y="${labelY}">Approach</text><text x="${X(0)}" y="${labelY}" text-anchor="middle">Touch</text><text x="${right}" y="${labelY}" text-anchor="end">Press</text></svg></section>`;
  };
  this.root.innerHTML=row('hc','Proximity HC')+row('cb','Contact CB')+'<p class="plot-note">Normalized · illustrative</p>';
 }
}
