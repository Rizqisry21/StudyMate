'use client';
import {useEffect,RefObject} from 'react';
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export const ramp=(p:number,a:number,b:number)=>clamp((p-a)/(b-a));
const ease=(v:number)=>v*v*(3-2*v);
const phase=(p:number,a:number,b:number)=>ease(ramp(p,a,b));
export function storyValues(name:string,p:number){
 if(name==='cinema')return {'--p':p,'--opening':1-phase(p,.07,.18),'--push':phase(p,.03,.3),'--paper':phase(p,.17,.27)*(1-phase(p,.78,.88)),'--screen':phase(p,.19,.29)*(1-phase(p,.76,.83)),'--pref-one':phase(p,.23,.28),'--pref-two':phase(p,.28,.33),'--pref-three':phase(p,.33,.38),'--person':phase(p,.39,.47),'--compat':phase(p,.48,.6),'--connect':phase(p,.64,.7),'--together':phase(p,.7,.73),'--pullback':phase(p,.79,.95),'--ending':phase(p,.88,.97)};
 if(name==='hero')return {'--p':p,'--lift':phase(p,0,.25),'--arrange':phase(p,.12,.48),'--intro':1-phase(p,.12,.33),'--match-copy':phase(p,.3,.46),'--score':phase(p,.42,.64),'--reason-one':phase(p,.62,.73),'--reason-two':phase(p,.72,.83),'--reason-three':phase(p,.82,.93)};
 if(name==='workflow')return {'--p':p,'--profile-step':1-phase(p,.24,.34),'--find-step':phase(p,.25,.35)*(1-phase(p,.62,.72)),'--study-step':phase(p,.64,.76),'--workflow-pair':phase(p,.26,.39),'--workflow-session':phase(p,.69,.86)};
 return {'--p':p,'--filter-subject':phase(p,0,.035),'--filter-style':phase(p,.03,.065),'--filter-time':phase(p,.06,.095),'--filters':1-phase(p,.10,.16),'--candidate-a':phase(p,.14,.18)*(1-phase(p,.29,.36)),'--candidate-b':phase(p,.18,.22)*(1-phase(p,.31,.38)),'--candidate-c':phase(p,.19,.24),'--expand':phase(p,.28,.40),'--details':phase(p,.34,.42),'--request':phase(p,.45,.50),'--connected':phase(p,.52,.57),'--chat':phase(p,.59,.65),'--message-one':phase(p,.63,.68),'--message-two':phase(p,.69,.74),'--share':phase(p,.745,.78)*(1-phase(p,.80,.84)),'--session':phase(p,.79,.835),'--calendar':phase(p,.85,.94),'--calendar-note':phase(p,.94,.99)};
}
export function scrollToStory(id:string,p=0){
 const el=document.getElementById(id);if(!el)return;
 const reduced=document.querySelector('.scroll-landing')?.getAttribute('data-reduced')==='true';
 const top=el.getBoundingClientRect().top+window.scrollY;
 const inset=el.dataset.scene==='cinema'?0:window.innerWidth<768?66:74;const height=Math.max(0,el.offsetHeight-window.innerHeight+inset);
 window.scrollTo({top:reduced?top-90:top-inset+height*p,behavior:reduced?'instant':'smooth'});
}
export function useScrollStory(root:RefObject<HTMLDivElement|null>,reduce:boolean){
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');let raf=0,disposed=false;
  const scenes=Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
  const previous=new Map<HTMLElement,number>();
  const update=()=>{raf=0;if(disposed)return;const reduced=reduce||motion.matches||window.innerHeight<600;el.dataset.reduced=String(reduced);el.dataset.compact=String(window.scrollY>24);
   const total=document.documentElement.scrollHeight-window.innerHeight;el.style.setProperty('--page-progress',String(total>0?window.scrollY/total:0));
   // Read geometry first, then write only transforms, opacity, and accessible stage state.
   const positions=scenes.map(scene=>({scene,rect:scene.getBoundingClientRect(),height:scene.offsetHeight}));
   for(const {scene,rect,height} of positions){const inset=scene.dataset.scene==='cinema'?0:window.innerWidth<768?66:74;const lead=scene.dataset.scene==='hero'&&window.innerWidth<768?window.innerHeight<=760?530:570:0;const p=clamp((inset-rect.top-lead)/Math.max(1,height-window.innerHeight+inset-lead));if(scene.dataset.scene==='cinema')el.dataset.cinemaLight=String(reduced||p>=.22&&p<.85||rect.bottom<=100);if(previous.get(scene)===p&&!reduced)continue;previous.set(scene,p);
    const name=scene.dataset.scene!;for(const [key,value] of Object.entries(storyValues(name,p)))scene.style.setProperty(key,value.toFixed(5));
    scene.dataset.progress=p.toFixed(3);const step=name==='cinema'?(p<.19?0:p<.4?1:p<.64?2:p<.85?3:4):name==='workflow'?(p<.31?0:p<.69?1:2):name==='journey'?(p<.13?0:p<.29?1:p<.45?2:p<.59?3:p<.85?4:5):(p<.36?0:1);scene.dataset.step=String(step);
    if(name==='cinema'){el.dataset.cinemaLight=String(reduced||p>=.22&&p<.85||rect.bottom<=100);const n=scene.querySelector('[data-cinema-count]');if(n)n.textContent=String(reduced?92:Math.round(92*phase(p,.48,.6)));}
    scene.querySelectorAll<HTMLElement>('[data-step-button]').forEach(button=>{const active=Number(button.dataset.stepButton)===step;button.setAttribute('aria-current',active?'step':'false');});
    scene.querySelectorAll<HTMLElement>('[data-active-range]').forEach(layer=>{const [a,b]=layer.dataset.activeRange!.split(',').map(Number);const active=reduced||(p>=a&&p<b);layer.inert=!active;layer.setAttribute('aria-hidden',String(!active));layer.dataset.active=String(active);});
    const counter=scene.querySelector<HTMLElement>('[data-match-count]');if(counter){const score=Math.round(92*phase(p,.42,.64));const next=String(reduced?92:score);if(counter.textContent!==next)counter.textContent=next;}
    const request=scene.querySelector<HTMLElement>('[data-request-label]');if(request)request.textContent=reduced?'Try connecting in the demo':p<.49?'Send study request':p<.55?'Request sent':"You’re now study partners";
   }
  };
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
  const resize=()=>{previous.clear();schedule()};
  const onMotion=()=>{previous.clear();schedule()};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);motion.addEventListener('change',onMotion);
  const observer=new ResizeObserver(resize);observer.observe(el);update();
  return()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize);motion.removeEventListener('change',onMotion)};
 },[root,reduce]);
}
