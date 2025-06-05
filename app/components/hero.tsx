"use client"
// src/components/layout/HeroSection.tsx
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Carousel images for African apparel theme
  const images = [
    '/images/Hero_Background1.jpg', // Ankara dress model
    '/images/Hero_Background2.jpg', // Kente cloth close-up
    '/images/Hero_Background3.jpg', // Kaftan in savanna
  ];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-dove-navy "
    >
      {/* Background lighting effect with terracotta tint */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(193, 68, 56, 0.15), rgba(10, 35, 66, 0.8) 70%)`,
          zIndex: 1,
        }}
      />

      {/* Carousel background with parallax */}
      <div className="absolute inset-0 z-0 ">
        <div
          className="relative w-full h-full opacity-50"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          {images.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-1000 "
              style={{ opacity: index === currentImage ? 1 : 0 }}
            >
              <Image
                src={src}
                alt={
                  index === 0
                    ? 'African model in vibrant Ankara dress'
                    : index === 1
                    ? 'Close-up of Kente cloth texture'
                    : 'Model in kaftan in serene savanna'
                }
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content container with 3D effect */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
        <div
          className="max-w-xl"
          style={{
            perspective: '1000px',
          }}
        >
          {/* 3D frame */}
          
          <motion.div
             className="border-2 border-dove-ivory p-12 relative"
           
             transition={{ type: 'tween', stiffness: 70 }}
             initial ={{x: -400}}
             animate={{x: 0}}
          >
            
            {/* Border shadows for depth */}
            <div
              className="absolute -inset-0.5 border border-dove-ivory/50 -z-10"
              style={{ transform: 'translateZ(-3px)' }}
            />
            <div
              className="absolute -inset-1 border border-dove-ivory/30 -z-20"
              style={{ transform: 'translateZ(-6px)' }}
            />

            {/* Illuminate border edges with terracotta */}
            <div className="absolute inset-0 border-2 border-terracotta/30" />

            {/* Content with 3D elements */}
            <div>
            <motion.h2 
                className="text-5xl font-serif font-bold text-dove-ivory mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Timeless
              </motion.h2>
              <motion.h2 
                className="text-5xl font-serif font-bold text-dove-ivory mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              > 
              Elegance
              </motion.h2>
              <motion.p 
                className="text-dove-ivory/90 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
              
                 Connect With the African Heritage
              </motion.p>

              <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.9, duration: 0.8 }}
                           >
                             <ShopNowButton />
                           </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Shop Now button with terracotta color
const ShopNowButton: React.FC = () => {
  return (
    <Link href="/collections">
      <motion.div 
        className="relative inline-block group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shadow/glow for 3D effect */}
        <motion.div 
          className="absolute -inset-1 rounded bg-dove-gold/50 blur-sm -z-10" 
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Button */}
        <div className="bg-dove-gold text-white py-3 px-8 font-medium rounded relative overflow-hidden">
          {/* Shimmering light effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: -200 }}
            animate={{ x: 200 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
          SHOP NOW
        </div>
      </motion.div>
    </Link>
  );
};

export default HeroSection;

