"use client"
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavMenu from './nav_menu';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOverHero, setIsOverHero] = useState(true);

  // Track scroll position and progress
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 20);
    
    // Calculate scroll progress
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalScroll) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    try {
      window.addEventListener('scroll', handleScroll);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Intersection Observer for hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverHero(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const heroElement = document.querySelector('#hero-section');
    if (heroElement) observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (error) return <div className="text-red-500">Error loading header</div>;
  if (isLoading) return <div className="animate-pulse">Loading...</div>;

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-dove-gold z-[60]"
        style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      />

      <motion.header
        className={`fixed w-full z-50 py-4 px-6 ${
          scrolled ? 'text-dove-navy' : 'text-dove-navy'
        }`}
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: scrolled 
            ? isOverHero 
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(10, 35, 66, 0.95)'
            : 'transparent',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.15)'
            : 'none',
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo with subtle 3D effect */}
          <Link href="/" className="relative">
            <div className="absolute -inset-2 rounded-lg"/>
            <h1 className="text-3xl font-serif font-bold text-dove-navy">
              Afriq
            </h1>
          </Link>

          

          {/* Main Navigation with 3D Hover Effects */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavMenuItem href="/women" label="Women" />
            <NavMenuItem href="/men" label="Men" />
            <NavMenuItem href="/accessories" label="Accessories" />
            <NavMenuItem href="/collections" label="Collections" />
          </nav>

          <ul className='hidden md:flex space-x-1 text-sm'>
            <li><NavMenuItem href="/register" label="Register" /></li>
            <li>|</li>
            <li><NavMenuItem href="/login" label="Login" /></li>
          </ul>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <motion.button
              className="text-dove-navy p-1 cursor-pointer"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-dove-navy/95 z-40 md:hidden overflow-y-hidden"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ 
                duration: 0.4, 
                ease: [0.4, 0, 0.2, 1] 
              }}
            >
              <div className="pt-20 px-6">
                <NavMenu isMobile={true} onClose={toggleMobileMenu} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

// Helper component for navigation items with 3D hover effect
const NavMenuItem: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link href={href} className="relative">
      <motion.span 
        className="text-dove-light font-sans text-sm relative inline-block"
       
      >
        {label}
        <motion.span 
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-dove-gold" 
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.2 }}
        />
      </motion.span>
    </Link>
  );
};

export default Header;