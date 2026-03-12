import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Save, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  content_key: string;
  locale: string;
  content_value: string;
}

const locales = ['en', 'ar', 'it'] as const;

const AdminContent = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from('site_content').select('*').order('content_key');
    setContent(data || []);
    setLoading(false);
  };

  const handleSave = async (item: ContentItem) => {
    setSaving(true);
    const { error } = await supabase.from('site_content')
      .update({ content_value: item.content_value })
      .eq('id', item.id);
    if (error) toast.error('Failed to save');
    else toast.success('Saved');
    setSaving(false);
  };

  const handleAdd = async () => {
    if (!newKey.trim()) return;
    const inserts = locales.map(locale => ({
      content_key: newKey.trim(),
      locale,
      content_value: '',
    }));
    const { error } = await supabase.from('site_content').insert(inserts);
    if (error) toast.error(error.message);
    else {
      toast.success('Added');
      setNewKey('');
      fetchContent();
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Delete all translations for "${key}"?`)) return;
    const { error } = await supabase.from('site_content').delete().eq('content_key', key);
    if (error) toast.error(error.message);
    else {
      toast.success('Deleted');
      fetchContent();
    }
  };

  // Group content by key
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
          <h2 className="text-heading-3 font-bold">Site Content</h2>
          <p className="text-sm text-muted-foreground mt-1">Edit translatable text content</p>
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Filter by key..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm w-48"
          />
        </div>
      </div>

      {/* Add new key */}
      <div className="bg-card rounded-xl p-4 mb-6 shadow-[0_0_0_1px_rgba(0,0,0,.05)] flex gap-2">
        <input
          placeholder="New content key (e.g. hero.tagline)"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
        />
        <button onClick={handleAdd} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Content items */}
      <div className="space-y-4">
        {filteredKeys.map((key) => (
          <div key={key} className="bg-card rounded-xl p-4 shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
            <div className="flex items-center justify-between mb-3">
              <code className="text-xs bg-muted px-2 py-1 rounded text-foreground font-mono">{key}</code>
              <button onClick={() => handleDelete(key)} className="text-destructive/60 hover:text-destructive p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {locales.map((locale) => {
                const item = grouped[key]?.[locale];
                if (!item) return null;
                return (
                  <div key={locale}>
                    <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                      {locale === 'en' ? '🇬🇧 English' : locale === 'ar' ? '🇪🇬 Arabic' : '🇮🇹 Italian'}
                    </label>
                    <textarea
                      value={item.content_value}
                      onChange={(e) => {
                        setContent(prev => prev.map(c =>
                          c.id === item.id ? { ...c, content_value: e.target.value } : c
                        ));
                      }}
                      onBlur={() => handleSave(item)}
                      rows={3}
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

      {filteredKeys.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No content found. Add content using the form above.
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContent;
