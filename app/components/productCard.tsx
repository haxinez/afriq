"use client"

// src/components/product/ProductCard.tsx
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Calculate the tilt effect based on cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        z: 20,
        transition: { duration: 0.2 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) translateZ(10px)` 
          : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
        transition: 'transform 0.2s ease'
      }}
    >
      {/* Card shadow for 3D effect */}
      <motion.div 
        className="absolute -inset-2 rounded-lg bg-black/5 -z-10"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ duration: 0.2 }}
      />

      <Link href={`/product/${id}`}>
        <div className="bg-white rounded-md overflow-hidden">
          {/* Product Image with hover glow */}
          <div className="relative h-72 overflow-hidden bg-dove-ivory">
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt='prodeuct'
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            {/* Illuminating hover effect */}
            <motion.div 
              className="absolute inset-0" 
              style={{
                background: isHovered 
                  ? `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(213, 160, 33, 0.2), rgba(213, 160, 33, 0) 70%)`
                  : 'none',
              }}
            />
            
            {/* Quick action buttons */}
            <motion.div 
              className="absolute bottom-0 inset-x-0 p-3 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button 
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-dove-navy"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
                whileTap={{ scale: 0.9 }}
              >
                {/* <Heart size={18} /> */}x
              </motion.button>
              
              <motion.button 
                className="bg-dove-navy/90 backdrop-blur-sm p-2 rounded-full text-white"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(10, 35, 66, 0.95)' }}
                whileTap={{ scale: 0.9 }}
              >
                {/* <ShoppingBag size={18} /> */}x
              </motion.button>
            </motion.div>
          </div>
          
          {/* Product info */}
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-1">{category}</p>
            <h3 className="font-medium text-dove-navy truncate">{name}</h3>
            <p className="text-dove-navy font-semibold mt-1">${price}</p>
            
            {/* View Details indicator */}
            <div className="mt-3 flex items-center">
              <motion.span 
                className="text-xs text-dove-gold font-medium"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10
                }}
                transition={{ duration: 0.2 }}
              >
                View Details
              </motion.span>
              <motion.div 
                className="ml-1 h-px bg-dove-gold"
                animate={{
                  width: isHovered ? 40 : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
