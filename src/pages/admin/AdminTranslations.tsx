import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { translations, Locale } from '@/i18n/translations';

interface ContentItem {
  id: string;
  content_key: string;
  locale: string;
  content_value: string;
}

const locales: Locale[] = ['en', 'ar', 'it'];

const AdminTranslations = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('site_content').select('*').order('content_key');
    setContent(data || []);
    setLoading(false);
  };

  // Sync all hardcoded translations to DB
  const syncTranslations = async () => {
    setSyncing(true);
    const inserts: { content_key: string; locale: string; content_value: string }[] = [];

    for (const locale of locales) {
      const trans = translations[locale];
      for (const [key, value] of Object.entries(trans)) {
        inserts.push({ content_key: key, locale, content_value: value });
      }
    }

    // Upsert all
    const { error } = await supabase.from('site_content').upsert(inserts, {
      onConflict: 'content_key,locale',
    });

    if (error) toast.error(error.message);
    else toast.success(`Synced ${inserts.length} translations to database`);
    fetchContent();
    setSyncing(false);
  };

  const handleSave = async (item: ContentItem) => {
    const { error } = await supabase.from('site_content')
      .update({ content_value: item.content_value })
      .eq('id', item.id);
    if (error) toast.error('Failed'); else toast.success('Saved');
  };

  // Group by key
  const grouped = content.reduce((acc, item) => {
    if (!acc[item.content_key]) acc[item.content_key] = {};
    acc[item.content_key][item.locale] = item;
    return acc;
  }, {} as Record<string, Record<string, ContentItem>>);

  const filteredKeys = Object.keys(grouped).filter(k =>
    !filter || k.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-heading-3 font-bold">Translations</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage all website text in 3 languages</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            placeholder="Filter..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm w-40"
          />
          <button
            onClick={syncTranslations}
            disabled={syncing}
            className="bg-heading text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50"
          >
            {syncing ? 'Syncing...' : 'Sync All Translations'}
          </button>
        </div>
      </div>

      {content.length === 0 && (
        <div className="bg-card rounded-xl p-8 text-center shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
          <p className="text-muted-foreground mb-4">No translations in the database yet.</p>
          <p className="text-sm text-muted-foreground mb-4">Click "Sync All Translations" to import all hardcoded translations into the database so you can edit them.</p>
        </div>
      )}

      <div className="space-y-3">
        {filteredKeys.map((key) => (
          <div key={key} className="bg-card rounded-xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
            <code className="text-xs bg-muted px-2 py-1 rounded text-foreground font-mono mb-3 block">{key}</code>
            <div className="grid md:grid-cols-3 gap-3">
              {locales.map((locale) => {
                const item = grouped[key]?.[locale];
                if (!item) return null;
                return (
                  <div key={locale}>
                    <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                      {locale === 'en' ? '🇬🇧 EN' : locale === 'ar' ? '🇪🇬 AR' : '🇮🇹 IT'}
                    </label>
                    <textarea
                      value={item.content_value}
                      onChange={(e) => setContent(prev => prev.map(c => c.id === item.id ? { ...c, content_value: e.target.value } : c))}
                      onBlur={() => handleSave(item)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminTranslations;
