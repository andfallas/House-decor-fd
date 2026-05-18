import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { FadeIn } from '../components/FadeIn'
import { PageTransition } from '../components/PageTransition'
import { usePageMeta } from '../hooks/usePageMeta'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría saber más sobre House Decor FD.')}`

const section = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.25rem' }

const PHILOSOPHY = [
  { title: 'Minimalismo elegante', desc: 'Líneas limpias, sin exceso. Cada mueble tiene lo que necesita y nada más.' },
  { title: 'Materiales nobles', desc: 'Lino, felpa, cuerina premium y madera maciza. Materiales que duran y se ven mejor con el tiempo.' },
  { title: 'Cada pieza es única', desc: 'Fabricamos tu mueble desde cero, a partir de tus medidas y tus elecciones. Nada predefinido.' },
]

const MATERIAL_TABLE = [
  { name: 'Lino', textura: 'Tejido natural, ligero', mantenimiento: 'Repelente al agua, limpieza fácil', estilo: 'Clásico y atemporal' },
  { name: 'Felpa', textura: 'Suave y aterciopelada', mantenimiento: 'Aspirar suavemente', estilo: 'Cálido y acogedor' },
  { name: 'Cuerina', textura: 'Lisa y resistente', mantenimiento: 'Paño húmedo', estilo: 'Moderno y urbano' },
]

const DELIVERY = [
  { label: 'Respaldos', time: '4–5 días hábiles' },
  { label: 'Camas completas', time: '7–8 días hábiles' },
]

export function Nosotros() {
  usePageMeta('Nosotros', 'Conocé la historia de House Decor FD. Fabricamos muebles de dormitorio tapizados a medida en Chile con materiales premium.')
  return (
    <PageTransition>
    <div>
      {/* ── Hero ── */}
      <section style={{ ...section, paddingTop: '6rem', paddingBottom: '7rem', display: 'grid', gap: '3.5rem', alignItems: 'center' }} className="nosotros-hero">
        <FadeIn>
          <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6B4F3A', fontWeight: 500, marginBottom: '1.25rem' }}>
            Nuestra historia
          </p>
          <h1
            className="font-hero"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', color: '#1A0F07', lineHeight: 1.1 }}
          >
            Dos personas, una visión.
          </h1>
          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              'David creció viendo a su padre trabajar la madera. Esa pasión por el detalle y la calidad nunca lo abandonó. Nagi, por su parte, lleva años conectando marcas con sus clientes a través de contenido genuino y buena gestión.',
              'Juntos vieron un espacio vacío: muebles de dormitorio realmente a medida, sin comprometerse con diseños predefinidos ni tener que elegir entre opciones que nunca terminan de encajar. Así nació House Decor FD.',
              'Hoy fabricamos respaldos, camas, baúles y banquetas en Santiago, y los enviamos a todo Chile. Cada pieza sale de nuestras manos hecha para una persona específica.',
            ].map((text, i) => (
              <p key={i} style={{ fontSize: '1rem', color: '#6B4F3A', lineHeight: 1.7 }}>{text}</p>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <ImagePlaceholder label="Foto — David y Nagi" ratio="4/3" />
        </FadeIn>
      </section>

      {/* ── Philosophy ── */}
      <section style={{ background: '#E8DDD0', paddingTop: '7rem', paddingBottom: '7rem' }}>
        <div style={section}>
          <FadeIn>
            <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07', marginBottom: '3.5rem', textAlign: 'center' }}>
              Nuestra filosofía
            </h2>
          </FadeIn>
          <div className="phil-grid">
            {PHILOSOPHY.map((item, i) => (
              <FadeIn key={item.title} delay={i * 90}>
                <div style={{ background: '#F5F0E8', padding: '2.25rem', borderRadius: '4px' }}>
                  <h3 className="font-subtitle" style={{ fontSize: '1.25rem', color: '#1A0F07', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6B4F3A', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Materials table ── */}
      <section style={{ ...section, paddingTop: '7rem', paddingBottom: '7rem' }}>
        <FadeIn>
          <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07', marginBottom: '2.5rem' }}>
            Materiales en detalle
          </h2>
        </FadeIn>
        <FadeIn delay={80}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #D4C9BB' }}>
                  {['Material', 'Textura', 'Mantenimiento', 'Estilo recomendado'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1.25rem 0.75rem 0',
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#6B4F3A',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATERIAL_TABLE.map((row, i) => (
                  <tr key={row.name} style={{ borderBottom: '1px solid #D4C9BB', background: i % 2 !== 0 ? 'rgba(245,240,232,0.5)' : 'transparent' }}>
                    <td className="font-subtitle" style={{ padding: '1rem 1.25rem 1rem 0', color: '#1A0F07', minWidth: '6rem' }}>
                      {row.name}
                    </td>
                    <td style={{ padding: '1rem 1.25rem 1rem 0', color: '#6B4F3A', minWidth: '8rem' }}>{row.textura}</td>
                    <td style={{ padding: '1rem 1.25rem 1rem 0', color: '#6B4F3A', minWidth: '10rem' }}>{row.mantenimiento}</td>
                    <td style={{ padding: '1rem 1.25rem 1rem 0', color: '#6B4F3A' }}>{row.estilo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* ── Delivery times ── */}
      <section style={{ background: 'rgba(232,221,208,0.4)', borderTop: '1px solid #D4C9BB', paddingTop: '7rem', paddingBottom: '7rem' }}>
        <div style={section}>
          <FadeIn>
            <h2 className="font-display" style={{ fontSize: '2rem', color: '#1A0F07', marginBottom: '2.5rem' }}>
              Tiempos de entrega
            </h2>
          </FadeIn>
          <div className="delivery-grid" style={{ marginBottom: '1.5rem' }}>
            {DELIVERY.map((item, i) => (
              <FadeIn key={item.label} delay={i * 90}>
                <div style={{ background: '#F5F0E8', border: '1px solid #D4C9BB', padding: '2.25rem', borderRadius: '4px' }}>
                  <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6B4F3A', fontWeight: 500, marginBottom: '0.625rem' }}>
                    {item.label}
                  </p>
                  <p className="font-display" style={{ fontSize: '2rem', color: '#2C1A0E' }}>{item.time}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={180}>
            <p style={{ fontSize: '0.875rem', color: '#6B4F3A' }}>
              * Te mantenemos informado en cada etapa del proceso.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#2C1A0E', paddingTop: '7rem', paddingBottom: '7rem' }}>
        <div style={{ ...section, textAlign: 'center' }}>
          <FadeIn>
            <h2 className="font-hero" style={{ fontSize: '2rem', color: '#F5F0E8', marginBottom: '1.75rem' }}>
              ¿Querés saber más? Hablemos.
            </h2>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#E8DDD0',
                color: '#2C1A0E',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F0E8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#E8DDD0')}
            >
              Escribirnos por WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>

      <style>{`
        .nosotros-hero { grid-template-columns: 1fr; }
        .phil-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .delivery-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 640px) {
          .delivery-grid { grid-template-columns: repeat(2, 1fr); }
          .phil-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .nosotros-hero { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
    </PageTransition>
  )
}
