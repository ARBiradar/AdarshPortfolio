"use client";

import { motion } from "framer-motion";

export function CoffeeCup({ size = 48 }: { size?: number }) {
  // Steam lines animation variations
  const steamVariants = (delay: number) => ({
    animate: {
      y: [-2, -12, -22],
      x: [0, 2, -2, 0],
      opacity: [0, 0.6, 0],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: delay
      } as any
    }
  });

  return (
    <div className="relative group/cup flex items-center justify-center cursor-pointer select-none">
      {/* Container holding steam & cup */}
      <div className="relative" style={{ width: size, height: size * 1.2 }}>
        
        {/* Steam paths floating above the cup */}
        <div className="absolute top-0 left-0 right-0 h-1/2 flex justify-center gap-1.5 pointer-events-none">
          <motion.svg
            className="w-8 h-8 opacity-0 group-hover/cup:opacity-100 transition-opacity duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            {/* Steam Line 1 */}
            <motion.path
              d="M 8 16 Q 10 12, 8 8 T 10 2"
              variants={steamVariants(0)}
              animate="animate"
              className="text-amber-500/60"
            />
            {/* Steam Line 2 */}
            <motion.path
              d="M 12 16 Q 14 12, 12 8 T 14 2"
              variants={steamVariants(0.6)}
              animate="animate"
              className="text-amber-500/80"
            />
            {/* Steam Line 3 */}
            <motion.path
              d="M 16 16 Q 18 12, 16 8 T 18 2"
              variants={steamVariants(1.2)}
              animate="animate"
              className="text-amber-500/60"
            />
          </motion.svg>
        </div>

        {/* Coffee Cup Body (bottom half) */}
        <div className="absolute bottom-1 left-0 right-0 h-1/2 flex items-center justify-center">
          <svg
            className="text-amber-500 transition-all duration-300 group-hover/cup:text-amber-400 group-hover/cup:scale-105"
            viewBox="0 0 24 24"
            width={size}
            height={size * 0.7}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cup Base */}
            <path d="M17 8H6a1 1 0 0 0-1 1v7a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V9a1 1 0 0 0-1-1Z" />
            {/* Handle */}
            <path d="M17 11h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
            {/* Plate Line */}
            <line x1="3" x2="21" y1="22" y2="22" />
          </svg>
        </div>

      </div>
    </div>
  );
}
