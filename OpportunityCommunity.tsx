'use client';
import { useEffect, useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';

type Review = { rating: number; comment: string; author: string; createdAt: string };
export default function OpportunityCommunity({ opportunityId }: { opportunityId: string }) {
  const key = `aventiq-community-${opportunityId}`;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('Student');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem(key); if (saved) setReviews(JSON.parse(saved)); }
    catch { /* ignore malformed local data */ }
    setReady(true);
  }, [key]);
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = comment.trim();
    if (!text) return;
    const next = [{ rating, comment: text, author: author.trim() || 'Student', createdAt: new Date().toLocaleDateString() }, ...reviews].slice(0, 50);
    setReviews(next); setComment('');
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* storage may be unavailable */ }
  };
  return <div className="community">
    <div className="community-summary"><MessageCircle size={14}/><strong>{reviews.length} reviews</strong><span>{reviews.length ? `${average.toFixed(1)} / 5` : 'Not rated yet'}</span></div>
    {reviews.slice(0, 3).map((r, i) => <div className="review" key={`${r.createdAt}-${i}`}><div className="review-head"><strong>{r.author}</strong><span>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)} · {r.createdAt}</span></div><p>{r.comment}</p></div>)}
    <form className="review-form" onSubmit={submit}>
      <label className="rating-select">Your rating <span>{Array.from({length:5}, (_,i)=><button type="button" aria-label={`Rate ${i+1} stars`} key={i} onClick={()=>setRating(i+1)} className={i<rating?'star selected':'star'}><Star size={15} fill={i<rating?'currentColor':'none'}/></button>)}</span></label>
      <input value={author} onChange={e=>setAuthor(e.target.value)} aria-label="Display name" placeholder="Display name" maxLength={40}/>
      <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share a helpful tip or experience…" maxLength={600} rows={2}/>
      <button className="review-submit" disabled={!ready || !comment.trim()} type="submit">Post review</button>
      <small>Reviews are stored in this browser for this demo. Avoid sharing personal or sensitive details.</small>
    </form>
  </div>;
}
