 'use client'
// src/pages/collections.tsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, MotionStyle, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Enums for filter options
enum CategoryFilter {
  All = 'All',
  Womens = 'Womens',
  Mens = 'Mens',
  Accessories = 'Accessories',
  Kids = 'Kids',
  Footwear = 'Footwear',
}

enum PriceFilter {
  All = 'All',
  Low = '0-50',
  Medium = '50-100',
  High = '100+',
}

// Interface for collection items
interface CollectionItem {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  link: string;
  category: CategoryFilter;
  priceRange: string;
}

// Component props (optional, for extensibility)
interface CollectionsProps {
 
}

// Animation variants types
interface CardVariants extends Variants {
  hidden: { opacity: number; y: number };
  visible: (i: number) => { opacity: number; y: number; transition: { delay: number; duration: number; ease: string } };
}

interface TiltVariants extends Variants {
  rest: { rotateX: number; rotateY: number; scale: number };
  hover: { scale: number; transition: { duration: number } };
}

interface FilterButtonVariants extends Variants {
  rest: { scale: number };
  hover: { scale: number };
  active: { scale: number; backgroundColor: string; color: string };
}

interface ButtonVariants extends Variants {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number; transition: { duration: number; delay: number } };
  hover: { scale: number; transition: { duration: number } };
  tap: { scale: number };
}

