import { useEffect, useRef, useState } from 'react'
import NeonButton from './NeonButton'

interface ConfirmButtonProps {
  label: string
  confirmLabel?: string
  onConfirm: () => void
}

function ConfirmButton({ label, confirmLabel = 'Confirmar?', onConfirm }: ConfirmButtonProps): React.JSX.Element {
  const [confirming, setConfirming] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleClick(): void {
    if (confirming) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setConfirming(false)
      onConfirm()
      return
    }
    setConfirming(true)
    timeoutRef.current = setTimeout(() => setConfirming(false), 3000)
  }

  return (
    <NeonButton variant={confirming ? 'danger' : 'secondary'} onClick={handleClick}>
      {confirming ? confirmLabel : label}
    </NeonButton>
  )
}

export default ConfirmButton
