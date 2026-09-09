'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function InteractiveTitle({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="interactive-title" aria-label={text}>
      {Array.from(text).map((character, index) => (
        <motion.span
          aria-hidden="true"
          className={character === ' ' ? 'title-space' : 'title-character'}
          key={`${character}-${index}`}
          whileHover={
            reduceMotion
              ? undefined
              : { y: -7, rotate: index % 2 ? 2 : -2, scale: 1.04 }
          }
          transition={{ type: 'spring', stiffness: 480, damping: 23 }}
        >
          {character === ' ' ? '\u00a0' : character}
        </motion.span>
      ))}
    </span>
  );
}
