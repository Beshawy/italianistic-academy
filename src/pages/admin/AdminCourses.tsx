import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface CourseRow {
  id: string;
  slug: string;
  sort_order: number;
  title_en: string;
  title_ar: string | null;
  title_it: string | null;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  subtitle_it: string | null;
  description_en: string | null;
  description_ar: string | null;
  description_it: string | null;
  duration_en: string | null;
  duration_ar: string | null;
  duration_it: string | null;
  objectives_en: string[] | null;
  objectives_ar: string[] | null;
  objectives_it: string[] | null;
  accent_color: string | null;
}

const AdminCourses = () => {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('sort_order');
    setCourses(data || []);
    setLoading(false);
    if (data && data.length > 0 && !activeCourse) setActiveCourse(data[0].id);
  };

  const handleSave = async (course: CourseRow) => {
    const { error } = await supabase.from('courses').update({
      title_en: course.title_en,
      title_ar: course.title_ar,
      title_it: course.title_it,
      subtitle_en: course.subtitle_en,
      subtitle_ar: course.subtitle_ar,
      subtitle_it: course.subtitle_it,
      description_en: course.description_en,
      description_ar: course.description_ar,
      description_it: course.description_it,
      duration_en: course.duration_en,
      duration_ar: course.duration_ar,
      duration_it: course.duration_it,
      objectives_en: course.objectives_en,
      objectives_ar: course.objectives_ar,
      objectives_it: course.objectives_it,
    }).eq('id', course.id);
    if (error) toast.error('Failed to save');
    else toast.success('Course saved');
  };

  const updateField = (id: string, field: keyof CourseRow, value: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const course = courses.find(c => c.id === activeCourse);

  if (loading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-heading-3 font-bold">Courses</h2>
        <p className="text-sm text-muted-foreground mt-1">Edit course details and translations</p>
      </div>

      {/* Course tabs */}
      <div className="flex gap-2 mb-6">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCourse(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCourse === c.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-muted border border-border'
            }`}
          >
            {c.title_en}
          </button>
        ))}
      </div>

      {course && (
        <div className="bg-card rounded-xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,.05)] space-y-6">
          {/* Titles */}
          <div>
            <h3 className="font-semibold text-heading mb-3">Titles</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(locale => (
                <div key={locale}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">
                    {locale === 'en' ? '🇬🇧 Title' : locale === 'ar' ? '🇪🇬 Title' : '🇮🇹 Title'}
                  </label>
                  <input
                    value={(course as any)[`title_${locale}`] || ''}
                    onChange={(e) => updateField(course.id, `title_${locale}` as keyof CourseRow, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Subtitles */}
          <div>
            <h3 className="font-semibold text-heading mb-3">Subtitles (Level Code)</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(locale => (
                <div key={locale}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{locale}</label>
                  <input
                    value={(course as any)[`subtitle_${locale}`] || ''}
                    onChange={(e) => updateField(course.id, `subtitle_${locale}` as keyof CourseRow, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h3 className="font-semibold text-heading mb-3">Descriptions</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(locale => (
                <div key={locale}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{locale}</label>
                  <textarea
                    value={(course as any)[`description_${locale}`] || ''}
                    onChange={(e) => updateField(course.id, `description_${locale}` as keyof CourseRow, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Durations */}
          <div>
            <h3 className="font-semibold text-heading mb-3">Duration</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(locale => (
                <div key={locale}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{locale}</label>
                  <input
                    value={(course as any)[`duration_${locale}`] || ''}
                    onChange={(e) => updateField(course.id, `duration_${locale}` as keyof CourseRow, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div>
            <h3 className="font-semibold text-heading mb-3">Learning Objectives (one per line)</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {(['en', 'ar', 'it'] as const).map(locale => (
                <div key={locale}>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1 block">{locale}</label>
                  <textarea
                    value={((course as any)[`objectives_${locale}`] || []).join('\n')}
                    onChange={(e) => updateField(course.id, `objectives_${locale}` as keyof CourseRow, e.target.value.split('\n').filter(Boolean))}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm resize-none"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleSave(course)}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Course
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourses;
