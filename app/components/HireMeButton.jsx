'use client';

import { motion } from 'motion/react';

export default function HireMeButton({ size = 'md', href = '#contact' }) {
  const faceSize = size === 'sm' ? 'text-lg' : 'text-xl';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="inline-flex items-center gap-2 cursor-pointer select-none"
      title="Hire me!"
    >
      <span className={`${faceSize} leading-none`}>
        ´ ᵕ `
      </span>
      <span className={`${textSize} font-medium font-PlusJakarta text-[#5A6538] dark:text-white/80`}>
        hire me!!
      </span>
    </motion.a>
  );
}
