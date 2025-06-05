'use client';
// src/components/layout/Footer.tsx
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: '/icons/twitter.svg' },
    { name: 'Instagram', href: 'https://instagram.com', icon: '/icons/instagram.svg' },
    { name: 'Facebook', href: 'https://facebook.com', icon: '/icons/facebook.svg' },
  ];

  // Footer link sections
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'Women', href: '/women' },
        { name: 'Men', href: '/men' },
        { name: 'Accessories', href: '/accessories' },
        { name: 'Collections', href: '/collections' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Sustainability', href: '/sustainability' },
        { name: 'Careers', href: '/careers' },
      ],
    },
  ];

  // Handle newsletter signup (placeholder)
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle collapsible section on mobile
  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
  };

  const linkVariants = {
    hover: { x: 4, color: '#D4A017', transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 12px rgba(212, 160, 23, 0.5)' },
    tap: { scale: 0.95 },
  };

  return (
    <footer className="relative bg-dove-navy text-dove-ivory py-12 px-4 sm:px-6 overflow-hidden border-t border-dove-light/20">
      {/* Subtle Wave Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dove-gold/20 to-transparent animate-wave" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Logo & Branding */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4
            className="mx-auto text-3xl font-poppins font-semibold"
          >Afriq.
          </h4>
          <p className="text-sm text-dove-ivory/80 mt-2 font-poppins">
            Taking charge of the African Heritage
          </p>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Footer Link Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              custom={index}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="sm:cursor-default">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex justify-between items-center w-full text-lg font-poppins font-semibold text-dove-ivory mb-3 sm:mb-4 sm:cursor-default"
                  aria-expanded={openSection === section.title}
                  aria-controls={`section-${section.title}`}
                >
                  {section.title}
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
                    className="sm:hidden"
                    animate={{ rotate: openSection === section.title ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {(openSection === section.title || window.innerWidth >= 640) && (
                    <motion.ul
                      id={`section-${section.title}`}
                      className="space-y-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} passHref>
                            <motion.span
                              className="text-sm text-dove-ivory/80 hover:text-dove-gold relative inline-block"
                              variants={linkVariants}
                              whileHover="hover"
                              whileTap="tap"
                            >
                              {link.name}
                              <motion.span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-dove-gold scale-x-0"
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </motion.span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Newsletter Signup */}
          <motion.div
            custom={footerLinks.length}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-lg font-poppins font-semibold text-dove-ivory mb-3 sm:mb-4">Stay Connected</h3>
            <p className="text-sm text-dove-ivory/80 mb-4">Join our newsletter for exclusive offers.</p>
            <form onSubmit={handleNewsletterSignup} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full py-2.5 px-4 bg-dove-navy/20 border-2 border-dove-gold/30 rounded-lg text-sm text-dove-ivory placeholder-dove-ivory/60 focus:outline-none focus:border-dove-gold focus:ring-2 focus:ring-dove-gold/20 transition-all duration-300"
                  aria-label="Newsletter email"
                  required
                />
                <motion.span
                  className="absolute inset-0 border-2 border-dove-gold/50 rounded-lg pointer-events-none"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-terracotta text-dove-ivory py-2.5 px-4 font-poppins font-medium text-sm rounded-lg relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-dove-ivory/20 to-transparent"
                  initial={{ x: -200 }}
                  animate={{ x: 200 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Media & Scroll to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-dove-light/20 pt-6">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 sm:mb-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dove-ivory/80 relative"
                whileHover={{ scale: 1.3, color: '#D4A017' }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Follow us on ${social.name}`}
              >
                <Image
                  src={social.icon}
                  alt={`${social.name} icon`}
                  width={28}
                  height={28}
                  className="filter invert opacity-80 hover:opacity-100"
                />
                <motion.span
                  className="absolute inset-0 rounded-full bg-dove-gold/20 scale-0"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="text-dove-ivory/80 hover:text-dove-gold font-poppins text-sm flex items-center relative"
            whileHover={{ scale: 1.1, color: '#D4A017' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M12 19V5m7 7l-7-7-7 7" />
            </svg>
            Back to Top
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-dove-gold scale-x-0"
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Copyright & Branding */}
        <div className="text-center mt-6">
          <p className="text-xs text-dove-ivory/60 font-poppins">
            © {currentYear} Afriq Store. developed by <span className="text-dove-gold">Haxine da Peton</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;