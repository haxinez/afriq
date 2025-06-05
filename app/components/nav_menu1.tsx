'use client';
// src/components/layout/NavMenu.tsx
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Category = {
  name: string;
  href: string;
};

type MenuSection = {
  title: string;
  categories: Category[];
};

type NavMenuProps = {
  isMobile?: boolean;
  onClose?: () => void;
};

const womenSections: MenuSection[] = [
  {
    title: 'Clothing',
    categories: [
      { name: 'Dresses', href: '/women/dresses' },
      { name: 'Tops', href: '/women/tops' },
      { name: 'Skirts', href: '/women/skirts' },
      { name: 'Outerwear', href: '/women/outerwear' },
    ],
  },
  {
    title: 'Collections',
    categories: [
      { name: 'Gele', href: '/collections/spring-2025' },
      { name: 'Footwear', href: '/collections/summer-essentials' },
      { name: 'Bags', href: '/collections/workwear' },
    ],
  },
];

const menSections: MenuSection[] = [
  {
    title: 'Clothing',
    categories: [
      { name: 'Shirts', href: '/men/shirts' },
      { name: 'Shorts', href: '/men/outerwear' },
    ],
  },
  {
    title: 'Collections',
    categories: [
      { name: 'Footwear', href: '/collections/business-casual' },
     
    ],
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ isMobile = false, onClose }) => {
  if (isMobile) {
    return (
      <motion.div
        className="flex flex-col space-y-4 p-4 overflow-y-hidden scrollbar-hide"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Shop by Catalogue Header */}
        <h2
          className="text-2xl font-semibold text-center text-dove-ivory mb-4 border rounded-b-sm"
        >
          Shop by Catalogue
        </h2>

        {/* Menu Items */}
        {[
          { title: 'Women', href: '/women', sections: womenSections },
          { title: 'Men', href: '/men', sections: menSections },
          { title: 'Accessories', href: '/accessories', sections: [] },
          { title: 'Collections', href: '/collections', sections: [] },
        ].map((item, index) => (
          
          <MobileNavItem 
            key={item.title}
            title={item.title}
            href={item.href}
            sections={item.sections}
            onClose={onClose}
            index={index}
          />
        ))}
      </motion.div>
    );
  }
  return null; // Desktop menu can be implemented separately
};

const MobileNavItem: React.FC<{
  title: string;
  href: string;
  sections: MenuSection[];
  onClose?: () => void;
  index: number;
}> = ({ title, href, sections, onClose, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between py-2.5 px-2 hover:bg-dove-ivory/10 rounded-lg">
        <Link href={href} onClick={onClose} passHref>
          <motion.span
            className="text-dove-ivory text-base font-poppins font-medium"
            whileHover={{ color: '#D4A017' }} // dove-gold
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.span>
        </Link>
        {sections.length > 0 && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-dove-ivory rounded-full"
            whileHover={{ scale: 1.1, color: '#D4A017' }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Toggle ${title} submenu`}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && sections.length > 0 && (
          <motion.div
            className="pl-4 space-y-2 bg-dove-ivory/5 rounded-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-poppins text-dove-ivory font-medium text-sm mb-1">{section.title}</h3>
                <ul className="space-y-1.5">
                  {section.categories.map((category) => (
                    <li key={category.name}>
                      <Link href={category.href} onClick={onClose} passHref>
                        <motion.span
                          className="text-xs text-dove-ivory/80 hover:text-dove-gold"
                          whileHover={{ x: 2, color: '#D4A017' }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          {category.name}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavMenu;