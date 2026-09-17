import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export default function AnimatedText({ text, className = '', delay = 0, stagger = 0.04 }: Props) {
  const words = text.split(' ');

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: delay + wi * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {wi < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function AnimatedLine({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={className} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
