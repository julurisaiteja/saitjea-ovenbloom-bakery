'use client';
import Link from 'next/link';
import { useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const nav = [
    { href: '/shop', label: brand.nav[0] },
    { href: '/special', label: brand.nav[1] },
    { href: '/shop?cat=Boxes', label: brand.nav[2] },
    { href: '/#stories', label: brand.nav[3] },
  ];

  return (
    <div data-diamond="batch-1" data-style={brand.styleMarker}>
      <a href="#main" className="skip-link">Skip to bakes</a>
      <div className="offer-banner boho-shell-banner">
        {brand.offer.label} · <em>{brand.offer.code}</em> — {brand.offer.detail}
      </div>
      <header className="boho-shell-header">
        <div className="boho-shell-inner">
          <Link href="/" className="boho-shell-mark">
            <span className="boho-shell-petal" aria-hidden />
            {brand.name}
          </Link>
          <nav className="boho-shell-nav" aria-label="Primary">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} className="boho-shell-link">
                {item.label}
              </Link>
            ))}
            <Link href="/cart" className="boho-shell-cart">
              Basket{count > 0 ? ` · ${count}` : ''}
            </Link>
          </nav>
          <button
            type="button"
            className="boho-shell-burger md:hidden"
            aria-expanded={open}
            aria-controls="boho-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        {open && (
          <div id="boho-mobile-nav" className="boho-shell-drawer">
            {nav.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>
              Basket{count > 0 ? ` · ${count}` : ''}
            </Link>
          </div>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="boho-shell-footer">
        <div className="boho-shell-footer-grid">
          <div>
            <p className="boho-shell-footer-brand">{brand.name}</p>
            <p className="boho-script mt-2">flour-dusted mornings · paper tags · warm counters</p>
            <p className="mt-3 text-muted text-sm max-w-md">{brand.description}</p>
            <form className="mt-5 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                className="flex-1 px-3 py-2 text-sm outline-none bg-surface"
                style={{ border: '1px dashed var(--brand)', borderRadius: '999px' }}
                placeholder="Email for bloom notes"
                aria-label="Email for bloom notes"
              />
              <button type="submit" className="btn-brand !py-2">
                Join
              </button>
            </form>
          </div>
          <div>
            <p className="boho-script mb-2">Wander</p>
            <div className="space-y-2 text-sm text-muted">
              <div><Link href="/shop">Bakes shelf</Link></div>
              <div><Link href="/special">Cake Studio</Link></div>
              <div><Link href="/checkout">Checkout</Link></div>
              <div><Link href="/#stories">Kitchen stories</Link></div>
            </div>
          </div>
          <div>
            <p className="boho-script mb-2">Counter care</p>
            <div className="space-y-2 text-sm text-muted">
              <div>Same-day pickup windows</div>
              <div>GF · vegan · nut-aware labels</div>
              <div>Custom cakes need 48 hours</div>
            </div>
          </div>
        </div>
        <p className="boho-shell-legal">Demo bakery · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">
          Bakes
        </Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">
          Studio
        </Link>
      </div>
      <AIAssistant />
    </div>
  );
}
