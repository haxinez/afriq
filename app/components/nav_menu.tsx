'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface MenuItem {
  name: string;
  href: string;
  subItems?: MenuItem[];
}

interface NavMenuProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const menuItems: MenuItem[] = [
  {
    name: 'Women',
    href: '/women',
    subItems: [
      { name: 'Dresses', href: '/women/dresses' },
      { name: 'Tops', href: '/women/tops' },
      { name: 'Outerwear', href: '/women/outerwear' },
    ],
  },
  {
    name: 'Men',
    href: '/men',
    subItems: [
      { name: 'Shirts', href: '/men/shirts' },
      { name: 'Outerwear', href: '/men/outerwear' },
    ],
  },
  { name: 'Accessories', href: '/accessories' },
  { name: 'Collections', href: '/collections' },

  {
    name: 'Account',
    href: '/user',
    subItems: [
      { name: 'Register', href: '/user/registre' },
      { name: 'Login', href: '/user/login' },
    ],
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ isMobile = false, onClose }) => {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    router.push(href);
    onClose?.();
  };

  return (
    <motion.nav
      className={`${
        isMobile
          ? 'fixed inset-0 bg-gray-900/95 backdrop-blur-md p-6 overflow-y-auto'
          : 'hidden md:flex items-center space-x-8'
      }`}
      initial={isMobile ? { x: '-100%' } : { opacity: 0 }}
      animate={isMobile ? { x: 0 } : { opacity: 1 }}
      exit={isMobile ? { x: '-100%' } : { opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-bold text-dove-gold">Afriq</h2>
          <button
            onClick={onClose}
            className="p-2 text-white cursor-pointer"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <ul className={`${isMobile ? 'space-y-4' : 'flex space-x-6'}`}>
        {menuItems.map((item, index) => (
          <NavItem
            key={item.name}
            item={item}
            isMobile={isMobile}
            onLinkClick={handleLinkClick}
            index={index}
          />
        ))}
      </ul>
    </motion.nav>
  );
};

interface NavItemProps {
  item: MenuItem;
  isMobile: boolean;
  onLinkClick: (href: string) => void;
  index: number;
}

const NavItem: React.FC<NavItemProps> = ({ item, isMobile, onLinkClick, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    if (item.subItems) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <li
      className={`relative ${isMobile ? 'border-b border-gray-700' : ''}`}
      onMouseEnter={() => !isMobile && item.subItems && setIsOpen(true)}
      onMouseLeave={() => !isMobile && item.subItems && setIsOpen(false)}
    >
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={() => onLinkClick(item.href)}
          className={`${
            isMobile ? 'py-3 text-lg' : 'py-2 text-base'
          } font-medium text-white hover:text-yellow-400 transition-colors duration-200`}
          aria-label={item.name}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {item.name}
          </motion.span>
        </Link>
        {item.subItems && (
          <motion.button
            onClick={toggleSubMenu}
            className={`p-2 text-white hover:text-yellow-400 ${
              isMobile ? '' : 'hidden'
            }`}
            aria-label={`Toggle ${item.name} submenu`}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-4 h-4 cursor-pointer "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && item.subItems && (
          <motion.ul
            className={`${
              isMobile
                ? 'pl-4 space-y-2 mt-2'
                : 'absolute top-full left-0 bg-gray-800 rounded-lg shadow-lg min-w-[200px] py-2'
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="menu"
            aria-label={`${item.name} submenu`}
          >
            {item.subItems.map((subItem) => (
              <li key={subItem.name} role="menuitem">
                <Link
                  href={subItem.href}
                  onClick={() => onLinkClick(subItem.href)}
                  className="block px-4 py-2 text-sm text-gray-200 hover:text-yellow-400 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <motion.span
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {subItem.name}
                  </motion.span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavMenu;