import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '../../store/useToastStore'

function Toast(): React.JSX.Element {
  const message = useToastStore((s) => s.message)
  const hide = useToastStore((s) => s.hide)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (!message) return undefined
    timeoutRef.current = setTimeout(hide, 4000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [message, hide])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-6 right-6 z-[60] max-w-xs rounded-xl border border-neon-cyan/40 bg-bg-card/90 p-4 text-sm font-bold text-neon-cyan shadow-neon-cyan backdrop-blur-xl"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
