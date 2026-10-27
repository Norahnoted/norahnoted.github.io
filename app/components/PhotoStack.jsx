'use client';

import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function PhotoStack() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  const spring = { type: 'spring', stiffness: 160, damping: 22 };

  return (
    // Container aspect ratio matches Figma: 432w × 495h ≈ 115% padding-bottom
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ paddingBottom: '115%' }}
      className="relative w-full"
    >
      {/* Photo 1 (sparkle) — upper right, behind */}
      <motion.div
        animate={{ x: mouse.x * -10, y: mouse.y * -8, rotate: 8 }}
        transition={spring}
        style={{ width: '62%', left: '55%', top: '-15%', zIndex: 1 }}
        className="absolute"
      >
        <Image src={assets.picture1} alt="photo 1" className="w-full h-auto block" />
      </motion.div>

      {/* Photo 3 (cat) — lower left, behind */}
      <motion.div
        animate={{ x: mouse.x * -6, y: mouse.y * 10, rotate: -6 }}
        transition={spring}
        style={{ width: '72%', left: '-12%', top: '50%', zIndex: 1 }}
        className="absolute"
      >
        <Image src={assets.picture3} alt="photo 3" className="w-full h-auto block" />
      </motion.div>

      {/* Photo 2 (letter A) — center, on top */}
      <motion.div
        animate={{ x: mouse.x * 8, y: mouse.y * 6, rotate: -3 }}
        transition={spring}
        style={{ width: '60%', left: '27%', top: '22%', zIndex: 3 }}
        className="absolute"
      >
        <Image src={assets.picture2} alt="photo 2" className="w-full h-auto block" />
      </motion.div>
    </div>
  );
}
