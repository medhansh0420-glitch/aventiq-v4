'use client';
import { useEffect, useMemo, useState } from 'react';
import { UserRound, Search, CalendarClock, Video, Copy, ExternalLink, Plus, Check } from 'lucide-react';

type Profile = { name:string; headline:string; bio:string; education:string; skills:string; guidance:string; price:string; duration:string; linkedin:string };
type Mentor = { id:string; name:string; headline:string; skills:string[]; guidance:string; price:number; duration:number; bio:string; initials:string };
const demoMentors: Mentor[] = [
 {id:'mentor-a',name:'Aarav Sharma',headline:'Computer Science student · Hackathon finalist',skills:['React','Python','Hackathons'],guidance:'Hackathons & projects',price:399,duration:30,bio:'Practical help with project planning, hackathon preparation and building a strong student portfolio.',initials:'AS'},
 {id:'mentor-b',name:'Mira Kapoor',headline:'Scholarship recipient · Application mentor',skills:['Scholarships','Essays','Applications'],guidance:'Scholarships & applications',price:299,duration:30,bio:'Guidance on researching scholarships, organizing application timelines and making essays clearer.',initials:'MK'},
 {id:'mentor-c',name:'Kabir Singh',headline:'Research intern · Undergraduate researcher',skills:['Research','CV','Academics'],guidance:'Research & academic paths',price:499,duration:45,bio:'Discuss research opportunities, outreach preparation and ways to present academic interests.',initials:'KS'}
];
export default function MentorMarketplace(){
 const [profile,setProfile]=useState<Profile>({name:'',headline:'',bio:'',education:'',skills:'',guidance:'',price:'299',duration:'30',linkedin:''});
 const [saved,setSaved]=useState(false); const [query,setQuery]=useState(''); const [rooms,setRooms]=useState<{id:string;mentor:string;topic:string;url:string}[]>([]);
 useEffect(()=>{try{const p=localStorage.getItem('aventiq-profile');if(p){setProfile(JSON.parse(p));setSaved(true)} const r=localStorage.getItem('aventiq-mentor-rooms');if(r)setRooms(JSON.parse(r))}catch{}},[]);
 const mentors=useMemo(()=>demoMentors.filter(m=>(m.name+' '+m.headline+' '+m.skills.join(' ')+' '+m.guidance).toLowerCase().includes(query.toLowerCase())),[query]);
 const update=(k:keyof Profile,v:string)=>setProfile(p=>({...p,[k]:v}));
 const saveProfile=(e:React.FormEvent)=>{e.preventDefault();try{localStorage.setItem('aventiq-profile',JSON.stringify(profile));setSaved(true)}catch{setSaved(false)}};
 const book=(mentor:Mentor)=>{const id='aventiq-'+mentor.id+'-'+Math.random().toString(36).slice(2,9);const url=`https://meet.jit.si/${id}`;const next=[{id,mentor:mentor.name,topic:mentor.guidance,url},...rooms].slice(0,8);setRooms(next);try{localStorage.setItem('aventiq-mentor-rooms',JSON.stringify(next))}catch{};window.open(url,'_blank','noopener,noreferrer')};
 const copy=(url:string)=>{if(navigator.clipboard)navigator.clipboard.writeText(url)};
 return <section className="section container" id="mentors">
  <div className="section-head"><div><div className="section-kicker">People to learn from</div><h2>Find your mentor</h2></div><p>Explore guidance profiles, compare session prices and start a one-to-one conversation. Demo mentor profiles are illustrative.</p></div>
  <div className="mentor-layout">
   <div className="mentor-discover">
    <div className="mentor-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search skills, topics or mentors"/></div>
    <div className="mentor-cards">{mentors.map(m=><article className="mentor-card" key={m.id}>
      <div className="mentor-card-top"><div className="mentor-avatar">{m.initials}</div><div className="mentor-price"><strong>₹{m.price}</strong><small>/{m.duration} min</small></div></div>
      <h3>{m.name}</h3><p className="mentor-headline">{m.headline}</p><p className="mentor-bio">{m.bio}</p>
      <div className="tags">{m.skills.map(s=><span className="tag" key={s}>{s}</span>)}</div>
      <div className="mentor-guidance">{m.guidance}</div>
      <button className="primary mentor-book" type="button" onClick={()=>book(m)}><Video size={15}/> Request guidance</button>
    </article>)}
    {mentors.length===0&&<div className="empty">No mentor matches yet. Try another keyword.</div>}</div>
    <p className="mentor-note">Prototype note: these are sample profiles. Booking opens a Jitsi room; payment, identity verification, availability and platform-wide booking storage are not connected yet.</p>
   </div>
   <aside className="profile-panel"><div className="profile-panel-title"><UserRound size={19}/><div><h3>Your guide profile</h3><p>Create a portfolio students can discover.</p></div></div>
    <form className="profile-form" onSubmit={saveProfile}>
     <label>Full name<input required value={profile.name} onChange={e=>update('name',e.target.value)} placeholder="Your name"/></label>
     <label>Headline<input value={profile.headline} onChange={e=>update('headline',e.target.value)} placeholder="e.g. Research scholar & mentor"/></label>
     <label>Education<input value={profile.education} onChange={e=>update('education',e.target.value)} placeholder="College, degree, year"/></label>
     <label>About / portfolio<textarea rows={3} value={profile.bio} onChange={e=>update('bio',e.target.value)} placeholder="Experience, achievements and how you can help"/></label>
     <label>Skills<input value={profile.skills} onChange={e=>update('skills',e.target.value)} placeholder="Python, essays, research…"/></label>
     <label>Guidance topics<input value={profile.guidance} onChange={e=>update('guidance',e.target.value)} placeholder="What can students consult you about?"/></label>
     <div className="profile-two"><label>Price (₹)<input type="number" min="0" value={profile.price} onChange={e=>update('price',e.target.value)}/></label><label>Session (min)<select value={profile.duration} onChange={e=>update('duration',e.target.value)}><option>15</option><option>30</option><option>45</option><option>60</option></select></label></div>
     <label>LinkedIn URL<input type="url" value={profile.linkedin} onChange={e=>update('linkedin',e.target.value)} placeholder="https://linkedin.com/in/…"/></label>
     <button className="primary" type="submit"><Check size={15}/>{saved?'Update profile':'Save profile'}</button>
     <small>Profile is saved in this browser in this prototype, not published globally.</small>
    </form>
   </aside>
  </div>
  {rooms.length>0&&<div className="mentor-room-history"><h3><CalendarClock size={18}/> Your recent mentor rooms</h3>{rooms.map(r=><div className="mentor-room" key={r.id}><div><strong>{r.mentor}</strong><small>{r.topic} · {r.id}</small></div><div className="mentor-room-actions"><button className="secondary" onClick={()=>copy(r.url)} type="button"><Copy size={14}/> Copy invite</button><a className="apply" href={r.url} target="_blank" rel="noreferrer">Join <ExternalLink size={13}/></a></div></div>)}</div>}
 </section>
}
