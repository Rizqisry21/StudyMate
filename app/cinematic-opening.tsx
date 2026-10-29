'use client';
import {ArrowDown,ArrowUpRight,Check,BookOpen,Clock,Users,ArrowRight,MessageCircle} from 'lucide-react';
import {Avatar,Btn} from './ui';
import {people} from './data';
import {scrollToStory} from './scroll-story';

const beats=[{label:'A seat for you',p:0},{label:'Your rhythm',p:.32},{label:'Your person',p:.53},{label:'A little hello',p:.7},{label:'Better together',p:.96}];
export function CinematicOpening({start}:{start:()=>void}){
 return <section id="hero" className="cinema-track" data-scene="cinema" aria-label="The empty seat: a StudyMate story">
  <div className="cinema-pin">
   <div className="cinema-visual">
    <img className="cinema-photo cinema-alone" data-active-range="0,0.7" src="/scenes/alone.png" alt="Dimas studying in a sunlit university library, with an empty seat beside him" fetchPriority="high" width="1024" height="572"/>
    <img className="cinema-photo cinema-together" data-active-range="0.7,1.01" src="/scenes/together.png" alt="Sarah joins Dimas at the same library table to work through a problem together" width="1024" height="572"/>
    <div className="cinema-shade"/>
   </div>
   <div className="cinema-intro" data-active-range="0,0.19"><span className="cinema-kicker">YOUR NEXT CHAPTER STARTS WITH SOMEONE.</span><h1>A little company.<br/><em>A lot of progress.</em></h1></div>
   <div className="cinema-seat" data-active-range="0,0.15"><span>ONE EMPTY SEAT.</span><span>A world of possibilities.</span><i/></div>
   <div className="cinema-first-action" data-active-range="0,0.16"><Btn onClick={start}>Find your study partner <ArrowUpRight size={18}/></Btn><button onClick={()=>scrollToStory('hero',.32)}>Scroll to meet your match <ArrowDown size={16}/></button></div>
   <div className="cinema-paper" aria-hidden="true"/>
   <div className="cinema-screen" data-active-range="0.19,0.82">
    <div className="cinema-screen-top"><span><BookOpen size={18}/> YOUR COMMON GROUND</span><span>Find. Connect. Learn Together.</span></div>
    <div className="cinema-screen-body">
     <div className="cinema-preferences"><span className="cinema-kicker">01 / YOUR RHYTHM</span><h2>Start with<br/>what makes <em>you.</em></h2><p>The subjects you love. The way you learn.<br/>The time you have.</p><div className="cinema-preference-list">
      <div className="cinema-pref pref-one"><BookOpen size={20}/><div><span>WHAT YOU’RE LEARNING</span><strong>Data Structures</strong><small>Binary trees & algorithms</small></div><Check size={18}/></div>
      <div className="cinema-pref pref-two"><Users size={20}/><div><span>HOW YOU LEARN</span><strong>Discussion & practice</strong><small>Understand it. Then try it.</small></div><Check size={18}/></div>
      <div className="cinema-pref pref-three"><Clock size={20}/><div><span>WHEN YOU’RE FREE</span><strong>Saturday evening</strong><small>19:00–21:00 · Online or on campus</small></div><Check size={18}/></div>
     </div></div>
     <div className="cinema-partner-zone">
      <div className="cinema-searching" data-active-range="0.19,0.4"><div className="cinema-search-mark"><Users size={34}/></div><span>Your kind of learner<br/>is out there.</span><small>A shared subject is just the beginning.</small></div>
      <div className="cinema-person" data-active-range="0.4,0.82"><span className="cinema-kicker">02 / YOUR PERSON</span><div className="cinema-person-heading"><Avatar person={people[0]} size="large"/><div><h3>Sarah Putri</h3><p>Computer Science<br/>Universitas Brawijaya</p></div></div><blockquote>“Let’s figure out the<br/>tricky parts together.”</blockquote><div className="cinema-compatibility"><strong><span data-cinema-count>92</span><small>%</small></strong><div><span>COMMON GROUND</span><p>Same goals.<br/>A similar rhythm.</p></div></div><div className="cinema-common"><span><Check size={15}/>Subjects</span><span><Check size={15}/>Study style</span><span><Check size={15}/>Schedule</span></div><small className="cinema-disclaimer">Illustrative match · Get to know the person, too.</small></div>
     </div>
    </div>
    <div className="cinema-connect" data-active-range="0.64,0.82"><div><MessageCircle size={19}/><span><strong>A little hello goes a long way.</strong><small>“Saturday at 7? Let’s work through binary trees.”</small></span></div><span className="cinema-connected"><Check size={16}/>You’re connected</span></div>
   </div>
   <div className="cinema-ending" data-active-range="0.86,1.01"><span className="cinema-kicker">SAME TABLE. A WHOLE NEW POSSIBILITY.</span><h2>Better,<br/><em>together.</em></h2><button onClick={()=>scrollToStory('how-it-works')}>Find your common ground <ArrowDown size={17}/></button></div>
   <figure className="cinema-still-ending"><img src="/scenes/together.png" alt="Sarah and Dimas studying together" loading="lazy" width="1024" height="572"/><figcaption>Same table. A whole new possibility.</figcaption></figure>
   <div className="cinema-bottom"><span className="cinema-edition">THE STUDYMATE STORY <span>/ 01</span></span><div className="cinema-chapters" aria-label="Opening story chapters">{beats.map((b,i)=><button key={b.label} onClick={()=>scrollToStory('hero',b.p)} data-step-button={i} aria-label={b.label}><span>{String(i+1).padStart(2,'0')}</span><i/><b>{b.label}</b></button>)}</div><span className="cinema-scroll-label">SCROLL TO EXPLORE <ArrowDown size={13}/></span></div>
  </div>
 </section>
}
