import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}

export default function Reveal({ children, className = '', delay = 0, style }: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(14px)',
        transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1), transform 600ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}