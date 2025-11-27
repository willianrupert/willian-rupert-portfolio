import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Bypass TypeScript checks for Three.js intrinsic elements
const Mesh = 'mesh' as any;
const IcosahedronGeometry = 'icosahedronGeometry' as any;

const LiquidSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  
  // Responsive scale: smaller on mobile to fit content
  const isMobile = viewport.width < 5; 
  const baseScale = isMobile ? 2.3 : 3.5;

  useFrame((state) => {
    const { clock, pointer } = state;
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      
      // Target position based on mouse with responsive multipliers
      const targetX = pointer.x * (isMobile ? 1.5 : 3);
      const targetY = pointer.y * (isMobile ? 1.5 : 3);

      // Smooth Position: heavier lerp for a "viscous" feel (slower response)
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.01);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.01);
      
      // Fluid Rotation: Continuous slow spin + reactive tilt based on pointer position
      // Rotation X tilts based on Y position (drag effect) plus organic sine wave (3x slower)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY * 0.1 + Math.cos(t * 0.08) * 0.2, 0.01);
      // Rotation Y is a continuous fluid spin mixed with horizontal tilt (3x slower)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX * 0.1 - t * 0.03, 0.01);
      
      // "Breathing" Scale Effect: Subtle expansion and contraction (3x slower)
      const breathe = 1 + Math.sin(t * 0.15) * 0.02;
      meshRef.current.scale.set(baseScale * breathe, baseScale * breathe, baseScale * breathe);
    }
  });

  return (
    <Mesh ref={meshRef} scale={baseScale}>
      {/* High polygon count for ultra-smooth liquid surface */}
      <IcosahedronGeometry args={[1, 128]} /> 
      <MeshTransmissionMaterial
        backside
        samples={16}
        thickness={5} // Increased thickness for stronger refraction
        roughness={0}
        transmission={1}
        ior={1.5} // Higher IOR for crystal/glass look
        chromaticAberration={1.1} // Boosted chromatic aberration for rainbow edges
        anisotropy={0.3} 
        distortion={0.5} 
        distortionScale={0.4} 
        temporalDistortion={0.1}
        color="#ffffff" 
        toneMapped={false}
      />
    </Mesh>
  );
};

// Animated background blob component
const Blob = ({ className, delay = 0, duration = 15 }: { className: string, delay?: number, duration?: number }) => (
  <motion.div
    className={`absolute rounded-full filter blur-[80px] md:blur-[100px] ${className}`}
    animate={{
      x: [0, 50, -40, 0],
      y: [0, -70, 40, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }}
  />
);

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f2f2f7] dark:bg-[#050505] overflow-hidden pointer-events-none transition-colors duration-700">
      
      {/* Dynamic Vibrant Blobs - 3x Slower Duration */}
      <div className="absolute inset-0 opacity-60 dark:opacity-70">
        <Blob 
          className="top-[-10%] left-[-10%] w-[60vh] h-[60vh] md:w-[700px] md:h-[700px] bg-indigo-300 dark:bg-indigo-600 mix-blend-multiply dark:mix-blend-screen" 
          delay={0} duration={45} 
        />
        <Blob 
          className="bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] md:w-[800px] md:h-[800px] bg-blue-300 dark:bg-blue-600 mix-blend-multiply dark:mix-blend-screen" 
          delay={5} duration={55} 
        />
        <Blob 
          className="top-[15%] right-[15%] w-[40vh] h-[40vh] md:w-[500px] md:h-[500px] bg-fuchsia-300 dark:bg-fuchsia-600 mix-blend-multiply dark:mix-blend-screen" 
          delay={10} duration={40} 
        />
        <Blob 
          className="bottom-[15%] left-[15%] w-[50vh] h-[50vh] md:w-[600px] md:h-[600px] bg-purple-300 dark:bg-purple-600 mix-blend-multiply dark:mix-blend-screen" 
          delay={2} duration={50} 
        />
      </div>

      {/* Central deep glow to ground the scene - Adaptive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/40 dark:bg-blue-900/10 rounded-full blur-[140px]" />

      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} dpr={[1, 2]}>
        <Environment preset="warehouse" /> 
        
        {/* Floating Particles - Slower Speed */}
        <Sparkles 
          count={60} 
          scale={10} 
          size={3} 
          speed={0.15} 
          opacity={0.5} 
          color="#ffffff" 
        />

        {/* Float - Slower Speed */}
        <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.6}>
          <LiquidSphere />
        </Float>
      </Canvas>
    </div>
  );
};