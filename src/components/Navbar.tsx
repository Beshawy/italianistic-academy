import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Locale } from '@/i18n/translations';
import { motion, AnimatePresence } from 'framer-motion';

const localeLabels: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  it: 'Italiano',
};

const Navbar = () => {
  const { t, locale, setLocale } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/courses', label: t('nav.courses') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-[1000] h-16 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-heading">Italianista</span>
            <span className="text-xl font-light text-primary">Academy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeLabels[locale]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute end-0 top-full mt-1 bg-card rounded-lg shadow-lg border border-border py-1 min-w-[140px] origin-top-right z-[1001]"
                  >
                    {(Object.keys(localeLabels) as Locale[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLocale(l); setLangOpen(false); }}
                        className={`w-full text-start px-4 py-2 text-sm transition-colors ${
                          locale === l ? 'text-primary bg-primary/5 font-medium' : 'text-foreground/70 hover:bg-muted'
                        }`}
                      >
                        {localeLabels[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button - Hidden when menu is open because the close button is inside */}
            {!mobileOpen && (
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg transition-all duration-300 z-[130] relative text-foreground hover:bg-muted"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu - MOVED OUTSIDE NAV TO ESCAPE STACKING CONTEXT */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[99997] bg-black/80 md:hidden backdrop-blur-md"
            />
            
            {/* Drawer (STRICTLY SOLID WHITE) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ backgroundColor: '#FFFFFF', opacity: 1, zIndex: 100000 }}
              className="fixed inset-y-0 right-0 w-full max-w-[280px] md:hidden shadow-2xl flex flex-col pt-4 overflow-y-auto pointer-events-auto"
            >
              {/* Menu Header - CLOSE BUTTON ONLY (Replaces Logo) */}
              <div className="px-6 py-4 flex justify-end items-center sticky top-0 bg-white z-[100001]">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-full hover:bg-muted transition-all duration-200 group"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7 text-black transition-transform group-hover:rotate-90" strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col px-2 mb-8 bg-white">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block w-full text-end px-8 py-4 text-lg font-bold transition-all duration-300 ${
                        isActive(link.to) 
                          ? 'text-primary' 
                          : 'text-heading hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="mt-auto px-8 py-10 bg-slate-100 border-t border-border/50">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6 font-black text-end">
                  {t('nav.language')}
                </div>
                <div className="flex flex-col gap-2">
                  {(Object.keys(localeLabels) as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setMobileOpen(false); }}
                      className={`text-end px-4 py-3 rounded-xl transition-all font-bold ${
                        locale === l 
                          ? 'bg-heading text-white shadow-lg' 
                          : 'text-heading/60 hover:text-heading hover:bg-white'
                      }`}
                    >
                      {localeLabels[l]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
