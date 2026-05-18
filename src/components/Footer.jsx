import { Link } from 'react-router-dom'

function HDLogoLight() {
  return (
    <div
      style={{
        background: '#E8DDD0',
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
        style={{ color: '#2C1A0E', fontWeight: 700, fontSize: '0.875rem', lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        HD
      </span>
    </div>
  )
}

const footerLinkStyle = {
  color: '#D4C9BB',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.15s',
  display: 'block',
}

export function Footer() {
  return (
    <footer style={{ background: '#2C1A0E', color: '#E8DDD0' }}>
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '4rem 1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <HDLogoLight />
            <span className="font-display" style={{ color: '#E8DDD0', fontWeight: 500, fontSize: '0.875rem' }}>
              House Decor FD
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: '#D4C9BB', lineHeight: 1.6 }}>
            Muebles de dormitorio 100% a medida. Diseño minimalista y materiales nobles, hechos en Santiago para todo Chile.
          </p>
        </div>

        {/* Productos */}
        <div>
          <h4
            style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#8B7355',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Productos
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              ['Respaldos de cama', '/catalogo?categoria=respaldos'],
              ['Camas completas', '/catalogo?categoria=camas'],
              ['Baúles', '/catalogo?categoria=baules'],
              ['Banquetas', '/catalogo?categoria=banquetas'],
              ['Puffs', '/catalogo?categoria=puffs'],
            ].map(([label, to]) => (
              <Link
                key={label}
                to={to}
                style={footerLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D4C9BB')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Empresa */}
        <div>
          <h4
            style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#8B7355',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Empresa
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              ['Nosotros', '/nosotros'],
              ['Contacto', '/contacto'],
            ].map(([label, to]) => (
              <Link
                key={label}
                to={to}
                style={footerLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D4C9BB')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Redes */}
        <div>
          <h4
            style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#8B7355',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            Redes
          </h4>
          <a
            href="https://www.instagram.com/housedecorfd_cl/"
            target="_blank"
            rel="noopener noreferrer"
            style={footerLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#D4C9BB')}
          >
            @housedecorfd_cl
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #3D2510',
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '1.25rem 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: '#8B7355',
        }}
      >
        <span>© 2024 House Decor FD. Todos los derechos reservados.</span>
        <span>Santiago, Chile · Envíos a todo el país</span>
      </div>
    </footer>
  )
}
