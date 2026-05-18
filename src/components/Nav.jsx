import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría cotizar un mueble de House Decor FD. ¿Me pueden ayudar?')}`

function HDLogo() {
  return (
    <div
      style={{
        background: '#2C1A0E',
        borderRadius: '4px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        padding: '6px 9px',
      }}
    >
      <span
        className="font-display"
        style={{
          color: '#E8DDD0',
          fontWeight: 700,
          fontSize: '0.875rem',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        HD
      </span>
    </div>
  )
}

function HeartIcon({ color = '#2C1A0E' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.5" fill="none" stroke={color} style={{ transition: 'stroke 300ms ease' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const navLinkStyle = {
  fontSize: '0.875rem',
  fontWeight: 500,
  textDecoration: 'none',
  position: 'relative',
  transition: 'color 250ms ease',
}

export function Nav() {
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const prefersReduced = useReducedMotion()
  const isHome = location.pathname === '/'

  const [scrolled, setScrolled] = useState(() => !isHome || window.scrollY > 80)
  const transparent = !scrolled

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const check = () => setScrolled(window.scrollY > 80)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: (scrolled || menuOpen) ? 'rgba(245,240,232,0.85)' : 'transparent',
        backdropFilter: (scrolled || menuOpen) ? 'blur(12px)' : 'none',
        borderBottom: (scrolled || menuOpen) ? '0.5px solid rgba(44,26,14,0.08)' : 'none',
        transition: prefersReduced ? 'none' : 'background 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}
        >
          <HDLogo />
          <span
            className="font-display desktop-brand"
            style={{ color: transparent ? '#F5F0E8' : '#2C1A0E', fontWeight: 500, fontSize: '0.875rem', display: 'none', transition: 'color 300ms ease' }}
          >
            House Decor FD
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={`nav-link nav-link--${transparent ? 'light' : 'dark'}`}
              style={navLinkStyle}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Favorites heart */}
          <Link
            to="/favoritos"
            aria-label="Favoritos"
            style={{ position: 'relative', padding: '0.375rem', display: 'flex' }}
          >
            <HeartIcon color={(transparent && !menuOpen) ? 'rgba(245,240,232,0.85)' : '#2C1A0E'} />
            {favorites.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '1rem',
                  height: '1rem',
                  background: '#2C1A0E',
                  color: '#F5F0E8',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Desktop CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-cta"
            style={{
              background: transparent ? 'transparent' : '#2C1A0E',
              color: '#F5F0E8',
              border: transparent ? '1.5px solid rgba(245,240,232,0.6)' : '1.5px solid transparent',
              fontSize: '0.8125rem',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 300ms ease, border-color 300ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = transparent ? 'rgba(245,240,232,0.15)' : '#1A0F07' }}
            onMouseLeave={e => { e.currentTarget.style.background = transparent ? 'transparent' : '#2C1A0E' }}
          >
            Cotizar por WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            className="mobile-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.375rem',
              display: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke={menuOpen ? '#2C1A0E' : (transparent ? 'rgba(245,240,232,0.85)' : '#2C1A0E')} strokeWidth="1.5" fill="none" style={{ transition: 'stroke 300ms ease' }}>
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>


      <style>{`
        /* ── Nav link hover ── */
        .nav-link { display: inline-block; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1.5px;
          background: currentColor;
          border-radius: 1px;
          transition: width 250ms ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }

        /* Dark (scrolled) */
        .nav-link--dark       { color: #6B4F3A; }
        .nav-link--dark:hover { color: #1A0F07; }
        .nav-link--dark.active { color: #2C1A0E; }

        /* Light (transparent on hero) */
        .nav-link--light         { color: rgba(245,240,232,0.7); }
        .nav-link--light:hover   { color: #F5F0E8; }
        .nav-link--light.active  { color: #F5F0E8; }

        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .desktop-brand { display: block !important; }
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </header>

    {createPortal(
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 49,
              background: '#F5F0E8',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 1.5rem 2.5rem',
            }}
          >
            {/* Top bar spacer (matches header height) */}
            <div style={{ height: '4rem', flexShrink: 0 }} />

            {/* Nav links */}
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.25rem' }}>
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22, ease: 'easeOut' }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontSize: '2rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: isActive ? '#2C1A0E' : '#9C7E65',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid #E8DDD0',
                      transition: 'color 0.15s',
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.875rem 1rem',
                background: '#2C1A0E',
                color: '#F5F0E8',
                fontSize: '0.9375rem',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '8px',
                flexShrink: 0,
              }}
            >
              Cotizar por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
  )
}
