import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'up' | 'scale' | 'left' | 'right' | 'clip';
};

export default function Reveal({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const variantClass = {
    up: 'reveal',
    scale: 'reveal-scale',
    left: 'reveal-left',
    right: 'reveal-right',
    clip: 'clip-reveal',
  }[variant];

  return (
    <div
      ref={ref}
      className={`${variantClass} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
