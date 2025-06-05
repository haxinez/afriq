'use client';
// src/components/layout/ShopByCatalogue.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ShopByCatalogue: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Catalogue categories with placeholder images
  const categories = [
    {
      id: 'womens-apparel',
      title: 'Women’s Apparel',
      image: '/images/womens-african-apparel.jpg',
      description: 'Elegant Ankara dresses and kaftans',
      link: '/collections/womens',
      badge: 'New Arrivals',
    },
    {
      id: 'mens-apparel',
      title: 'Men’s Apparel',
      image: '/images/mens-african-apparel.jpg',
      description: 'Stylish dashikis and tailored suits',
      link: '/collections/mens',
      badge: 'Best Sellers',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      image: '/images/african-accessories.jpg',
      description: 'Vibrant headwraps and jewelry',
      link: '/collections/accessories',
      badge: 'Limited Edition',
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  // Hover animation with subtle 3D tilt
  const tiltVariants = {
    rest: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  // Animation for View All button
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 12px rgba(193, 68, 56, 0.4), 0 0 0 2px rgba(212, 160, 23, 0.3)',
    },
    tap: { scale: 0.98 },
  };

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 bg-dove-navy text-dove-ivory overflow-y-auto scrollbar-hide md:overflow-y-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Shop by Catalogue Header */}
        <motion.h2
          className="text-3xl sm:text-4xl font-poppins font-semibold text-center mb-8 sm:mb-12 text-dove-ivory"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Shop by Catalogue
        </motion.h2>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.link} passHref>
              <motion.div
                className="relative rounded-lg overflow-hidden bg-dove-navy shadow-md hover:shadow-xl transition-shadow duration-300"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover="hover"
                variants={tiltVariants}
                style={{ perspective: '1000px' }}
              >
                {/* Image with Hover Zoom */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading={index > 0 ? 'lazy' : undefined}
                    />
                  </motion.div>
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-terracotta/20 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-dove-gold/90 text-dove-navy text-xs font-medium px-2 py-1 rounded">
                    {category.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 text-center">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-dove-ivory mb-2">
                    {category.title}
                  </h3>
                  <p className="text-dove-ivory/80 text-sm line-clamp-2">
                    {category.description}
                  </p>
                </div>

                {/* Subtle African Pattern Border */}
                <div className="absolute inset-0 border-2 border-dove-gold/10 pointer-events-none rounded-lg" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link href="/collections" passHref>
            <motion.div
              className="relative inline-block"
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Animated Gradient Border */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-terracotta via-dove-gold to-terracotta opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {/* Button */}
              <div className="relative bg-terracotta text-dove-ivory py-2.5 px-8 font-poppins font-medium text-sm sm:text-base rounded-lg overflow-hidden">
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-dove-ivory/20 to-transparent"
                  initial={{ x: -200 }}
                  animate={{ x: 200 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                View All
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByCatalogue;