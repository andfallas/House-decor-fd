import { motion, useReducedMotion } from 'framer-motion'
import { useOverlayActive, OVERLAY_DURATION } from './LoadingOverlay'

export function PageTransition({ children }) {
  const prefersReduced = useReducedMotion()
  const overlayActive = useOverlayActive()

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? {} : { opacity: 0 }}
      transition={{
        duration: prefersReduced ? 0 : 0.3,
        ease: 'easeOut',
        delay: (!prefersReduced && overlayActive) ? OVERLAY_DURATION / 1000 : 0,
      }}
    >
      {children}
    </motion.div>
  )
}
