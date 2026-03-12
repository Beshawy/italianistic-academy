import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/AdminLayout';
import { Upload, Trash2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
    setImages(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(fileName);

      await supabase.from('gallery_images').insert({
        image_url: urlData.publicUrl,
        alt_text: file.name.replace(/\.[^/.]+$/, ''),
        sort_order: images.length,
      });
    }

    toast.success('Images uploaded');
    fetchImages();
    setUploading(false);
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm('Delete this image?')) return;
    // Extract file path from URL
    const urlParts = img.image_url.split('/gallery/');
    if (urlParts[1]) {
      await supabase.storage.from('gallery').remove([urlParts[1]]);
    }
    await supabase.from('gallery_images').delete().eq('id', img.id);
    toast.success('Deleted');
    fetchImages();
  };

  const handleAltUpdate = async (id: string, alt: string) => {
    await supabase.from('gallery_images').update({ alt_text: alt }).eq('id', id);
  };

  if (loading) return <AdminLayout><div className="text-muted-foreground">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-heading-3 font-bold">Gallery</h2>
          <p className="text-sm text-muted-foreground mt-1">Upload and manage gallery images</p>
        </div>
        <label className={`bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-card rounded-xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,.05)]">
            <div className="aspect-[4/3] bg-muted">
              <img src={img.image_url} alt={img.alt_text || ''} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 space-y-2">
              <input
                value={img.alt_text || ''}
                onChange={(e) => setImages(prev => prev.map(i => i.id === img.id ? { ...i, alt_text: e.target.value } : i))}
                onBlur={(e) => handleAltUpdate(img.id, e.target.value)}
                placeholder="Alt text..."
                className="w-full px-2 py-1.5 rounded border border-input bg-background text-xs"
              />
              <button
                onClick={() => handleDelete(img)}
                className="text-destructive/60 hover:text-destructive text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No gallery images yet. Upload some above.</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
