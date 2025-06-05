'use client'
// src/components/layout/NavMenu.tsx
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

type Category = {
  name: string;
  href: string;
};

type MenuSection = {
  title: string;
  categories: Category[];
};

const womenSections: MenuSection[] = [
  {
    title: "Clothing",
    categories: [
      { name: "Dresses", href: "/women/dresses" },
      { name: "Tops", href: "/women/tops" },
      { name: "Skirts", href: "/women/skirts" },
      { name: "Pants", href: "/women/pants" },
      { name: "Outerwear", href: "/women/outerwear" },
    ]
  },
  {
    title: "Collections",
    categories: [
      { name: "Spring 2025", href: "/collections/spring-2025" },
      { name: "Summer Essentials", href: "/collections/summer-essentials" },
      { name: "Workwear", href: "/collections/workwear" },
    ]
  }
];

const menSections: MenuSection[] = [
  {
    title: "Clothing",
    categories: [
      { name: "Shirts", href: "/men/shirts" },
      { name: "Pants", href: "/men/pants" },
      { name: "Suits", href: "/men/suits" },
      { name: "Outerwear", href: "/men/outerwear" },
    ]
  },
  {
    title: "Collections",
    categories: [
      { name: "Spring 2025", href: "/collections/men-spring-2025" },
      { name: "Business Casual", href: "/collections/business-casual" },
      { name: "Weekend", href: "/collections/weekend" },
    ]
  }
];

const NavMenu: React.FC = () => {
  return (
    <NavigationMenu.Root className="relative z-10">
      <NavigationMenu.List className="flex items-center space-x-8">
        <NavItem title="Women" sections={womenSections} />
        <NavItem title="Men" sections={menSections} />
        {/* Add more items as needed */}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

const NavItem: React.FC<{ title: string; sections: MenuSection[] }> = ({ title, sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu.Item onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <NavigationMenu.Trigger
        className="text-dove-navy font-sans text-sm flex items-center gap-1 group"
        onPointerMove={() => setIsOpen(true)}
        onPointerLeave={() => setIsOpen(false)}
      >
        {title}
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-1"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
        
        <motion.span 
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-dove-gold" 
          initial={{ width: 0 }}
          animate={{ width: isOpen ? '100%' : 0 }}
          transition={{ duration: 0.2 }}
        />
      </NavigationMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <NavigationMenu.Content asChild forceMount>
            <motion.div
              className="absolute top-full left-0 mt-1 w-screen max-w-sm p-6 bg-white rounded-md shadow-lg"
              initial={{ opacity: 0, y: -10, rotateX: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                boxShadow: "0 10px 25px rgba(10, 35, 66, 0.1), 0 2px 10px rgba(213, 160, 33, 0.05)"
              }}
              exit={{ opacity: 0, y: -10, rotateX: -10 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: "top center", perspective: "1000px" }}
            >
              <div className="grid grid-cols-2 gap-6">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-serif text-dove-navy font-medium text-base mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.categories.map((category) => (
                        <li key={category.name}>
                          <Link href={category.href}>
                            <motion.span
                              className="text-sm text-gray-700 hover:text-dove-navy inline-block"
                              whileHover={{ x: 3, textShadow: "0px 1px 2px rgba(10, 35, 66, 0.1)" }}
                              transition={{ duration: 0.1 }}
                            >
                              {category.name}
                            </motion.span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom featured section with glow effect */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <motion.div 
                  className="bg-dove-ivory rounded-md p-4 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-dove-gold/10 to-transparent"
                    animate={{ 
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <p className="font-serif text-dove-navy text-sm font-medium mb-1">New Arrivals</p>
                  <p className="text-xs text-gray-600">Explore our latest spring collection</p>
                </motion.div>
              </div>
            </motion.div>
          </NavigationMenu.Content>
        )}
      </AnimatePresence>
    </NavigationMenu.Item>
  );
};

export default NavMenu;
