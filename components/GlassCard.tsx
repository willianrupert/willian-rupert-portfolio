import React from 'react';
import { motion, useMotionTemplate, useMotionValue, MotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  matte?: boolean;
  onClick?: () => void;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  matte = false,
  onClick,
  noPadding = false,
  ...props
}) => {
  // Motion values for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.2, 1, 0.2, 1] } }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-[32px] border shadow-2xl transition-all duration-500",
        // Enhanced Glass Material Logic for Light/Dark Modes with Hover Effects
        matte 
          ? "bg-white/60 dark:bg-neutral-900/20 backdrop-blur-[40px] dark:backdrop-blur-[60px] border-white/40 dark:border-white/5 shadow-black/5 dark:shadow-black/20 hover:bg-white/70 dark:hover:bg-neutral-900/40" 
          : "bg-white/40 dark:bg-white/5 backdrop-blur-[20px] dark:backdrop-blur-[30px] border-white/40 dark:border-white/10 shadow-black/5 dark:shadow-black/20 hover:bg-white/50 dark:hover:bg-white/10",
        
        onClick && "cursor-pointer active:scale-[0.99] active:transition-transform active:duration-100",
        className
      )}
      {...props}
    >
      {/* 1. Spotlight Effect Layer (Mouse Follow) - Adaptive Opacity */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              700px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 40%
            )
          `,
        }}
      />

      {/* 2. Specular Highlight (Top Edge) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/40 to-transparent opacity-60" />
      
      {/* 3. Inner Border Glow */}
      <div className="absolute inset-[1px] rounded-[31px] border border-white/20 dark:border-white/10 opacity-30 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* 4. Subtle Noise Texture */}
       <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }} 
      />

      {/* Content */}
      <div className={cn("relative z-10 h-full", !noPadding && "p-6 md:p-8")}>
        {children}
      </div>
    </motion.div>
  );
};