import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { products } from '../data/products'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { ProductCard } from '../components/ProductCard'
import { FadeIn } from '../components/FadeIn'
import { PageTransition } from '../components/PageTransition'
import { usePageMeta } from '../hooks/usePageMeta'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'
const waHref = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

const FEATURED_CATEGORIES = [
  { label: 'Respaldos de cama', slug: 'respaldos', img: '/images/categoria-respaldos.webp' },
  { label: 'Camas completas', slug: 'camas', img: '/images/categoria-camas.webp' },
  { label: 'Baúles', slug: 'baules', img: '/images/categoria-baules.webp' },
  { label: 'Banquetas', slug: 'banquetas', img: '/images/categoria-banquetas.webp' },
  { label: 'Puffs', slug: 'puffs', img: '/images/categoria-puffs.webp' },
]

const MATERIALS = [
  { name: 'Lino', color: '#BFAF8C', desc: 'Tejido natural, repelente al agua. 37 colores disponibles.' },
  { name: 'Lino Afelpado', color: '#BE9E68', desc: 'Textura más densa y suave. Repelente al agua. 9 colores.' },
  { name: 'Felpa', color: '#BF7E3E', desc: 'Terciopelo suave al tacto, repelente al agua. La mayor variedad: 34 colores.' },
  { name: 'Boucle', color: '#C2B290', desc: 'Tela premium de textura rizada. 10 tonos neutros de alta calidad.' },
  { name: 'Efecto Cuero', color: '#9C7050', desc: 'Cuerina premium. 18 colores. Fácil de limpiar con paño húmedo.' },
]

const STEPS = [
  { n: '01', text: 'Elegís el diseño y los materiales' },
  { n: '02', text: 'Nos lo hacés saber por WhatsApp o formulario' },
  { n: '03', text: 'Fabricamos tu pieza a medida' },
  { n: '04', text: 'La recibís en tu casa en todo Chile' },
]

const sectionInner = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.25rem' }

const btnPrimary = {
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
  transition: 'background 0.2s',
}

const btnOutline = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  border: '1.5px solid #2C1A0E',
  color: '#2C1A0E',
  background: 'transparent',
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  textDecoration: 'none',
  transition: 'background 0.2s',
}

// Stagger containers
const stepsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const stepItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const materialsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const materialItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

