// Presentation copy: short statements for the slides; full model limits remain in About.
// The three stage openers in S19 drive the existing live highlights.
export const COPY:Record<string,{title:string;body:string}>={
 "S00":{
  title:"ProxiTouch",
  body:"**One pixel. Three stages.**\n\nOne shared electrode. Two sensing channels."
 },
 "S08":{
  title:"Sense before contact",
  body:"Unfold the plates → **the field reaches into air**.\n\nA nearby hand changes **mutual capacitance**.\n\n\\[\\boxed{S_{\\mathrm{prox}}=\\left|\\frac{\\Delta C_m}{C_{m0}}\\right|}\\]"
 },
 "S09":{
  title:"An ionic interface",
  body:"Ions form **electric double layers** at the electrodes.\n\nTwo interfaces act in series:\n\n\\[\\frac{1}{C}\\approx\\frac{1}{C_{\\mathrm{top}}}+\\frac{1}{C_{\\mathrm{bottom}}}\\]\n\n**Charge separation is interfacial.** The bulk is screened."
 },
 "S11":{
  title:"More pressure, more contact",
  body:"The flexible electrode rests on **micro-domes**.\n\nPress → domes flatten → **contact area grows**.\n\n\\[\\boxed{P\\uparrow\\Rightarrow A_{\\mathrm{eff}}\\uparrow\\Rightarrow C_{\\mathrm{EDL}}\\uparrow}\\]\n\n> Gold patches show contact."
 },
 "S12":{
  title:"Two senses, one pixel?",
  body:"**Proximity** · a field in the air\n\n**Pressure** · an ionic interface\n\n**Can one pixel do both?**"
 },
 "S13":{
  title:"One shared electrode",
  body:"The flexible centre electrode **\\(E_C\\) links both channels**.\n\nBefore touch · fringe-field sensing\n\nAfter touch · the upper ionic interface\n\n\\[\\boxed{E_H\\leftrightarrow E_C\\;\\longrightarrow\\;E_C\\leftrightarrow E_B}\\]"
 },
 "S14":{
  title:"Inside one pixel",
  body:"**\\(E_H\\)** · frame electrode\n\n**\\(E_C\\)** · flexible, shared electrode\n\n**\\(E_B\\)** · bottom electrode\n\n**Ionic-gel micro-domes**\nA thin air gap lies above."
 },
 "S19":{
  title:"One touch, two channels",
  body:"**Approach** · \\(E_H\\leftrightarrow E_C\\)\nProximity rises before contact.\n\n**Touch** · the hand-over\nBoth channels respond.\n\n**Pressure** · \\(E_C\\leftrightarrow E_B\\)\nContact area and EDL capacitance grow."
 },
 "S18":{
  title:"Read the channels in turn",
  body:"**Time-division multiplexing**\n\nHC · \\(E_H\\leftrightarrow E_C\\)\nCB · \\(E_C\\leftrightarrow E_B\\)\n\n\\[HC\\rightarrow CB\\rightarrow HC\\rightarrow\\cdots\\]\n\nFast switching makes the readout **appear continuous**."
 },
 "S20":{
  title:"Pixels become a surface",
  body:"Square pixels tile into an array.\n\nNeighbours **share frame edges**.\n\nScan to address **one pixel at a time**."
 },
 "S21":{
  title:"Two maps, one surface",
  body:"Before touch → **proximity map**\n\nAfter touch → **pressure map**\n\n**Where it nears. Where it lands. How hard it presses.**"
 },
 "S22":{
  title:"ProxiTouch",
  body:"Senses before contact.\nRegisters the first touch.\nReads local pressure.\n\n**Approach → Touch → Press**\n\n> Application concept · not experimentally validated"
 }
};
