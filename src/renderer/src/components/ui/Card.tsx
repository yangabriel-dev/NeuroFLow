import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Card({ className = '', children, ...props }: CardProps): React.JSX.Element {
  return (
    <div
      className={`rounded-xl border border-neon-cyan/30 bg-bg-card/60 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                  backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/60 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