function CategoryCard({ cat }) {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <Link
      to={`/catalogo?categoria=${cat.slug}`}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          animate={prefersReduced ? { scale: 1 } : { scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ImagePlaceholder src={cat.img} label={cat.label} ratio="1/1" style={{ borderRadius: 0 }} />
        </motion.div>
        <motion.div
          animate={prefersReduced ? { opacity: 0 } : { opacity: hovered ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#2C1A0E',
            pointerEvents: 'none',
          }}
        />
      </div>
      <motion.span
        animate={prefersReduced ? { y: 0 } : { y: hovered ? -3 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1A0F07', display: 'block' }}
      >
        {cat.label}
      </motion.span>
    </Link>
  )
}

export function Home() {
  usePageMeta(null, 'Muebles de dormitorio tapizados a medida: respaldos de cama, camas completas, baúles, banquetas y puffs. Fabricados en Chile con telas premium.')
  const featured = products.slice(0, 4)
  const imgRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const handleScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReduced])

  return (
    <PageTransition>
      <div>
        {/* ── Hero full screen — pulls up behind sticky nav ── */}
        <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', marginTop: '-4rem' }}>
          {/* Background placeholder */}
          <div
            ref={imgRef}
            style={{
              position: 'absolute',
              inset: 0,
              willChange: 'transform',
              backgroundImage: 'url(/images/hero.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: '#2C1A0E', opacity: 0.45, pointerEvents: 'none' }} />

          {/* Content — bottom-left desktop, centered mobile */}
          <div className="hero-content">
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
              style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.5)', fontWeight: 500, marginBottom: '1.25rem' }}
            >
              100% A MEDIDA
            </motion.p>
            <motion.h1
              className="font-hero"
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', color: '#F5F0E8', lineHeight: 1.05 }}
            >
              Muebles de dormitorio hechos para vos.
            </motion.h1>
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
              style={{ marginTop: '1.5rem', fontSize: '1.0625rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.7, maxWidth: '30rem' }}
              className="hero-subtitle"
            >
              Diseño minimalista, materiales nobles y confección completamente a medida. Cada pieza se fabrica para vos, desde cero.
            </motion.p>
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
              style={{ marginTop: '2.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
              className="hero-buttons"
            >
              <Link
                to="/catalogo"
                style={{ ...btnPrimary, background: '#F5F0E8', color: '#2C1A0E' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#E8DDD0')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F5F0E8')}
              >
                Ver catálogo
              </Link>
              <Link
                to="/nosotros"
                style={{ ...btnOutline, border: '1.5px solid rgba(245,240,232,0.6)', color: '#F5F0E8' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,240,232,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                Conocer más
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ borderTop: '1px solid #D4C9BB', borderBottom: '1px solid #D4C9BB', background: 'rgba(232,221,208,0.35)' }}>
          <div style={{ ...sectionInner, paddingTop: '3.5rem', paddingBottom: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }} className="stats-grid">
            {[
              { value: '100% a medida', desc: 'Cada pieza se fabrica según tus medidas y tu elección de materiales.' },
              { value: 'Envíos a todo Chile', desc: 'Entregamos en cualquier región del país.' },
              { value: '4–8 días', desc: 'Tiempo estimado de fabricación y entrega.' },
            ].map((stat, i) => (
              <FadeIn key={stat.value} delay={i * 80} className="stat-item">
                <p className="font-display" style={{ fontSize: '1.5rem', color: '#2C1A0E' }}>{stat.value}</p>
                <p style={{ fontSize: '0.875rem', color: '#6B4F3A', marginTop: '0.375rem' }}>{stat.desc}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Categories ── */}
        <section style={{ ...sectionInner, paddingTop: '7rem', paddingBottom: '7rem' }}>
          <FadeIn>
            <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07', marginBottom: '2.5rem' }}>
              Explorar por categoría
            </h2>
          </FadeIn>
          <div className="categories-grid">
            {FEATURED_CATEGORIES.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 70}>
                <CategoryCard cat={cat} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Featured products ── */}
        <section style={{ ...sectionInner, paddingBottom: '7rem' }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07' }}>Modelos populares</h2>
              <Link to="/catalogo" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6B4F3A', textDecoration: 'none' }} className="desktop-only">
                Ver todos →
              </Link>
            </div>
          </FadeIn>
          <div className="products-grid-4">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 90}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ background: '#E8DDD0', paddingTop: '7rem', paddingBottom: '7rem' }}>
          <div style={sectionInner}>
            <FadeIn>
              <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07', marginBottom: '3.5rem', textAlign: 'center' }}>
                ¿Cómo funciona?
              </h2>
            </FadeIn>
            <motion.div
              className="steps-grid"
              variants={stepsContainerVariants}
              initial={prefersReduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {STEPS.map((step) => (
                <motion.div key={step.n} variants={stepItemVariants}>
                  <span className="font-display" style={{ fontSize: '3.5rem', color: '#D4C9BB', lineHeight: 1, display: 'block', marginBottom: '1rem' }}>
                    {step.n}
                  </span>
                  <p style={{ fontSize: '1rem', color: '#1A0F07', lineHeight: 1.55 }}>{step.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Materials ── */}
        <section style={{ background: '#2C1A0E', paddingTop: '7rem', paddingBottom: '7rem' }}>
          <div style={sectionInner}>
            <FadeIn>
              <h2 className="font-display" style={{ fontSize: '2rem', color: '#F5F0E8', marginBottom: '0.75rem' }}>
                Los materiales que usamos
              </h2>
              <p style={{ color: '#D4C9BB', fontSize: '1rem', marginBottom: '3.5rem', maxWidth: '28rem' }}>
                Cinco colecciones de telas para que elijas el look y la textura que más se adapta a tu estilo.
              </p>
            </FadeIn>
            <motion.div
              className="materials-grid"
              variants={materialsContainerVariants}
              initial={prefersReduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {MATERIALS.map((mat) => (
                <motion.div
                  key={mat.name}
                  variants={materialItemVariants}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: mat.color, flexShrink: 0 }} />
                  <div>
                    <h3 className="font-subtitle" style={{ fontSize: '1.25rem', color: '#F5F0E8', marginBottom: '0.5rem' }}>
                      {mat.name}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#D4C9BB', lineHeight: 1.6 }}>{mat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ background: '#2C1A0E', borderTop: '1px solid #3D2510', paddingTop: '7rem', paddingBottom: '7rem' }}>
          <div style={{ ...sectionInner, textAlign: 'center' }}>
            <FadeIn>
              <h2 className="font-hero" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F5F0E8', marginBottom: '1rem' }}>
                ¿Listo para transformar tu dormitorio?
              </h2>
              <p style={{ color: '#D4C9BB', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '26rem', margin: '0 auto 2.5rem' }}>
                Hablemos sobre el diseño que tenés en mente. Sin compromiso.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                <a
                  href={waHref('Hola, me gustaría cotizar un mueble de House Decor FD.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...btnPrimary, background: '#E8DDD0', color: '#2C1A0E' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F5F0E8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#E8DDD0')}
                >
                  Cotizar por WhatsApp
                </a>
                <Link
                  to="/contacto"
                  style={{ ...btnOutline, border: '1.5px solid #E8DDD0', color: '#E8DDD0' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#3D2510')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  Escribirnos por formulario
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <style>{`
          /* ── Hero full screen ── */
          .hero-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0 1.5rem 3.5rem;
            text-align: center;
          }
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            justify-content: center;
          }

          @media (min-width: 1024px) {
            .hero-content {
              text-align: left;
              right: auto;
              padding-left: max(5rem, calc((100vw - 80rem) / 2 + 5rem));
              padding-bottom: 5rem;
              max-width: 62rem;
            }
            .hero-subtitle {
              margin-left: 0;
              margin-right: 0;
            }
            .hero-buttons {
              justify-content: flex-start;
            }
          }

          /* ── Grids ── */
          .categories-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
          .products-grid-4 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .steps-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .materials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .stat-item {
            padding: 1.25rem 1.5rem;
          }
          .desktop-only { display: none; }

          @media (min-width: 640px) {
            .categories-grid { grid-template-columns: repeat(3, 1fr); }
            .products-grid-4 { grid-template-columns: repeat(2, 1fr); }
            .steps-grid { grid-template-columns: repeat(2, 1fr); }
            .materials-grid { grid-template-columns: repeat(3, 1fr); }
          @media (min-width: 1024px) {
            .materials-grid { grid-template-columns: repeat(5, 1fr); }
          }
            .desktop-only { display: block; }
          }
          @media (min-width: 1024px) {
            .categories-grid { grid-template-columns: repeat(5, 1fr); }
            .products-grid-4 { grid-template-columns: repeat(4, 1fr); }
            .steps-grid { grid-template-columns: repeat(4, 1fr); }
            .stats-grid { display: flex; }
            .stat-item {
              flex: 1;
              border-right: 1px solid #D4C9BB;
            }
            .stat-item:last-child { border-right: none; }
          }
        `}</style>
      </div>
    </PageTransition>
  )
}
