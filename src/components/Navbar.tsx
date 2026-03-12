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
            
            {/* Drawer — LUXURY DARK GLASSMORPHISM */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ 
                zIndex: 100000,
                background: 'rgba(30, 30, 40, 0.25)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
              }}
              className="fixed inset-y-0 right-0 w-full max-w-[300px] md:hidden flex flex-col border-l border-white/[0.06] shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)] overflow-y-auto"
            >
              {/* Cinematic Ambient Glows (very subtle) */}
              <div className="absolute top-[-60px] right-[-60px] w-[220px] h-[220px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-[100px] left-[-80px] w-[260px] h-[260px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

              {/* Top Bar — Close Button */}
              <div className="flex items-center justify-end px-7 pt-8 pb-4 relative z-10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:rotate-90 group"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* Thin Decorative Top Line */}
              <div className="mx-7 h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-10" />

              {/* Navigation Links — Luxury Typography */}
              <nav className="flex flex-col px-7 gap-0.5 flex-1 relative z-10">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center justify-between py-5 border-b transition-all duration-300 ${
                        isActive(link.to)
                          ? 'border-white/20 text-white'
                          : 'border-white/[0.06] text-white/50 hover:text-white hover:border-white/15'
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-[0.2em] uppercase">
                        {link.label}
                      </span>
                      <motion.span
                        animate={{ opacity: isActive(link.to) ? 1 : 0, x: isActive(link.to) ? 0 : -5 }}
                        className="text-white/30 text-xs"
                      >
                        ●
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom — Language Switcher */}
              <div className="px-7 pb-12 pt-8 relative z-10">
                <div className="h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/25 mb-5">Language</p>
                <div className="flex gap-4">
                  {(Object.keys(localeLabels) as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setMobileOpen(false); }}
                      className={`text-xs tracking-widest uppercase font-semibold transition-all duration-300 ${
                        locale === l
                          ? 'text-white border-b border-white/40 pb-0.5'
                          : 'text-white/30 hover:text-white/60'
                      }`}
                    >
                      {l.toUpperCase()}
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
