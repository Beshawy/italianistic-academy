import { useLanguage } from '@/i18n/LanguageContext';
import Section from '@/components/Section';
import { Target, Eye, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden">
      {/* Header */}
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
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 -right-10 w-80 h-80 bg-secondary/15 rounded-full blur-[100px]"
          />
          {/* Floating Elements */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              style={{
                left: `${10 + i * 20}%`,
                top: `${30 + (i % 2) * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 z-0" />

        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10 w-full text-center sm:text-start">
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-display sm:text-7xl font-extrabold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight tracking-tight mb-2"
            >
              {t('about.title')}
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full mt-2"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h2 className="text-heading-2 font-bold mb-6">{t('about.story.title')}</h2>
          <p className="text-body text-muted-foreground mb-4 leading-relaxed">{t('about.story.p1')}</p>
          <p className="text-body text-muted-foreground leading-relaxed">{t('about.story.p2')}</p>
        </motion.div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-muted">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-heading-3 font-bold mb-3">{t('about.mission.title')}</h3>
            <p className="text-body text-muted-foreground leading-relaxed">{t('about.mission.desc')}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-2xl p-8 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-heading-3 font-bold mb-3">{t('about.vision.title')}</h3>
            <p className="text-body text-muted-foreground leading-relaxed">{t('about.vision.desc')}</p>
          </motion.div>
        </div>
      </Section>

      {/* Founder */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
          <h2 className="text-heading-3 font-bold mb-6">{t('about.founder.title')}</h2>
          <p className="text-body text-muted-foreground italic leading-relaxed text-lg">
            {t('about.founder.desc')}
          </p>
        </motion.div>
      </Section>
    </div>
  );
};

export default About;
