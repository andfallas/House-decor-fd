import { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const OVERLAY_DURATION = 1000 // ms — cambiar aquí ajusta todo

const OverlayCtx = createContext(true)
export const useOverlayActive = () => useContext(OverlayCtx)

export function LoadingOverlayProvider({ children }) {
  const [active, setActive] = useState(true)

  useEffect(() => {
    // Se desactiva después de que el overlay desaparece completamente (duración + fade-out)
    const t = setTimeout(() => setActive(false), OVERLAY_DURATION + 500)
    return () => clearTimeout(t)
  }, [])

  return <OverlayCtx.Provider value={active}>{children}</OverlayCtx.Provider>
}

export function LoadingOverlay() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), OVERLAY_DURATION)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: '#F5F0E8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              background: '#2C1A0E',
              borderRadius: '6px',
              padding: '10px 15px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="font-display"
              style={{ color: '#E8DDD0', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              HD
            </span>
          </motion.div>

          <div style={{ width: '3rem', height: '1.5px', background: '#D4C9BB', borderRadius: '1px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: OVERLAY_DURATION / 1000 - 0.1, ease: 'easeInOut' }}
              style={{ height: '100%', background: '#2C1A0E', borderRadius: '1px' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
