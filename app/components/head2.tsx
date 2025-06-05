 
// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, User, ShoppingBag } from 'lucide-react';
import NavMenu from './NavMenu';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for header behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position for lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      className="fixed w-full z-50 py-4 px-6"
      initial={{ y: 0 }}
      animate={{
        y: 0,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 2px 10px rgba(0, 0, 0, 0.03)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo with subtle 3D effect */}
        <Link href="/" className="relative">
          <motion.div
            className="absolute -inset-2 rounded-lg"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(213, 160, 33, 0.15), rgba(213, 160, 33, 0) 70%)`,
              zIndex: -1,
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.h1
            className="text-3xl font-serif font-bold text-dove-navy"
            whileHover={{
              scale: 1.03,
              textShadow: "0px 2px 4px rgba(10, 35, 66, 0.2)",
            }}
          >
            DOVE
          </motion.h1>
        </Link>

        {/* Main Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavMenuItem href="/women" label="Women" />
          <NavMenuItem href="/men" label="Men" />
          <NavMenuItem href="/accessories" label="Accessories" />
          <NavMenuItem href="/collections" label="Collections" />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <motion.button
            className="text-dove-navy p-1"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
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

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <NavIcon icon={<Search size={20} />} />
          <NavIcon icon={<User size={20} />} />
          <div className="relative">
            <NavIcon icon={<ShoppingBag size={20} />} />
            <span className="absolute -top-1 -right-1 bg-dove-gold text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              2
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-white z-40 md:hidden"
        initial={{ x: '-100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="pt-20 px-6">
          <NavMenu isMobile={true} onClose={toggleMobileMenu} />
        </div>
      </motion.div>
    </motion.header>
  );
};

// Helper component for navigation items with 3D hover effect
const NavMenuItem: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  return (
    <Link href={href} className="relative">
      <motion.span
        className="text-dove-navy font-sans text-sm relative inline-block"
        whileHover={{
          y: -1,
          textShadow: "0px 2px 4px rgba(10, 35, 66, 0.2)",
        }}
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

// Helper component for icons with glow effect
const NavIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: ["0 0 0 rgba(213, 160, 33, 0)", "0 0 10px rgba(213, 160, 33, 0.5)", "0 0 0 rgba(213, 160, 33, 0)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="text-dove-navy">{icon}</div>
    </motion.div>
  );
};

export default Header;