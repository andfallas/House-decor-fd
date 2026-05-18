import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'
import { useFavorites } from '../context/FavoritesContext'
import { useSelectedFabrics } from '../context/SelectedFabricsContext'
import { fabricCollections } from '../data/fabrics'

const WA_NUMBER = '56977741324'

export function ProductModal({ product, isOpen, onClose }) {
  const { favorites, toggleFavorite } = useFavorites()
  const { getFabric, setFabric, clearFabric } = useSelectedFabrics()
  const isFav = favorites.includes(product.id)
  const selectedFabric = getFabric(product.id)
  const [activeCollection, setActiveCollection] = useState(product.fabricCollections?.[0] ?? null)
  const [hoveredColor, setHoveredColor] = useState(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const swatchScrollRef = useRef(null)
  const contentScrollRef = useRef(null)

  useEffect(() => {
    setActiveCollection(product.fabricCollections?.[0] ?? null)
    setHoveredColor(null)
  }, [product.id])

  function checkScroll() {
    const el = swatchScrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  function checkContentScroll() {
    const el = contentScrollRef.current
    if (!el) return
    setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 8)
  }

  // When modal opens, restore active collection to match selectedFabric so the circle is visible
  useEffect(() => {
    if (!isOpen) return
    if (selectedFabric) {
      const collId = Object.keys(fabricCollections).find(
        id => fabricCollections[id].name === selectedFabric.collection
      )
      if (collId) setActiveCollection(collId)
    }
  }, [isOpen])

  // Re-check scroll arrows after collection changes or modal opens
  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => {
      checkScroll()
      checkContentScroll()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen, activeCollection])

  function scrollSwatches(dir) {
    const el = swatchScrollRef.current
    if (!el) return
    const circleW = 28 + 8 // 1.75rem + 0.5rem gap at 16px base
    const steps = Math.max(1, Math.floor(el.clientWidth / circleW))
    el.scrollBy({ left: dir * steps * circleW, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const arrowBtnStyle = {
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '50%',
    border: '1px solid #D4C9BB',
    background: '#F5F0E8',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
  }

  const fabricLine = selectedFabric
    ? ` Tela: ${selectedFabric.collection} — ${selectedFabric.color}.`
    : ''
  const waMsg = encodeURIComponent(
    `Hola, me gustaría cotizar: ${product.name}.${fabricLine} ¿Me pueden dar más información?`
  )
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26,15,7,0.6)',
            backdropFilter: 'blur(6px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#F5F0E8',
              borderRadius: '8px',
              maxWidth: '72rem',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                width: '2rem',
                height: '2rem',
                background: 'rgba(245,240,232,0.92)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8DDD0')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.92)')}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" stroke="#2C1A0E" strokeWidth="2.5" fill="none">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div
              ref={contentScrollRef}
              onScroll={checkContentScroll}
              style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
            >
              <div className="modal-grid">

                {/* Image column */}
                <div style={{ background: '#C4B49A', position: 'relative', minHeight: '22rem', overflow: 'hidden' }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="eager"
                      decoding="async"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <ImagePlaceholder label={product.name} ratio="1/1" style={{ borderRadius: 0 }} />
                  )}
                </div>

                {/* Info column */}
                <div style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}>
                  <div>
                    <p style={{
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#6B4F3A',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}>
                      {product.category}
                    </p>
                    <h2 className="font-subtitle" style={{ fontSize: '1.625rem', color: '#1A0F07', lineHeight: 1.1 }}>
                      {product.name}
                    </h2>
                  </div>

                  <p style={{ fontSize: '0.9375rem', color: '#6B4F3A', lineHeight: 1.65 }}>
                    {product.description}
                  </p>

                  {product.characteristics?.length > 0 && (
                    <div>
                      <p style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#6B4F3A',
                        fontWeight: 500,
                        marginBottom: '0.875rem',
                      }}>
                        Características
                      </p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {product.characteristics.map((item) => (
                          <li
                            key={item}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.625rem',
                              fontSize: '0.875rem',
                              color: '#1A0F07',
                              lineHeight: 1.55,
                            }}
                          >
                            <span style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: '#6B4F3A',
                              flexShrink: 0,
                              marginTop: '0.475rem',
                            }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.prices?.length > 0 && (
                    <div>
                      <p style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#6B4F3A',
                        fontWeight: 500,
                        marginBottom: '0.75rem',
                      }}>
                        Precios
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {product.prices.map((p) => (
                          <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ fontSize: '0.875rem', color: '#6B4F3A' }}>{p.label}</span>
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1A0F07' }}>{p.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            {/* Fabric swatches — inside scroll */}
            {product.fabricCollections?.length > 0 && (
              <div style={{ borderTop: '1px solid #E0D6C8', padding: '1.25rem 2rem 1.5rem' }}>
                <p style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#6B4F3A',
                  fontWeight: 500,
                  marginBottom: '0.75rem',
                }}>
                  Telas disponibles
                </p>

                {/* Collection tabs */}
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
                  {product.fabricCollections.map(id => (
                    <button
                      key={id}
                      onClick={() => { setActiveCollection(id); setHoveredColor(null) }}
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        padding: '0.3rem 0.7rem',
                        borderRadius: '4px',
                        border: '1px solid',
                        borderColor: activeCollection === id ? '#2C1A0E' : '#D4C9BB',
                        background: activeCollection === id ? '#2C1A0E' : 'transparent',
                        color: activeCollection === id ? '#F5F0E8' : '#6B4F3A',
                        cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                      }}
                    >
                      {fabricCollections[id]?.name}
                    </button>
                  ))}
                </div>

                {/* Color circles with scroll arrows */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => scrollSwatches(-1)}
                    style={{ ...arrowBtnStyle, visibility: canScrollLeft ? 'visible' : 'hidden' }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="#2C1A0E" strokeWidth="2.5" fill="none"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>

                  <div
                    ref={swatchScrollRef}
                    onScroll={checkScroll}
                    style={{
                      flex: 1,
                      display: 'flex',
                      gap: '0.5rem',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      padding: '4px 2px',
                    }}
                    className="scrollbar-none"
                  >
                    {(fabricCollections[activeCollection]?.colors ?? []).map(color => {
                      const collectionName = fabricCollections[activeCollection]?.name
                      const isSelected = selectedFabric?.code === color.code && selectedFabric?.collection === collectionName
                      return (
                        <button
                          key={color.code}
                          onMouseEnter={() => setHoveredColor(color.name)}
                          onMouseLeave={() => setHoveredColor(null)}
                          onClick={() => isSelected
                            ? clearFabric(product.id)
                            : setFabric(product.id, { code: color.code, color: color.name, collection: collectionName })
                          }
                          title={color.name}
                          style={{
                            flexShrink: 0,
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '50%',
                            background: color.hex,
                            border: isSelected ? '2px solid #2C1A0E' : '1.5px solid rgba(44,26,14,0.15)',
                            outline: isSelected ? '2px solid #2C1A0E' : 'none',
                            outlineOffset: '2px',
                            cursor: 'pointer',
                            padding: 0,
                            scrollSnapAlign: 'start',
                            transition: 'outline 0.15s, border 0.15s',
                          }}
                        />
                      )
                    })}
                  </div>

                  <button
                    onClick={() => scrollSwatches(1)}
                    style={{ ...arrowBtnStyle, visibility: canScrollRight ? 'visible' : 'hidden' }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="#2C1A0E" strokeWidth="2.5" fill="none"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>

                {/* Color label */}
                <p style={{
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  height: '1rem',
                  lineHeight: '1rem',
                  overflow: 'hidden',
                  color: selectedFabric && !hoveredColor ? '#2C1A0E' : '#6B4F3A',
                  fontWeight: selectedFabric && !hoveredColor ? 500 : 400,
                  visibility: (hoveredColor || selectedFabric) ? 'visible' : 'hidden',
                }}>
                  {hoveredColor ?? (selectedFabric ? `${selectedFabric.color} seleccionado` : ' ')}
                </p>
              </div>
            )}
            </div>

            {/* Scroll fade indicator */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4.5rem',
              background: 'linear-gradient(to bottom, transparent, rgba(245,240,232,0.98))',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '0.5rem',
              transition: 'opacity 0.3s',
              opacity: canScrollDown ? 1 : 0,
            }}>
              <svg
                viewBox="0 0 24 24" width="18" height="18"
                stroke="#9C7E65" strokeWidth="2" fill="none"
                style={{ animation: canScrollDown ? 'scrollBounce 1.4s ease-in-out infinite' : 'none' }}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            </div>

            {/* Fixed footer — buttons */}
            <div style={{ borderTop: '1px solid #E0D6C8', padding: '1rem 2rem 1.25rem', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'block',
                    textAlign: 'center',
                    padding: '0.875rem 1rem',
                    background: '#2C1A0E',
                    color: '#F5F0E8',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1A0F07')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
                >
                  Cotizar por WhatsApp
                </a>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  style={{
                    flexShrink: 0,
                    width: '3rem',
                    borderRadius: '6px',
                    border: '1.5px solid #D4C9BB',
                    background: isFav ? '#2C1A0E' : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { if (!isFav) e.currentTarget.style.borderColor = '#2C1A0E' }}
                  onMouseLeave={e => { if (!isFav) e.currentTarget.style.borderColor = '#D4C9BB' }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="1.5" style={{ fill: isFav ? '#F5F0E8' : 'transparent', stroke: isFav ? '#F5F0E8' : '#6B4F3A', transition: 'fill 0.2s, stroke 0.2s' }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            </div>

            <style>{`
              .modal-grid {
                display: grid;
                grid-template-columns: 1fr;
              }
              @media (min-width: 640px) {
                .modal-grid {
                  grid-template-columns: 1.1fr 1fr;
                }
              }
              @keyframes scrollBounce {
                0%, 100% { transform: translateY(0); opacity: 0.5; }
                50%       { transform: translateY(4px); opacity: 1; }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
