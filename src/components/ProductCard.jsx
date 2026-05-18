import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'
import { ImagePlaceholder } from './ImagePlaceholder'
import { ProductModal } from './ProductModal'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      strokeWidth="1.5"
      style={{
        fill: filled ? '#2C1A0E' : 'transparent',
        stroke: filled ? '#2C1A0E' : '#6B4F3A',
        transition: 'fill 0.2s, stroke 0.2s',
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.includes(product.id)
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  const waMsg = encodeURIComponent(
    `Hola, me gustaría cotizar: ${product.name}. ¿Me pueden dar más información?`
  )
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMsg}`

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Clickable area: image + info text → opens modal */}
        <div
          onClick={() => setModalOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setModalOpen(true)}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', flex: 1, outline: 'none' }}
        >
          {/* Image with zoom on hover */}
          <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div
              animate={prefersReduced ? { scale: 1 } : { scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <ImagePlaceholder src={product.image} label={product.name} ratio="4/5" fit="contain" style={{ borderRadius: 0 }} />
            </motion.div>

            <button
              onClick={e => { e.stopPropagation(); toggleFavorite(product.id) }}
              aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                width: '2.25rem',
                height: '2.25rem',
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.15s',
                zIndex: 1,
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <HeartIcon filled={isFav} />
            </button>
          </div>

          {/* Text info */}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <p
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#6B4F3A',
                fontWeight: 500,
              }}
            >
              {product.category}
            </p>
            <h3
              className="font-subtitle"
              style={{ fontSize: '1.125rem', marginTop: '0.25rem', color: '#1A0F07' }}
            >
              {product.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6B4F3A', marginTop: '0.25rem', lineHeight: 1.5, flex: 1 }}>
              {product.description}
            </p>
          </div>
        </div>

        {/* Cotizar button — outside clickable area */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            marginTop: '1rem',
            display: 'block',
            textAlign: 'center',
            padding: '0.625rem 1rem',
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
          Cotizar
        </a>
      </div>

      {/* Product modal */}
      <ProductModal
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
