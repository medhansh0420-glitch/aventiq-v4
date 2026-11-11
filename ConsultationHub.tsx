'use client';
import { useState } from 'react';
import { Video, CalendarClock, ExternalLink } from 'lucide-react';
export default function ConsultationHub() {
  const [room, setRoom] = useState('');
  const [topic, setTopic] = useState('Opportunity guidance');
  const [appointments, setAppointments] = useState<{room:string;topic:string;created:string}[]>([]);
  const makeRoom = () => `aventiq-${room.trim().toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-').slice(0,32)}-${Math.random().toString(36).slice(2,8)}`;
  const book = (e: React.FormEvent) => {
    e.preventDefault(); if (!room.trim()) return;
    const item = { room: makeRoom(), topic: topic.trim() || 'Opportunity guidance', created: new Date().toLocaleString() };
    setAppointments(prev => [item, ...prev].slice(0,5));
  };
  const join = (id: string) => window.open(`https://meet.jit.si/${encodeURIComponent(id)}`, '_blank', 'noopener,noreferrer');
  return <section className="section container" id="consultations">
    <div className="section-head"><div><div className="section-kicker">Connect</div><h2>Video consultations</h2></div><p>Create a room and invite another person to discuss an opportunity. Video meetings open through Jitsi Meet.</p></div>
    <div className="consult-panel">
      <div className="consult-intro"><div className="consult-icon"><Video size={22}/></div><h3>Discuss opportunities face to face</h3><p>Choose a topic and create a private room with a unique invite link. Share the link with the other participant; both people join the same Jitsi room.</p><p className="commission-note">Commission / paid bookings: payment processing is not connected in this build. Add a payment provider and server-side commission handling before charging users.</p></div>
      <form className="consult-form" onSubmit={book}><label>Room name<input value={room} onChange={e=>setRoom(e.target.value)} placeholder="e.g. scholarship-chat-01" maxLength={40} required/></label><label>Discussion topic<input value={topic} onChange={e=>setTopic(e.target.value)} maxLength={100}/></label><button className="primary" type="submit"><CalendarClock size={15}/> Create consultation room</button></form>
      {appointments.length>0 && <div className="consult-rooms"><h4>Your rooms (saved for this session)</h4>{appointments.map((a,i)=><div className="consult-room" key={`${a.room}-${i}`}><div><strong>{a.topic}</strong><small>{a.room} · {a.created}</small></div><button className="apply" type="button" onClick={()=>join(a.room)}>Join video <ExternalLink size={13}/></button><button className="filterbtn" type="button" onClick={()=>navigator.clipboard?.writeText(`https://meet.jit.si/${a.room}`)}>Copy invite link</button></div>)}</div>}
    </div>
  </section>;
}
