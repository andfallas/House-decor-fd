import { motion, useReducedMotion } from 'framer-motion'

export function PageTransition({ children }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? {} : { opacity: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
