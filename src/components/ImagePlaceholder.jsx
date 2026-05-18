const RATIOS = {
  '16/9': { paddingBottom: '56.25%' },
  '4/5': { paddingBottom: '125%' },
  '4/3': { paddingBottom: '75%' },
  '1/1': { paddingBottom: '100%' },
}

export function ImagePlaceholder({ label, src, ratio = '4/5', fit = 'cover', className = '', style = {} }) {
  const pad = RATIOS[ratio] || RATIOS['4/5']

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ paddingBottom: pad.paddingBottom, backgroundColor: '#D4C9BB', borderRadius: '4px', ...style }}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              color: '#8B7355',
              textAlign: 'center',
              lineHeight: 1.4,
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
