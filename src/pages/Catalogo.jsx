import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { FadeIn } from '../components/FadeIn'
import { PageTransition } from '../components/PageTransition'
import { usePageMeta } from '../hooks/usePageMeta'

const section = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.25rem' }

export function Catalogo() {
  usePageMeta('Catálogo', 'Explorá nuestro catálogo de muebles de dormitorio tapizados a medida. Respaldos, camas completas, baúles, banquetas y puffs.')
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSlug = searchParams.get('categoria') || 'todos'

  const filtered =
    activeSlug === 'todos' ? products : products.filter(p => p.slug === activeSlug)

  const activeLabel = categories.find(c => c.slug === activeSlug)?.label || 'Catálogo'

  function setFilter(slug) {
    slug === 'todos' ? setSearchParams({}) : setSearchParams({ categoria: slug })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <PageTransition>
    <div>
      {/* Sticky filter bar */}
      <div
        style={{
          position: 'sticky',
          top: '4rem',
          zIndex: 40,
          background: 'rgba(245,240,232,0.97)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #D4C9BB',
        }}
      >
        <div
          style={{ ...section, paddingTop: '0.875rem', paddingBottom: '0.875rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}
          className="scrollbar-none"
        >
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setFilter(cat.slug)}
              style={{
                flexShrink: 0,
                fontSize: '0.8125rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                background: activeSlug === cat.slug ? '#2C1A0E' : '#E8DDD0',
                color: activeSlug === cat.slug ? '#F5F0E8' : '#6B4F3A',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ ...section, paddingTop: '4rem', paddingBottom: '7rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <h1 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07' }}>
            {activeLabel}
          </h1>
          <span style={{ fontSize: '0.875rem', color: '#6B4F3A' }}>
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#6B4F3A', textAlign: 'center', padding: '5rem 0' }}>
            No hay productos en esta categoría.
          </p>
        ) : (
          <div className="catalog-grid">
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={Math.min(i * 60, 300)}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 640px) {
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