const Collections: React.FC<CollectionsProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isLoadMoreInView = useInView(loadMoreRef, { amount: 0.5 });

  // State with explicit types
  const [displayedItems, setDisplayedItems] = useState<number>(6);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(CategoryFilter.All);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>(PriceFilter.All);

  // Collection items
  const allCollections: CollectionItem[] = [
    {
      id: 'ankara-dress',
      title: 'Ankara Maxi Dress',
      image: '/images/ankara-maxi-dress.jpg',
      description: 'Vibrant geometric patterns, perfect for summer.',
      price: '$89.99',
      link: '/collections/womens/dresses/ankara-maxi',
      category: CategoryFilter.Womens,
      priceRange: PriceFilter.Medium,
    },
    {
      id: 'kente-shirt',
      title: 'Kente Shirt',
      image: '/images/kente-shirt.jpg',
      description: 'Rich woven fabric with bold colors.',
      price: '$59.99',
      link: '/collections/mens/shirts/kente',
      category: CategoryFilter.Mens,
      priceRange: PriceFilter.Medium,
    },
    {
      id: 'beaded-headwrap',
      title: 'Beaded Headwrap',
      image: '/images/beaded-headwrap.jpg',
      description: 'Intricate beadwork, vibrant design.',
      price: '$29.99',
      link: '/collections/accessories/headwraps/beaded',
      category: CategoryFilter.Accessories,
      priceRange: PriceFilter.Low,
    },
    {
      id: 'dashiki-tunic',
      title: 'Dashiki Tunic',
      image: '/images/dashiki-tunic.jpg',
      description: 'Traditional tunic with modern flair.',
      price: '$69.99',
      link: '/collections/mens/tunics/dashiki',
      category: CategoryFilter.Mens,
      priceRange: PriceFilter.Medium,
    },
    {
      id: 'adire-kaftan',
      title: 'Adire Kaftan',
      image: '/images/adire-kaftan.jpg',
      description: 'Indigo-dyed elegance for any occasion.',
      price: '$99.99',
      link: '/collections/womens/kaftans/adire',
      category: CategoryFilter.Womens,
      priceRange: PriceFilter.Medium,
    },
    {
      id: 'woven-necklace',
      title: 'Woven Necklace',
      image: '/images/woven-necklace.jpg',
      description: 'Handcrafted with African motifs.',
      price: '$39.99',
      link: '/collections/accessories/jewelry/woven',
      category: CategoryFilter.Accessories,
      priceRange: PriceFilter.Low,
    },
    {
      id: 'kids-dashiki',
      title: 'Kids’ Dashiki',
      image: '/images/kids-dashiki.jpg',
      description: 'Colorful dashiki for young trendsetters.',
      price: '$34.99',
      link: '/collections/kids/dashikis',
      category: CategoryFilter.Kids,
      priceRange: PriceFilter.Low,
    },
    {
      id: 'leather-sandals',
      title: 'Leather Sandals',
      image: '/images/leather-sandals.jpg',
      description: 'Handcrafted sandals with beaded details.',
      price: '$49.99',
      link: '/collections/footwear/sandals',
      category: CategoryFilter.Footwear,
      priceRange: PriceFilter.Low,
    },
    {
      id: 'mudcloth-scarf',
      title: 'Mudcloth Scarf',
      image: '/images/mudcloth-scarf.jpg',
      description: 'Bold patterns in earthy tones.',
      price: '$44.99',
      link: '/collections/accessories/scarves/mudcloth',
      category: CategoryFilter.Accessories,
      priceRange: PriceFilter.Low,
    },
  ];

  // Filter collections
  const filteredCollections: CollectionItem[] = allCollections.filter((item) => {
    const matchesCategory = categoryFilter === CategoryFilter.All || item.category === categoryFilter;
    const matchesPrice =
      priceFilter === PriceFilter.All || item.priceRange === priceFilter;
    return matchesCategory && matchesPrice;
  });

  // Infinite scroll logic
  useEffect(() => {
    if (isLoadMoreInView && displayedItems < filteredCollections.length) {
      setDisplayedItems((prev) => Math.min(prev + 6, filteredCollections.length));
    }
  }, [isLoadMoreInView, filteredCollections.length]);

  // Animation variants
  const cardVariants: CardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const tiltVariants: TiltVariants = {
    rest: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const filterButtonVariants: FilterButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    active: { scale: 0.95, backgroundColor: '#C14438', color: '#F4F1DE' },
  };

  const shopNowButtonVariants: ButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  // Handle filter button clicks
  const handleCategoryFilter = useCallback((category: CategoryFilter) => {
    setCategoryFilter(category);
    setDisplayedItems(6); // Reset scroll on filter change
  }, []);

  const handlePriceFilter = useCallback((price: PriceFilter) => {
    setPriceFilter(price);
    setDisplayedItems(6); // Reset scroll on filter change
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 bg-dove-navy text-dove-ivory min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          className="text-5xl font-serif font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Our Collections
        </motion.h1>

        {/* Filter Bar */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.values(CategoryFilter).map((cat) => (
              <motion.button
                key={cat}
                className={`px-4 py-2 rounded border border-dove-gold/20 text-dove-ivory font-medium ${
                  categoryFilter === cat ? 'bg-terracotta' : 'bg-dove-navy'
                }`}
                onClick={() => handleCategoryFilter(cat)}
                variants={filterButtonVariants}
                initial="rest"
                whileHover="hover"
                animate={categoryFilter === cat ? 'active' : 'rest'}
                transition={{ duration: 0.3 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          {/* Price Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.values(PriceFilter).map((price) => (
              <motion.button
                key={price}
                className={`px-4 py-2 rounded border border-dove-gold/20 text-dove-ivory font-medium ${
                  priceFilter === price ? 'bg-terracotta' : 'bg-dove-navy'
                }`}
                onClick={() => handlePriceFilter(price)}
                variants={filterButtonVariants}
                initial="rest"
                whileHover="hover"
                animate={priceFilter === price ? 'active' : 'rest'}
                transition={{ duration: 0.3 }}
              >
                ${price}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.slice(0, displayedItems).map((item, index) => (
            <Link key={item.id} href={item.link} passHref>
              <motion.div
                className="relative rounded-lg overflow-hidden border-2 border-terracotta/30 bg-dove-navy shadow-lg"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover="hover"
                variants={tiltVariants}
                style={{ perspective: '1000px' } as MotionStyle}
              >
                {/* African textile overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url('/images/ankara-pattern.png')`,
                    backgroundSize: 'cover',
                    zIndex: 0,
                  }}
                />
                {/* Image with terracotta overlay on hover */}
                <div className="relative h-80 z-10">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={index < 3}
                  />
                  <motion.div
                    className="absolute inset-0 bg-terracotta/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {/* Content */}
                <div className="p-6 text-center relative z-10">
                  <h2 className="text-xl font-serif font-bold text-dove-ivory mb-2">
                    {item.title}
                  </h2>
                  <p className="text-dove-ivory/80 text-sm mb-4">
                    {item.description}
                  </p>
                  <p className="text-dove-gold font-medium">{item.price}</p>
                </div>
                {/* African-inspired decorative border */}
                <div className="absolute inset-0 border-2 border-dove-gold/20 pointer-events-none z-10" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Load More Trigger for Infinite Scroll */}
        {displayedItems < filteredCollections.length && (
          <div ref={loadMoreRef} className="h-10 mt-8" />
        )}

        {/* Shop Now Button */}
        <div className="mt-12 text-center">
          <Link href="/shop" passHref>
            <motion.div
              className="relative inline-block group"
              variants={shopNowButtonVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute -inset-1 rounded bg-terracotta/50 blur-sm -z-10"
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="bg-terracotta text-dove-ivory py-3 px-8 font-medium rounded relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-dove-ivory/20 to-transparent"
                  initial={{ x: -200 }}
                  animate={{ x: 200 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                SHOP NOW
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;