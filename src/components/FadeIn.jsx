import { motion, useReducedMotion } from 'framer-motion'

export function FadeIn({ children, className = '', delay = 0 }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { duration: 0.5, ease: 'easeOut', delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  )
}
