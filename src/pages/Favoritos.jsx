import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useSelectedFabrics } from '../context/SelectedFabricsContext'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { FadeIn } from '../components/FadeIn'
import { PageTransition } from '../components/PageTransition'
import { usePageMeta } from '../hooks/usePageMeta'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'

const section = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.25rem' }

export function Favoritos() {
  usePageMeta('Mis favoritos', 'Tus muebles guardados en House Decor FD. Cotizalos todos juntos por WhatsApp.')
  const { favorites } = useFavorites()
  const { getFabric } = useSelectedFabrics()
  const navigate = useNavigate()

  const favoriteProducts = products.filter(p => favorites.includes(p.id))

  const productLines = favoriteProducts.map(p => {
    const fabric = getFabric(p.id)
    return fabric ? `${p.name} (${fabric.collection} — ${fabric.color})` : p.name
  })

  const waMessage = favoriteProducts.length
    ? `Hola, me gustaría cotizar los siguientes muebles de House Decor FD: ${productLines.join(', ')}. ¿Me pueden dar más información?`
    : ''
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  function goToContacto() {
    const prefill = `Me gustaría cotizar: ${productLines.join(', ')}.`
    navigate('/contacto', { state: { prefill } })
  }

  if (favoriteProducts.length === 0) {
    return (
      <PageTransition>
      <div style={{ ...section, paddingTop: '8rem', paddingBottom: '8rem', textAlign: 'center' }}>
        <p
          className="font-hero"
          style={{ fontSize: '1.75rem', color: '#1A0F07', marginBottom: '0.75rem' }}
        >
          Todavía no tenés favoritos
        </p>
        <p style={{ color: '#6B4F3A', marginBottom: '2rem', fontSize: '1rem' }}>
          Guardá los muebles que te gustan y cotizalos juntos.
        </p>
        <Link
          to="/catalogo"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#2C1A0E',
            color: '#F5F0E8',
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          Ver catálogo
        </Link>
      </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
    <div style={{ ...section, paddingTop: '5rem', paddingBottom: '7rem' }}>
      <FadeIn>
        <div className="favs-header">
          <div>
            <h1 className="font-hero" style={{ fontSize: '2.25rem', color: '#1A0F07' }}>
              Mis favoritos
            </h1>
            <p style={{ color: '#6B4F3A', marginTop: '0.25rem', fontSize: '0.875rem' }}>
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'producto guardado' : 'productos guardados'}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#2C1A0E',
                color: '#F5F0E8',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0.625rem 1.25rem',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1A0F07')}
              onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
            >
              Cotizar todos por WhatsApp
            </a>
            <button
              onClick={goToContacto}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1.5px solid #2C1A0E',
                color: '#2C1A0E',
                background: 'transparent',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0.625rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8DDD0')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Enviar consulta por formulario
            </button>
          </div>
        </div>
      </FadeIn>

      <div style={{ marginTop: '3rem' }} className="catalog-grid">
        {favoriteProducts.map((p, i) => (
          <FadeIn key={p.id} delay={i * 80}>
            <ProductCard product={p} />
          </FadeIn>
        ))}
      </div>

      <style>{`
        .favs-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .favs-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .catalog-grid { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        }
      `}</style>
    </div>
    </PageTransition>
  )
}
