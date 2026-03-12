import { useLanguage } from '@/i18n/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Section from '@/components/Section';
import { Clock, CheckCircle } from 'lucide-react';
import type { Locale } from '@/i18n/translations';

import { motion } from 'framer-motion';

const Courses = () => {
  const { t, locale } = useLanguage();

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await supabase.from('courses').select('*').order('sort_order');
      return data || [];
    },
  });

  const getLocalized = (course: any, field: string) => {
    return course[`${field}_${locale}`] || course[`${field}_en`] || '';
  };

  const getObjectives = (course: any): string[] => {
    return course[`objectives_${locale}`] || course[`objectives_en`] || [];
  };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[300px] sm:min-h-[450px] flex items-center py-16 sm:py-28 bg-slate-950 border-b border-border overflow-hidden">
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center no-repeat"
          style={{ backgroundImage: 'url("/download.jpg")' }}
        />
        
        {/* Animated Decorative Elements (Visual Nourishment) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"
          />
        </div>

        {/* Global Overlays */}
        <div className="absolute inset-0 bg-black/30 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-start">
          <div className="relative inline-block">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"
            />
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-display sm:text-7xl font-extrabold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight tracking-tight mb-2"
            >
              {t('courses.title')}
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-xl sm:text-2xl text-white/90 drop-shadow-md max-w-2xl font-bold leading-relaxed mx-auto sm:mx-0 flex items-center gap-3 justify-center sm:justify-start"
          >
            <span className="w-8 h-[2px] bg-primary/50 hidden sm:block" />
            {t('courses.subtitle')}
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8">
          {courses?.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-8 sm:p-10 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    course.accent_color === 'primary' ? 'bg-primary/10 text-primary' :
                    course.accent_color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                    'bg-heading/10 text-heading'
                  }`}>
                    {getLocalized(course, 'subtitle')}
                  </div>
                  <h2 className="text-heading-3 font-bold mb-3 group-hover:text-primary transition-colors duration-300">{getLocalized(course, 'title')}</h2>
                  <p className="text-body text-muted-foreground mb-4 max-w-xl leading-relaxed">
                    {getLocalized(course, 'description')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{t('courses.duration')}: {getLocalized(course, 'duration')}</span>
                  </div>
                </div>
                <div className="lg:w-80 shrink-0">
                  <h4 className="text-sm font-semibold text-heading mb-3">{t('courses.objectives')}</h4>
                  <ul className="space-y-3">
                    {getObjectives(course).map((obj: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Courses;
