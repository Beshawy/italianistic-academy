import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface StatRow {
  id: string;
  stat_key: string;
  value_en: string;
  value_ar: string | null;
  value_it: string | null;
  label_en: string;
  label_ar: string | null;
  label_it: string | null;
  icon: string | null;
  sort_order: number;
}

const AdminStatistics = () => {
  const [stats, setStats] = useState<StatRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('statistics').select('*').order('sort_order')
      .then(({ data }) => { setStats(data || []); setLoading(false); });
  }, []);

  const updateField = (id: string, field: string, value: string) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async (stat: StatRow) => {
    const { error } = await supabase.from('statistics').update({
      value_en: stat.value_en, value_ar: stat.value_ar, value_it: stat.value_it,
      label_en: stat.label_en, label_ar: stat.label_ar, label_it: stat.label_it,
      icon: stat.icon,
    }).eq('id', stat.id);
    if (error) toast.error('Failed'); else toast.success('Saved');
  };

  if (loading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-heading-3 font-bold">Statistics</h2>
        <p className="text-sm text-muted-foreground mt-1">Edit academy statistics displayed on the homepage</p>
      </div>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-card rounded-xl p-5 shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
            <div className="flex items-center justify-between mb-4">
              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{stat.stat_key}</code>
              <button onClick={() => handleSave(stat)} className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                <Save className="w-3 h-3" /> Save
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              {(['en', 'ar', 'it'] as const).map(l => (
                <div key={l}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">Value ({l})</label>
                  <input value={(stat as any)[`value_${l}`] || ''} onChange={(e) => updateField(stat.id, `value_${l}`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" dir={l === 'ar' ? 'rtl' : 'ltr'} />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(l => (
                <div key={l}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">Label ({l})</label>
                  <input value={(stat as any)[`label_${l}`] || ''} onChange={(e) => updateField(stat.id, `label_${l}`, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" dir={l === 'ar' ? 'rtl' : 'ltr'} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;
