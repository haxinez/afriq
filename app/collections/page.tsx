'use client';
// src/pages/collections.tsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Enums for filter and sort options
enum CategoryFilter {
  All = 'All',
  Womens = 'Womens',
  Mens = 'Mens',
  Accessories = 'Accessories',
  Kids = 'Kids',
  Footwear = 'Footwear',
}

enum SortOption {
  Default = 'Default',
  PriceLow = 'Price: Low to High',
  PriceHigh = 'Price: High to Low',
  Newest = 'Newest',
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

// Animation variants
interface CardVariants extends Variants {
  hidden: { opacity: number; y: number };
  visible: (i: number) => { opacity: number; y: number; transition: { delay: number; duration: number; ease: string } };
}

interface ButtonVariants extends Variants {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number; transition: { duration: number; delay: number } };
  hover: { scale: number; transition: { duration: number } };
  tap: { scale: number };
}

interface DropdownVariants extends Variants {
  hidden: { opacity: number; height: number };
  visible: { opacity: number; height: string; transition: { duration: number; ease: string } };
}

const Collections: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isLoadMoreInView = useInView(loadMoreRef, { amount: 0.5 });

  // State
  const [displayedItems, setDisplayedItems] = useState<number>(6);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(CategoryFilter.All);
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.Default);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Collection items
  const allCollections: CollectionItem[] = [
    {
      id: 'ankara-dress',
      title: 'Ankara Maxi Dress',
      image: '/images/ankara-maxi-dress.jpg',
      description: 'Vibrant geometric patterns, perfect for summer.',
      price: 'N85000',
      link: '/collections/womens/dresses/ankara-maxi',
      category: CategoryFilter.Womens,
      priceRange: 'Medium',
    },
    {
      id: 'kente-shirt',
      title: 'Kente Shirt',
      image: '/images/kente-shirt.jpg',
      description: 'Rich woven fabric with bold colors.',
      price: 'N50000',
      link: '/collections/mens/shirts/kente',
      category: CategoryFilter.Mens,
      priceRange: 'Medium',
    },
    {
      id: 'beaded-headwrap',
      title: 'Beaded Headwrap',
      image: '/images/beaded-headwrap.jpg',
      description: 'Intricate beadwork, vibrant design.',
      price: 'N20000',
      link: '/collections/accessories/headwraps/beaded',
      category: CategoryFilter.Accessories,
      priceRange: 'Low',
    },
    {
      id: 'dashiki-tunic',
      title: 'Dashiki Tunic',
      image: '/images/dashiki-tunic.jpg',
      description: 'Traditional tunic with modern flair.',
      price: 'N236000',
      link: '/collections/mens/tunics/dashiki',
      category: CategoryFilter.Mens,
      priceRange: 'Medium',
    },
    {
      id: 'adire-kaftan',
      title: 'Adire Kaftan',
      image: '/images/adire-kaftan.jpg',
      description: 'Indigo-dyed elegance for any occasion.',
      price: 'N45000',
      link: '/collections/womens/kaftans/adire',
      category: CategoryFilter.Womens,
      priceRange: 'Medium',
    },
    {
      id: 'woven-necklace',
      title: 'Woven Necklace',
      image: '/images/woven-necklace.jpg',
      description: 'Handcrafted with African motifs.',
      price: 'N73000',
      link: '/collections/accessories/jewelry/woven',
      category: CategoryFilter.Accessories,
      priceRange: 'Low',
    },
    {
      id: 'kids-dashiki',
      title: 'Kids’ Dashiki',
      image: '/images/kids-dashiki.jpg',
      description: 'Colorful dashiki for young trendsetters.',
      price: 'N51000',
      link: '/collections/kids/dashikis',
      category: CategoryFilter.Kids,
      priceRange: 'Low',
    },
    {
      id: 'leather-sandals',
      title: 'Leather Sandals',
      image: '/images/leather-sandals.jpg',
      description: 'Handcrafted sandals with beaded details.',
      price: 'N490000',
      link: '/collections/footwear/sandals',
      category: CategoryFilter.Footwear,
      priceRange: 'Low',
    },
    {
      id: 'mudcloth-scarf',
      title: 'Mudcloth Scarf',
      image: '/images/mudcloth-scarf.jpg',
      description: 'Bold patterns in earthy tones.',
      price: 'N44000',
      link: '/collections/accessories/scarves/mudcloth',
      category: CategoryFilter.Accessories,
      priceRange: 'Low',
    },
  ];

  // Filter and sort collections
  const filteredCollections: CollectionItem[] = allCollections
    .filter((item) => {
      const matchesCategory = categoryFilter === CategoryFilter.All || item.category === categoryFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === SortOption.PriceLow) {
        return parseFloat(a.price.replace('N', '')) - parseFloat(b.price.replace('N', ''));
      } else if (sortOption === SortOption.PriceHigh) {
        return parseFloat(b.price.replace('N', '')) - parseFloat(a.price.replace('N', ''));
      }
      return 0;
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
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const buttonVariants: ButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  const dropdownVariants: DropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  // Handlers
  const handleCategoryFilter = useCallback((category: CategoryFilter) => {
    setCategoryFilter(category);
    setDisplayedItems(6);
    setIsCategoryDropdownOpen(false);
  }, []);

  const handleSortOption = useCallback((sort: SortOption) => {
    setSortOption(sort);
    setDisplayedItems(6);
    setIsSortDropdownOpen(false);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setDisplayedItems(6);
  }, []);

  return (
    <section ref={ref} className="py-12 bg-dove-navy text-dove-ivory min-h-screen overflow-y-auto md:overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 text-xs md:text-sm">
          <Link href="/" className="text-dove-gold hover:text-terracotta">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Collections</span>
        </nav>

        {/* Title with Dynamic Underline */}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-8 relative">
          Our Collections
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dove-ivory to-transparent mx-auto" style={{ width: 'calc(100% - 2rem)' }}></span>
        </h1>

        {/* Sticky Filter Bar */}
        <motion.div
          className="sticky top-0 z-20 bg-dove-navy/95 backdrop-blur-sm py-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col gap-3">
            {/* Filters (Mobile) */}
            <div className="flex md:hidden items-center justify-between gap-4">
              {/* Category Dropdown */}
              <div className="relative w-32">
                <motion.button
                  className="w-full py-2 px-3 bg-dove-navy border border-dove-gold/20 rounded text-xs flex justify-between items-center"
                  onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Toggle category filter dropdown"
                >
                  <span className="truncate">Category: {categoryFilter}</span>
                  <svg
                    className={`w-3 h-3 transform transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <motion.div
                  className="absolute top-full left-0 w-full bg-dove-navy border border-dove-gold/20 rounded mt-1 z-10 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate={isCategoryDropdownOpen ? 'visible' : 'hidden'}
                >
                  {Object.values(CategoryFilter).map((cat) => (
                    <motion.button
                      key={cat}
                      className={`w-full px-3 py-1.5 text-xs text-left hover:bg-terracotta/50 ${
                        categoryFilter === cat ? 'bg-terracotta' : ''
                      }`}
                      onClick={() => handleCategoryFilter(cat)}
                      whileHover={{ backgroundColor: '#C14438' }}
                      aria-label={`Select category ${cat}`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-32">
                <motion.button
                  className="w-full py-2 px-3 bg-dove-navy border border-dove-gold/20 rounded text-xs flex justify-between items-center"
                  onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Toggle sort dropdown"
                >
                  <span className="truncate">Sort: {sortOption}</span>
                  <svg
                    className={`w-3 h-3 transform transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <motion.div
                  className="absolute top-full left-0 w-full bg-dove-navy border border-dove-gold/20 rounded mt-1 z-10 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate={isSortDropdownOpen ? 'visible' : 'hidden'}
                >
                  {Object.values(SortOption).map((sort) => (
                    <motion.button
                      key={sort}
                      className={`w-full px-3 py-1.5 text-xs text-left hover:bg-terracotta/50 ${
                        sortOption === sort ? 'bg-terracotta' : ''
                      }`}
                      onClick={() => handleSortOption(sort)}
                      whileHover={{ backgroundColor: '#C14438' }}
                      aria-label={`Select sort option ${sort}`}
                    >
                      {sort}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex items-center justify-between gap-4">
              {/* Category Buttons */}
              <div className="flex gap-2  whitespace-nowrap pb-2 scrollbar-hide">
                {Object.values(CategoryFilter).map((cat) => (
                  <motion.button
                    key={cat}
                    className={`px-3 py-1.5 rounded-full border border-dove-gold/80 text-sm font-medium ${
                      categoryFilter === cat ? 'bg-terracotta text-dove-ivory' : 'bg-dove-navy text-dove-ivory'
                    }`}
                    onClick={() => handleCategoryFilter(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Filter by ${cat}`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search collections..."
                  className="w-full py-2.5 px-4 bg-dove-navy/90 border-2 border-dove-ivory/45 rounded-full text-sm text-dove-ivory placeholder-dove-ivory/60 focus:outline-none focus:border-dove-gold  transition-all duration-300"
                  aria-label="Search collections"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dove-ivory/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-48">
                <motion.button
                  className="w-full py-2.5 px-4 bg-dove-navy border border-dove-gold/20 rounded text-sm flex justify-between items-center"
                  onClick={() => setIsSortDropdownOpen((prev) => !prev)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Toggle sort dropdown"
                >
                  <span className="truncate">Sort: {sortOption}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
                <motion.div
                  className="absolute top-full left-0 w-full bg-dove-navy border border-dove-gold/20 rounded mt-1 z-10 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate={isSortDropdownOpen ? 'visible' : 'hidden'}
                >
                  {Object.values(SortOption).map((sort) => (
                    <motion.button
                      key={sort}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-terracotta/50 ${
                        sortOption === sort ? 'bg-terracotta' : ''
                      }`}
                      onClick={() => handleSortOption(sort)}
                      whileHover={{ backgroundColor: '#C14438' }}
                      aria-label={`Select sort option ${sort}`}
                    >
                      {sort}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Search Bar (Mobile) */}
            <div className="md:hidden relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search collections..."
                className="w-full py-2.5 px-4 bg-dove-navy/80 border-2  border-dove-ivory/45 rounded-full text-sm text-dove-ivory placeholder-dove-ivory/60 focus:outline-none focus:border-dove-gold  transition-all duration-300"
                aria-label="Search collections"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dove-ivory/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCollections.slice(0, displayedItems).map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-dove-navy rounded-lg shadow-md overflow-hidden relative group"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {/* Product Image */}
              <div className="relative w-full h-56 md:h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div
                  className="absolute inset-0 bg-terracotta/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4">
                <h3 className="text-base md:text-lg font-serif font-medium line-clamp-1">{item.title}</h3>
                <p className="text-dove-gold text-sm md:text-base">{item.price}</p>
                <p className="text-dove-ivory/80 text-xs md:text-sm mt-1 line-clamp-2">{item.description}</p>
              </div>

              {/* Action Button (Mobile: Always Visible, Desktop: On Hover) */}
              <div className="p-3 md:p-4 md:absolute md:inset-x-0 md:bottom-0 md:bg-dove-navy/90 md:flex md:justify-center md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300">
                <Link href={item.link} passHref>
                  <motion.button
                    className="w-full md:w-auto bg-terracotta text-dove-ivory py-2 px-4 rounded text-xs md:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View details for ${item.title}`}
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Trigger */}
        {displayedItems < filteredCollections.length && (
          <div ref={loadMoreRef} className="h-10 mt-8" />
        )}

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <motion.button
            className="bg-terracotta text-dove-ivory py-2 px-6 rounded font-medium text-sm md:text-base"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setDisplayedItems((prev) => prev + 6)}
            aria-label="Load more collections"
          >
            Load More
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Collections;