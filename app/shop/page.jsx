'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get('cat');
      if (c) setCat(c);
    } catch {}
  }, []);
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];
  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat) && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, sort]);

  return (
    <div className="boho-paper-shop">
      <header className="boho-paper-head reveal">
        <p className="boho-script">hand-tagged shelf · {brand.offer.code}</p>
        <h1 className="boho-brand" style={{ fontSize: 'clamp(3rem,10vw,5.5rem)' }}>
          {brand.nav[0]}
        </h1>
        <p className="text-muted mt-2">Torn paper cards, dietary chips, weekend boxes.</p>
      </header>

      <div className="boho-paper-controls reveal reveal-delay-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the shelf…"
          className="boho-paper-input"
          aria-label="Search bakes"
        />
        <div className="boho-paper-cats">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`boho-paper-cat${cat === c ? ' is-on' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="boho-paper-input"
          aria-label="Sort"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="boho-craft-grid stagger">
        {list.map((p, i) => (
          <article key={p.id} className={`boho-craft-card rot-${(i % 4) + 1}`}>
            <div className="boho-craft-pin" aria-hidden />
            <Link href={`/product/${p.id}`} className="boho-craft-media">
              <img src={p.img} alt={p.name} />
            </Link>
            <div className="boho-craft-body">
              <div className="flex justify-between gap-2 items-start">
                <Link href={`/product/${p.id}`} className="boho-craft-title">
                  {p.name}
                </Link>
                <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist">
                  {wish.includes(p.id) ? '♥' : '♡'}
                </button>
              </div>
              <p className="text-sm text-muted mt-1">{p.blurb}</p>
              <div className="boho-craft-tags">
                {(p.dietary || p.tags || []).slice(0, 3).map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="boho-script" style={{ fontSize: '1.5rem', color: 'var(--brand)' }}>
                  ${p.price}
                </span>
                <span className="text-xs text-muted">
                  ★ {p.rating} · {p.cat}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!list.length && <p className="mt-10 text-muted boho-script">Nothing on this shelf — try another tag.</p>}
    </div>
  );
}
