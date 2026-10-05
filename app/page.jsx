'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

function Stars({ n }) {
  return (
    <span className="stars">
      {'★'.repeat(Math.round(n))}
      {'☆'.repeat(5 - Math.round(n))}
    </span>
  );
}

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live =
    typeof brand.stats[0].value === 'number'
      ? brand.stats[0].value + (tick % 7)
      : brand.stats[0].value;

  const steps = [
    { n: 'one', t: 'Mix & rest', d: 'Long ferments, laminated doughs, quiet proofing.' },
    { n: 'two', t: 'Oven bloom', d: 'Steam, crackle, honey glaze while the counter wakes.' },
    { n: 'three', t: 'Pickup window', d: 'Preorder, grab a slot, leave with a warm box.' },
  ];

  return (
    <>
      <section className="boho-hero">
        <video autoPlay muted loop playsInline poster={brand.poster}>
          <source src={brand.video} type="video/mp4" />
        </video>
        <div className="boho-frame">
          <p className="boho-script">hand-shaped · oven-loved</p>
          <p className="boho-brand">{brand.name}</p>
          <h1
            className="mt-4 text-xl md:text-2xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {brand.tagline}
          </h1>
          <p className="mt-4 text-muted">{brand.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/shop" className="btn-brand">
              Browse bakes
            </Link>
            <Link href="/special" className="btn-ghost">
              Cake Studio
            </Link>
          </div>
        </div>
      </section>

      <section className="boho-process reveal">
        <p className="boho-script text-center mb-6">from flour to window</p>
        <div className="boho-process-grid stagger">
          {steps.map((s) => (
            <div key={s.n} className="boho-process-card">
              <p className="boho-script" style={{ fontSize: '1.75rem' }}>
                {s.n}
              </p>
              <p className="mt-2 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                {s.t}
              </p>
              <p className="mt-2 text-muted text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="film-strip boho-film">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="film-cell boho-film-cell">
            <img src={p.img} alt={p.name} />
            <span>{p.name}</span>
          </Link>
        ))}
      </div>

      <section className="boho-grid">
        {products.slice(0, 6).map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <img src={p.img} alt={p.name} />
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{ background: 'linear-gradient(transparent, rgba(250,246,241,.92))' }}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.35rem' }}>
                {p.name}
              </p>
              <p className="text-sm text-muted">${p.price}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="loyalty-band boho-loyalty reveal">
        <div className="text-center md:text-left">
          <p className="boho-script">{brand.offer.detail}</p>
          <h2 className="boho-brand" style={{ fontSize: 'clamp(2.5rem,8vw,4.5rem)' }}>
            {brand.offer.code}
          </h2>
          <p className="text-muted mt-2">Weekend boxes · pastry club stamps on every pickup.</p>
        </div>
        <Link href="/shop" className="btn-brand">
          Claim weekend box
        </Link>
      </section>

      <section className="boho-stats reveal">
        {brand.stats.map((s, i) => (
          <div key={s.label}>
            <p className="boho-brand" style={{ fontSize: '2.75rem' }}>
              {i === 0 ? live : s.value}
            </p>
            <p className="boho-script">{s.label}</p>
          </div>
        ))}
      </section>

      <section id="stories" className="mx-auto max-w-4xl px-4 pb-20">
        <p className="boho-script text-center mb-8">kitchen stories</p>
        <div className="grid gap-8 md:grid-cols-2 stagger" id="reviews">
          {brand.reviews.map((r) => (
            <blockquote key={r.name} className="boho-review">
              <Stars n={r.stars} />
              <p
                className="mt-3"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.35rem' }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-muted">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
