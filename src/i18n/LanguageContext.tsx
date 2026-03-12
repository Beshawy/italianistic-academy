import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, Locale } from './translations';
import { supabase } from '@/integrations/supabase/client';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const [dbContent, setDbContent] = useState<Record<string, Record<string, string>>>({});

  // Fetch translations from DB
  useEffect(() => {
    supabase.from('site_content').select('content_key, locale, content_value')
      .then(({ data }) => {
        if (data && data.length > 0) {
          const grouped: Record<string, Record<string, string>> = {};
          for (const row of data) {
            if (!grouped[row.locale]) grouped[row.locale] = {};
            grouped[row.locale][row.content_key] = row.content_value;
          }
          setDbContent(grouped);
        }
      });
  }, []);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  const t = useCallback((key: string): string => {
    // DB translations take priority over hardcoded
    return dbContent[locale]?.[key] || translations[locale]?.[key] || translations['en']?.[key] || key;
  }, [locale, dbContent]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      <div dir={dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
