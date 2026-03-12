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
            
            {/* Drawer (ENHANCED PREMIUM DESIGN) */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ zIndex: 100000 }}
              className="fixed inset-y-0 right-0 w-full max-w-[280px] md:hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col pt-4 overflow-y-auto pointer-events-auto bg-slate-950 border-l border-white/10"
            >
              {/* Shining Shimmer Effect Overlay */}
              <motion.div 
                animate={{ 
                  x: ['-200%', '200%'],
                  opacity: [0, 0.2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 3
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none skew-x-[-20deg]"
              />

              {/* Ambient Glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] pointer-events-none rounded-full" />
              <div className="absolute bottom-40 left-0 w-40 h-40 bg-secondary/10 blur-[80px] pointer-events-none rounded-full" />

              {/* Menu Header - CLOSE BUTTON ONLY (Moves with scroll) */}
              <div className="px-6 py-4 flex justify-between items-center relative z-[100001]">
                <div /> {/* Spacer to push X to the end if needed, or handled by dir */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group shadow-lg sm:p-4"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7 text-white transition-transform group-hover:rotate-90 group-hover:scale-110" strokeWidth={2.5} />
                </button>
              </div>

              <div className="flex flex-col px-4 mb-8 relative z-10">
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
                      className={`block w-full text-start px-8 py-4 text-xl font-bold transition-all duration-300 relative group overflow-hidden rounded-2xl ${
                        isActive(link.to) 
                          ? 'text-white' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {/* Active/Hover Background Glow */}
                      {(isActive(link.to)) && (
                        <motion.div 
                          layoutId="activeNavMobile"
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent z-0"
                        />
                      )}
                      <span className="relative z-10 block transform transition-transform group-hover:translate-x-2">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Language Switcher */}
              <div className="mt-auto px-6 py-10 bg-white/5 border-t border-white/10 relative z-10 backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                  {(Object.keys(localeLabels) as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setMobileOpen(false); }}
                      className={`text-start px-5 py-4 rounded-2xl transition-all font-bold border ${
                        locale === l 
                          ? 'bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] border-primary' 
                          : 'text-white/60 hover:text-white hover:bg-white/10 border-transparent hover:border-white/10'
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
