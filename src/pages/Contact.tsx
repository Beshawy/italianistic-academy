import { useLanguage } from '@/i18n/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Section from '@/components/Section';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

import { motion } from 'framer-motion';

const Contact = () => {
  const { t, locale } = useLanguage();

  const { data: settings } = useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data } = await supabase.from('site_settings').select('*');
      const map: Record<string, string> = {};
      data?.forEach(s => { map[s.setting_key] = s.setting_value; });
      return map;
    },
  });

  const s = settings || {};

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[300px] sm:min-h-[350px] flex items-center py-12 sm:py-20 bg-slate-950 border-b border-border overflow-hidden">
        {/* Animated Background Image - Refined for Large Screens */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-[length:100%_100%] sm:bg-cover lg:bg-[length:100%_100%] bg-center no-repeat"
          style={{ backgroundImage: 'url("/italianistic3.png")' }}
        />

        {/* Ambient Visual Nourishment */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              y: [0, -30, 0],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-72 h-72 bg-primary/15 rounded-full blur-[90px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
              y: [0, 40, 0],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-[110px]"
          />
          {/* Floating Particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${40 + (i % 2) * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Glassmorphism Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-start">
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-display sm:text-7xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight tracking-tight mb-2"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full mt-2"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-xl sm:text-2xl text-white/90 drop-shadow-md max-w-2xl font-bold leading-relaxed mx-auto sm:mx-0 flex items-center gap-4 justify-center sm:justify-start"
          >
            <span className="w-8 h-[2px] bg-primary/40 hidden sm:block" />
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1">{t('contact.phone')}</h3>
                <a href={`https://wa.me/${s.whatsapp || '201558846311'}`} className="text-body text-primary hover:underline">
                  {s.phone || '01558846311'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1">{t('contact.email')}</h3>
                <a href={`mailto:${s.email || 'italianista11@gmail.com'}`} className="text-body text-primary hover:underline">
                  {s.email || 'italianista11@gmail.com'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1">{t('contact.address')}</h3>
                <p className="text-body text-muted-foreground whitespace-pre-line">
                  {s[`address_${locale}`] || s.address_en || t('contact.addressValue')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <ExternalLink className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-heading mb-1">{t('contact.followUs')}</h3>
                <a href={s.facebook_url || 'https://www.facebook.com/ITALIANISTA77/'} target="_blank" rel="noopener noreferrer" className="text-body text-primary hover:underline">
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-semibold text-heading mb-4">{t('contact.findUs')}</h3>
            <div className="rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] aspect-[4/3] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3412.8!2d30.023069!3d31.270014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDE2JzEyLjEiTiAzMMKwMDEnMjMuMSJF!5e0!3m2!1sen!2seg!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Italianista Academy Location"
                className="group-hover:grayscale-0 transition-all duration-500 grayscale-[0.2]"
              />
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
