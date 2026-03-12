import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Section from '@/components/Section';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Quote } from 'lucide-react';

const iconMap: Record<string, any> = { BookOpen, GraduationCap, Users, Award };

import { motion } from 'framer-motion';

const Home = () => {
  const { t, locale } = useLanguage();

  const { data: stats } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data } = await supabase.from('statistics').select('*').order('sort_order');
      return data || [];
    },
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[220px] sm:min-h-[400px] flex items-center py-8 sm:py-16 lg:py-20 bg-slate-900 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-20 sm:opacity-25 bg-[length:100%_100%] bg-center bg-no-repeat transition-transform duration-1000"
          style={{ backgroundImage: 'url("/italianistic3.png")' }}
        />
        {/* Mobile-optimized overlays */}
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center text-center lg:text-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
                {t('hero.title')}
                <br />
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-primary inline-block mt-2"
                >
                  {t('hero.subtitle')}
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 text-body text-white drop-shadow-sm max-w-xl leading-relaxed font-medium mx-auto lg:mx-0"
              >
                {t('hero.description')}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 min-h-[44px]">
                  {t('hero.cta')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl font-medium text-sm border border-border hover:bg-muted transition-all hover:shadow-md min-h-[44px]">
                  {t('hero.courses')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img 
                  src="/italianistic1.png" 
                  alt="Italianista Academy" 
                  className="w-full h-auto max-w-[450px] mx-auto drop-shadow-2xl rounded-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="!py-16 bg-card border-b border-border overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {(stats || []).map((stat, idx) => {
            const Icon = iconMap[stat.icon || 'BookOpen'] || BookOpen;
            const value = (stat as any)[`value_${locale}`] || stat.value_en;
            const label = (stat as any)[`label_${locale}`] || stat.label_en;
            return (
              <motion.div 
                key={stat.id} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5,
                      filter: "drop-shadow(0 0 8px rgba(var(--primary), 0.5))"
                    }}
                    className="relative z-10 p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"
                  >
                    <Icon className="w-8 h-8 text-primary shadow-primary transition-colors duration-300 group-hover:text-secondary" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0.2 }}
                    className="absolute inset-0 bg-primary blur-xl rounded-full -z-1"
                  />
                </div>
                <div className="text-heading-3 font-bold tabular-nums text-heading mt-4 group-hover:text-primary transition-colors duration-300">{value}</div>
                <div className="text-sm text-muted-foreground mt-2 font-medium">{label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* Why Us */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 font-bold">{t('why.title')}</h2>
          <p className="mt-4 text-body text-muted-foreground max-w-2xl mx-auto">{t('why.subtitle')}</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['expert', 'curriculum', 'community', 'results'].map((key, idx) => (
            <motion.div 
              key={key} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              <h3 className="font-semibold text-heading mb-3">{t(`why.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`why.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      {/* Testimonials */}
      <Section className="bg-muted overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading-2 font-bold">{t('success.title')}</h2>
          <p className="mt-4 text-body text-muted-foreground max-w-2xl mx-auto">{t('success.subtitle')}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i, idx) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all border border-transparent hover:border-primary/10"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary transition-colors" />
              <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{t(`success.t${i}`)}"</p>
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {t(`success.t${i}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-heading">
                    {t(`success.t${i}.name`)}
                  </div>
                  <div className="text-xs text-muted-foreground">{t(`success.t${i}.role`)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="bg-heading rounded-2xl p-12 sm:p-16 text-center">
          <h2 className="text-heading-2 font-bold !text-primary-foreground">{t('cta.title')}</h2>
          <p className="mt-4 text-body text-primary-foreground/70 max-w-xl mx-auto">{t('cta.description')}</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors min-h-[44px]">
            {t('cta.button')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
