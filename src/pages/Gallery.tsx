import { useLanguage } from '@/i18n/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Section from '@/components/Section';

import { motion } from 'framer-motion';

const Gallery = () => {
  const { t } = useLanguage();

  const { data: images } = useQuery({
    queryKey: ['gallery_images'],
    queryFn: async () => {
      const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
      return data || [];
    },
  });

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[300px] sm:min-h-[350px] flex items-center py-12 sm:py-20 bg-slate-950 border-b border-border overflow-hidden">
        {/* Animated Background Image - Refined for Large Screens */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-[length:100%_100%] sm:bg-cover lg:bg-[length:100%_100%] bg-center no-repeat"
          style={{ backgroundImage: 'url("/learnItalian.jpg")' }}
        />

        {/* Advanced Visual Nourishment: Floating Particles & Ambient Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Ambient Glows */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 -right-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px]"
          />
          {/* Floating Dots (Particles) */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        {/* Glassmorphism Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-start">
          <div className="relative inline-block">
            {/* Glossy backglow for title */}
            <div className="absolute -inset-x-8 -inset-y-4 bg-white/5 blur-xl rounded-full -z-1" />
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-display sm:text-7xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight tracking-tight mb-2"
            >
              {t('gallery.title')}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent rounded-full mt-2"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-xl sm:text-2xl text-white/80 drop-shadow-md max-w-2xl font-bold leading-relaxed mx-auto sm:mx-0 flex items-center gap-4 justify-center sm:justify-start"
          >
            <span className="hidden sm:block px-2 py-1 bg-secondary/20 rounded text-xs tracking-widest uppercase border border-secondary/30">Art</span>
            {t('gallery.subtitle')}
          </motion.p>
        </div>
      </section>

      <Section>
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={img.image_url}
                  alt={img.alt_text || ''}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,.05)] flex items-center justify-center text-muted-foreground/40"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-muted-foreground/10 mx-auto mb-2 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs">Upload via dashboard</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Gallery;
