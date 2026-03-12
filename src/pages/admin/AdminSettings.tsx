import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface SettingRow {
  id: string;
  setting_key: string;
  setting_value: string;
}

const settingGroups = [
  {
    title: 'Contact Information',
    keys: ['phone', 'whatsapp', 'email'],
  },
  {
    title: 'Address (Multilingual)',
    keys: ['address_en', 'address_ar', 'address_it'],
    textarea: true,
  },
  {
    title: 'Social & Maps',
    keys: ['facebook_url', 'google_maps_url'],
  },
  {
    title: 'SEO',
    keys: ['seo_title', 'seo_description'],
  },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from('site_settings').select('*').order('setting_key')
      .then(({ data }) => { setSettings(data || []); setLoading(false); });
  }, []);

  const getValue = (key: string) => settings.find(s => s.setting_key === key)?.setting_value || '';
  const setValue = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.setting_key === key ? { ...s, setting_value: value } : s));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const s of settings) {
      await supabase.from('site_settings').update({ setting_value: s.setting_value }).eq('id', s.id);
    }
    toast.success('All settings saved');
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-heading-3 font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Contact info, social links, and SEO</p>
        </div>
        <button onClick={handleSaveAll} disabled={saving} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="space-y-6">
        {settingGroups.map((group) => (
          <div key={group.title} className="bg-card rounded-xl p-5 shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
            <h3 className="font-semibold text-heading mb-4">{group.title}</h3>
            <div className="space-y-3">
              {group.keys.map((key) => (
                <div key={key}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{key.replace(/_/g, ' ')}</label>
                  {group.textarea ? (
                    <textarea
                      value={getValue(key)}
                      onChange={(e) => setValue(key, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
                      dir={key.includes('_ar') ? 'rtl' : 'ltr'}
                    />
                  ) : (
                    <input
                      value={getValue(key)}
                      onChange={(e) => setValue(key, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
