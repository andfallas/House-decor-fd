import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FadeIn } from '../components/FadeIn'
import { PageTransition } from '../components/PageTransition'
import { usePageMeta } from '../hooks/usePageMeta'

// WhatsApp: +56 9 7774 1324
const WA_NUMBER = '56977741324'
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría cotizar un mueble de House Decor FD.')}`

const PRODUCT_OPTIONS = [
  'Respaldo de cama',
  'Cama completa',
  'Baúl',
  'Banqueta',
  'Puff',
  'Otro',
]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: '1px solid #D4C9BB',
  borderRadius: '6px',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
  color: '#1A0F07',
  outline: 'none',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#6B4F3A',
  fontWeight: 500,
  marginBottom: '0.5rem',
}

export function Contacto() {
  usePageMeta('Contacto', 'Contactá a House Decor FD para cotizar tus muebles de dormitorio tapizados a medida. Respondemos a la brevedad.')
  const location = useLocation()
  const prefill = location.state?.prefill || ''

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: '',
    mensaje: prefill,
  })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    if (prefill) setForm(f => ({ ...f, mensaje: prefill }))
  }, [prefill])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con Formspree o Resend aquí.
    // Ejemplo Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // })
    setSent(true)
  }

  const getInputStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? '#2C1A0E' : '#D4C9BB',
  })

  const section = { maxWidth: '80rem', margin: '0 auto', padding: '0 1.25rem' }

  return (
    <PageTransition>
    <div style={{ ...section, paddingTop: '6rem', paddingBottom: '7rem' }}>
      <div className="contact-grid">
        {/* Left column */}
        <FadeIn>
          <h1
            className="font-hero"
            style={{ fontSize: 'clamp(2.75rem, 5vw, 4.5rem)', color: '#1A0F07', lineHeight: 1.05, marginBottom: '1.5rem' }}
          >
            Hablemos.
          </h1>
          <p style={{ color: '#6B4F3A', lineHeight: 1.65, marginBottom: '2rem', fontSize: '1rem' }}>
            Podés escribirnos por WhatsApp o dejarnos tus datos y te respondemos a la brevedad.
          </p>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              background: '#2C1A0E',
              color: '#F5F0E8',
              fontWeight: 500,
              padding: '1rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              marginBottom: '2rem',
              transition: 'background 0.2s',
              maxWidth: '18rem',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1A0F07')}
            onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#F5F0E8" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.52 5.84L0 24l6.335-1.648A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.575-.484-5.072-1.332l-.363-.215-3.762.988.988-3.679-.236-.377A9.965 9.965 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Abrir WhatsApp
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ ...labelStyle, marginBottom: '0.25rem' }}>Instagram</p>
              <a
                href="https://www.instagram.com/housedecorfd_cl/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2C1A0E', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}
              >
                @housedecorfd_cl
              </a>
            </div>
            <div>
              <p style={{ ...labelStyle, marginBottom: '0.25rem' }}>Envíos</p>
              <p style={{ color: '#1A0F07', fontSize: '0.9375rem' }}>Hacemos envíos a todo Chile</p>
            </div>
          </div>
        </FadeIn>

        {/* Right column — form */}
        <FadeIn delay={100}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 0', textAlign: 'center' }}>
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  background: '#E8DDD0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="#2C1A0E" strokeWidth="2" fill="none">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', color: '#1A0F07', marginBottom: '0.5rem' }}>
                ¡Gracias!
              </h2>
              <p style={{ color: '#6B4F3A' }}>Te respondemos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label htmlFor="nombre" style={labelStyle}>
                  Nombre <span style={{ color: '#2C1A0E' }}>*</span>
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  onFocus={() => setFocused('nombre')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tu nombre"
                  style={getInputStyle('nombre')}
                />
              </div>

              <div>
                <label htmlFor="email" style={labelStyle}>
                  Email <span style={{ color: '#2C1A0E' }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="tu@email.com"
                  style={getInputStyle('email')}
                />
              </div>

              <div>
                <label htmlFor="telefono" style={labelStyle}>
                  Teléfono{' '}
                  <span style={{ color: '#D4C9BB', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                    (opcional)
                  </span>
                </label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  onFocus={() => setFocused('telefono')}
                  onBlur={() => setFocused(null)}
                  placeholder="+56 9 XXXX XXXX"
                  style={getInputStyle('telefono')}
                />
              </div>

              <div>
                <label htmlFor="producto" style={labelStyle}>Producto de interés</label>
                <select
                  id="producto"
                  name="producto"
                  value={form.producto}
                  onChange={handleChange}
                  onFocus={() => setFocused('producto')}
                  onBlur={() => setFocused(null)}
                  style={{ ...getInputStyle('producto'), background: '#F5F0E8' }}
                >
                  <option value="">Seleccionar...</option>
                  {PRODUCT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" style={labelStyle}>Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  onFocus={() => setFocused('mensaje')}
                  onBlur={() => setFocused(null)}
                  placeholder="Contanos qué tenés en mente..."
                  style={{ ...getInputStyle('mensaje'), resize: 'vertical', lineHeight: 1.5 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#2C1A0E',
                  color: '#F5F0E8',
                  fontWeight: 500,
                  padding: '0.875rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9375rem',
                  transition: 'background 0.2s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1A0F07')}
                onMouseLeave={e => (e.currentTarget.style.background = '#2C1A0E')}
              >
                Enviar consulta
              </button>
            </form>
          )}
        </FadeIn>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
        }
      `}</style>
    </div>
    </PageTransition>
  )
}
