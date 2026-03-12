import { Link } from 'react-router-dom';
import { FileText, BookOpen, Image, Settings, BarChart3, Languages } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const cards = [
  { to: '/admin/content', label: 'Content', desc: 'Edit homepage sections and page content', icon: FileText },
  { to: '/admin/translations', label: 'Translations', desc: 'Manage all text translations (EN/AR/IT)', icon: Languages },
  { to: '/admin/courses', label: 'Courses', desc: 'Manage course levels and details', icon: BookOpen },
  { to: '/admin/gallery', label: 'Gallery', desc: 'Upload and manage gallery images', icon: Image },
  { to: '/admin/statistics', label: 'Statistics', desc: 'Edit academy statistics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', desc: 'Contact info, social links, SEO', icon: Settings },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center gap-3">
        <img src="/italianistic1.png" alt="Admin Icon" className="w-10 h-10 object-contain" />
        <div>
          <h2 className="text-heading-3 font-bold">Admin Dashbord</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your website content</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-card rounded-2xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_1px_2px_0_rgba(0,0,0,.04)] hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <card.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-heading mb-1">{card.label}</h3>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
