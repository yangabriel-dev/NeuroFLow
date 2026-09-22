import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'success' | 'danger'

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'border-neon-cyan text-neon-cyan hover:shadow-neon-cyan',
  secondary: 'border-neon-purple text-neon-purple hover:shadow-neon-purple',
  success: 'border-success text-success hover:shadow-neon-success',
  danger: 'border-error text-error hover:shadow-neon-error'
}

function NeonButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: NeonButtonProps): React.JSX.Element {
  return (
    <button
      className={`rounded-lg border bg-bg-card/40 px-5 py-2 font-bold backdrop-blur-xl
                  transition-all duration-200 hover:scale-105 hover:bg-bg-card/60
                  active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100
                  ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default NeonButton
