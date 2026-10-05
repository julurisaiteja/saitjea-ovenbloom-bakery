'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { brand, getProduct, products } from '../../../lib/brand';
import { useCart } from '../../../lib/cart';

function useNicheState(product){
  const niche = "bakery";
  const v = brand.variants || {};
  const [size,setSize]=useState(v.cakeSizes[0]);
  const [flavor,setFlavor]=useState(v.flavors[0]);
  const [frosting,setFrosting]=useState(v.frostings[0]);
  const [filling,setFilling]=useState(v.fillings[0]);
  const [slot,setSlot]=useState('Tomorrow 9:00 AM');
  const slots=['Today 4:00 PM','Tomorrow 9:00 AM','Tomorrow 1:00 PM','Sat 10:00 AM'];
  const isCake=product?.cat==='Cakes';
  const price=(product?.price||0)+(isCake&&size.startsWith('8')?12:0)+(isCake&&size.startsWith('10')?28:0)+(isCake&&size.startsWith('Sheet')?40:0);
  const meta=isCake?`${size} · ${flavor} · ${frosting} · ${filling} · pickup ${slot}`:`Pickup ${slot}`;
  const lineKey=product?`${product.id}-${size}-${slot}`:'';
  const ui = (<>
      {isCake&&(<>
        <div><p className="text-sm font-semibold mb-2">Cake size</p><div className="flex flex-wrap gap-2">{v.cakeSizes.map(s=><button key={s} onClick={()=>setSize(s)} className="chip" style={{outline:size===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
        <div><p className="text-sm font-semibold mb-2">Flavor</p><div className="flex flex-wrap gap-2">{v.flavors.map(s=><button key={s} onClick={()=>setFlavor(s)} className="chip" style={{outline:flavor===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
        <div><p className="text-sm font-semibold mb-2">Frosting / Filling</p><div className="flex flex-wrap gap-2">{[...v.frostings,...v.fillings].map(s=><button key={s} onClick={()=>v.frostings.includes(s)?setFrosting(s):setFilling(s)} className="chip">{s}</button>)}</div></div>
      </>)}
      <div><p className="text-sm font-semibold mb-2">Pickup window</p><div className="flex flex-wrap gap-2">{slots.map(s=><button key={s} onClick={()=>setSlot(s)} className="chip" style={{outline:slot===s?'2px solid var(--brand)':undefined}}>{s}</button>)}</div></div>
      {(product?.dietary||[]).length>0&&<p className="text-sm">Dietary: {(product.dietary||[]).join(' · ')}</p>}
    </>);
  const details = (<ul className="text-sm text-muted space-y-1 list-disc pl-5"><li>Preorder holds your slot</li><li>Allergen chips on every bake</li><li>Custom cakes need 48h</li></ul>);
  return { price, meta, lineKey, ui, details };
}

export default function ProductPage(){
  const { id } = useParams();
  const product = getProduct(id);
  const { add, toggleWish, wish } = useCart();
  const router = useRouter();
  const custom = useNicheState(product);
  if(!product) return <div className="mx-auto max-w-6xl px-4 py-20">Product not found. <Link href="/shop" className="underline">Back to shop</Link></div>;
  const more = products.filter(p=>p.id!==id && p.cat===product.cat).slice(0,3);
  const related = more.length ? more : products.filter(p=>p.id!==id).slice(0,3);
  const faq = [
    { q:'Shipping / delivery?', a:'Demo checkout shows ETA after address entry.' },
    { q:'Returns?', a:'Most items support 30-day exchanges in this demo narrative.' },
    { q:'Need help?', a:`Ask ${brand.aiName} (bottom-right) for niche guidance.` },
  ];
  function onAdd(){ add({ id:product.id, name:product.name, price:custom.price, img:product.img, qty:1, lineKey:custom.lineKey, meta:custom.meta }); router.push('/cart'); }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="card-soft overflow-hidden aspect-square"><img src={product.img} alt={product.name} className="h-full w-full object-cover" /></div>
          <div className="mt-3 grid grid-cols-3 gap-2">{[product.img, brand.poster, products[0].img].map((src,i)=>(
            <div key={i} className="aspect-video overflow-hidden rounded-xl opacity-90"><img src={src} alt="" className="h-full w-full object-cover" /></div>
          ))}</div>
        </div>
        <div>
          <p className="text-sm text-muted">{product.cat}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-1">{product.name}</h1>
          <p className="mt-2 text-muted">{product.blurb}</p>
          <p className="mt-3 text-sm">★ {product.rating} · {product.reviews} reviews</p>
          <p className="mt-4 font-display text-3xl" style={{color:'var(--brand)'}}>${custom.price.toFixed(2)}</p>
          <div className="mt-3 flex flex-wrap gap-2">{(product.tags||[]).map(t=><span key={t} className="chip">{t}</span>)}</div>
          <div className="mt-6 space-y-5">{custom.ui}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-brand" onClick={onAdd}>Add to cart</button>
            <button className="btn-ghost" onClick={()=>toggleWish(product.id)}>{wish.includes(product.id)?'♥ Saved':'♡ Wishlist'}</button>
            <Link href="/special" className="btn-ghost">{brand.nav[1]}</Link>
          </div>
          <div className="mt-10 space-y-3"><h2 className="font-semibold text-lg">Details</h2>{custom.details}</div>
          <div className="mt-8 space-y-2"><h2 className="font-semibold text-lg">FAQ</h2>
            {faq.map(f=><details key={f.q} className="card-soft px-4 py-3"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted">{f.a}</p></details>)}
          </div>
        </div>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-3xl">You may also like</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">{related.map(p=>(
          <Link key={p.id} href={`/product/${p.id}`} className="card-soft overflow-hidden">
            <img src={p.img} alt={p.name} className="aspect-video w-full object-cover" />
            <div className="p-3 flex justify-between"><span className="font-medium">{p.name}</span><span>${p.price}</span></div>
          </Link>))}</div>
      </section>
    </div>
  );
}
