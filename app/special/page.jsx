'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brand } from '../../lib/brand';
import { useCart } from '../../lib/cart';
export default function SpecialPage(){
  const v=brand.variants;
  const [size,setSize]=useState(v.cakeSizes[1]); const [flavor,setFlavor]=useState(v.flavors[0]);
  const [frosting,setFrosting]=useState(v.frostings[0]); const [filling,setFilling]=useState(v.fillings[0]);
  const [msg,setMsg]=useState('Happy Birthday!'); const [slot,setSlot]=useState('Sat 10:00 AM');
  const { add }=useCart(); const router=useRouter();
  const price=48+(size.startsWith('10')?28:size.startsWith('Sheet')?40:size.startsWith('8')?12:0);
  function order(){ add({ id:'custom-cake', name:'Custom Cake Studio', price, img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80', qty:1, lineKey:`cake-${size}-${flavor}`, meta:`${size} · ${flavor} · ${frosting} · ${filling} · "${msg}" · ${slot}` }); router.push('/cart'); }
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <header className="special-chrome reveal">
        <p className="boho-script">layers · frosting · love notes</p>
        <h1 className="boho-brand" style={{ fontSize: 'clamp(2.8rem,8vw,4.5rem)' }}>Cake Studio</h1>
        <p className="text-muted mt-2">Layers, flavors, frosting, fillings, message, pickup.</p>
      </header>
      <div className="mt-8 space-y-5 card-soft p-6">
        {[['Size',v.cakeSizes,size,setSize],['Flavor',v.flavors,flavor,setFlavor],['Frosting',v.frostings,frosting,setFrosting],['Filling',v.fillings,filling,setFilling]].map(([label,opts,cur,set])=>(
          <div key={label}><p className="font-semibold mb-2">{label}</p><div className="flex flex-wrap gap-2">{opts.map(o=><button key={o} onClick={()=>set(o)} className="chip" style={{outline:cur===o?'2px solid var(--brand)':undefined}}>{o}</button>)}</div></div>
        ))}
        <div><p className="font-semibold mb-2">Cake message</p><input value={msg} onChange={e=>setMsg(e.target.value)} className="w-full rounded-xl px-3 py-2 bg-surface" style={{border:'1px solid color-mix(in srgb, var(--muted) 30%, transparent)'}} /></div>
        <div><p className="font-semibold mb-2">Pickup</p><div className="flex flex-wrap gap-2">{['Tomorrow 1:00 PM','Sat 10:00 AM','Sun 11:00 AM'].map(s=><button key={s} onClick={()=>setSlot(s)} className="chip" style={{outline:slot===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
        <div className="flex justify-between items-center"><p className="font-display text-3xl" style={{color:'var(--brand)'}}>${price}</p><button className="btn-brand" onClick={order}>Add to cart</button></div>
      </div>
    </div>
  );
}
