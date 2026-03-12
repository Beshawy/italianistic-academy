import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="relative bg-heading text-primary-foreground overflow-hidden">
      {/* Shiny Shimmer Effect Layer */}
      <motion.div 
        animate={{ 
          x: ['-100%', '100%'],
          opacity: [0, 0.1, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2
        }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 group cursor-default">
              <span className="text-xl font-bold group-hover:text-primary transition-colors duration-300">Italianista</span>
              <span className="text-xl font-light text-primary group-hover:text-white transition-colors duration-300">Academy</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary transition-all duration-300"
                  >
                    <motion.span 
                      className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" 
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-sm text-primary-foreground/70 group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 shrink-0 transition-colors group-hover:text-primary" />
                </div>
                <a href="tel:01558846311" className="hover:text-primary transition-colors mt-1.5 font-medium">01558846311</a>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-sm text-primary-foreground/70 group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 shrink-0 transition-colors group-hover:text-primary" />
                </div>
                <a href="mailto:italianista11@gmail.com" className="hover:text-primary transition-colors mt-1.5 font-medium">italianista11@gmail.com</a>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-sm text-primary-foreground/70 group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 shrink-0 transition-colors group-hover:text-primary" />
                </div>
                <span className="mt-1.5 font-medium">Alexandria, Egypt</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-primary-foreground/50">{t('footer.rights')}</p>
          <motion.a
            whileHover={{ scale: 1.1, color: "var(--primary)" }}
            href="https://www.facebook.com/ITALIANISTA77/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-foreground/50 hover:text-primary transition-colors flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Facebook
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
