import { motion, useReducedMotion } from 'framer-motion'
import { useOverlayActive, OVERLAY_DURATION } from './LoadingOverlay'

export function FadeIn({ children, className = '', delay = 0 }) {
  const prefersReduced = useReducedMotion()
  const overlayActive = useOverlayActive()

  const overlayDelay = (!prefersReduced && overlayActive) ? OVERLAY_DURATION / 1000 : 0

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.5, ease: 'easeOut', delay: overlayDelay + delay / 1000 }
      }
    >
      {children}
    </motion.div>
  )
}
