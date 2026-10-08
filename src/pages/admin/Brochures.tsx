import { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Edit, FileText, Download, X, Upload } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  navigate: (path: string) => void;
};

type Brochure = {
  id: number;
  tytle: string;
  type: string;
  description: string | null;
  pdf: string;
  pdf_url: string;
  slug: string;
  created_at: string;
};

export default function AdminBrochures({ navigate }: Props) {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Form State
  const [form, setForm] = useState({
    tytle: '',
    type: 'Residential',
    description: '',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBrochures = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (typeFilter) params.append('type', typeFilter);
      
      const res = await apiClient.get(`/admin/brochures?${params.toString()}`);
      if (res.data.success) {
        setBrochures(res.data.data);
        setError(null);
      }
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to fetch brochures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrochures();
  }, [typeFilter]); // Search will be triggered manually or on enter

  const openAddModal = () => {
    setEditingId(null);
    setForm({ tytle: '', type: 'Residential', description: '' });
    setPdfFile(null);
    setThumbnailFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (b: Brochure) => {
    setEditingId(b.id);
    setForm({
      tytle: b.tytle,
      type: b.type,
      description: b.description || '',
    });
    setPdfFile(null);
    setThumbnailFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this brochure?')) return;
    try {
      const res = await apiClient.delete(`/admin/brochure/${id}`);
      if (res.data.success) {
        setBrochures(prev => prev.filter(b => b.id !== id));
      }
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to delete brochure');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !pdfFile) {
      alert('Please upload a PDF file.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('tytle', form.tytle);
      formData.append('type', form.type);
      if (form.description) formData.append('description', form.description);
      if (pdfFile) formData.append('pdf', pdfFile);
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      let res;
      if (editingId) {
        res = await apiClient.post(`/admin/brochure/update/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await apiClient.post('/admin/brochure', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (res.data.success) {
        fetchBrochures(); // refresh list
        setIsModalOpen(false);
      }
    } catch (e: any) {
      alert(e.response?.data?.message || 'Failed to save brochure');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-ink-950">Brochures</h1>
          <p className="text-ink-600 text-sm mt-1">Manage downloadable PDF brochures</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Brochure
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-ink-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
          <input 
            type="text"
            placeholder="Search brochures by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchBrochures()}
            className="w-full pl-10 pr-4 py-2 bg-ink-50 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-auto bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 text-sm text-ink-700 outline-none focus:ring-2 focus:ring-burgundy-500"
          >
            <option value="">All Categories</option>
            <option value="Residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="hospitality">Hospitality</option>
            <option value="industry">Industry</option>
            <option value="retail">Retail</option>
          </select>
          <button 
            onClick={fetchBrochures} 
            className="btn-outline !py-2 !px-4 text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 bg-white rounded-xl border border-ink-200 shadow-sm overflow-hidden flex flex-col">
        {loading ? (
          <div className="p-8 text-center text-ink-500 text-sm">Loading brochures...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 text-sm">{error}</div>
        ) : brochures.length === 0 ? (
          <div className="p-12 text-center text-ink-400">
            <FileText size={48} className="mx-auto mb-4 opacity-20" />
            <p>No brochures found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink-50 border-b border-ink-200 text-xs uppercase tracking-wider text-ink-500 font-semibold">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">PDF</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 text-sm">
                {brochures.map(b => (
                  <tr key={b.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-ink-900">{b.tytle}</td>
                    <td className="py-3 px-4">
                      <span className="bg-ink-100 text-ink-700 px-2 py-1 rounded text-xs capitalize">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={b.pdf_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-burgundy-600 hover:text-burgundy-700 font-medium"
                      >
                        <Download size={16} /> View PDF
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(b)}
                          className="p-1.5 text-ink-500 hover:bg-ink-100 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 text-ink-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
            <div className="p-4 md:p-6 border-b border-ink-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-ink-950">
                {editingId ? 'Edit Brochure' : 'Add New Brochure'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-ink-400 hover:bg-ink-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1">Title (Tytle)</label>
                <input 
                  type="text" 
                  required
                  value={form.tytle}
                  onChange={(e) => setForm({...form, tytle: e.target.value})}
                  className="w-full px-4 py-2 bg-ink-50 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                  placeholder="e.g. Summer Collection 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1">Category (Type)</label>
                <select 
                  required
                  value={form.type}
                  onChange={(e) => setForm({...form, type: e.target.value})}
                  className="w-full px-4 py-2 bg-ink-50 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
                >
                  <option value="Residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="industry">Industry</option>
                  <option value="retail">Retail</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-ink-900 mb-2">Description (Rich Text)</label>
                <div className="bg-white rounded-xl overflow-hidden border border-ink-200 focus-within:border-burgundy-500 focus-within:ring-2 focus-within:ring-burgundy-100 transition-all">
                  <ReactQuill 
                    theme="snow" 
                    value={form.description} 
                    onChange={(val) => setForm({...form, description: val})}
                    className="h-48 md:h-64 mb-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1">
                  Thumbnail Image {editingId && <span className="text-ink-400 font-normal">(Leave empty to keep existing)</span>}
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label 
                    htmlFor="thumbnail-upload"
                    className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-ink-50 border-2 border-ink-200 border-dashed rounded-xl hover:bg-ink-100 hover:border-burgundy-400 cursor-pointer"
                  >
                    <Upload size={24} className="text-ink-400 mb-2" />
                    <span className="text-sm text-ink-600 text-center px-2 truncate w-full">
                      {thumbnailFile ? thumbnailFile.name : 'Click to select Thumbnail Image'}
                    </span>
                    <span className="text-xs text-ink-400 mt-1">Max 5MB (JPG, PNG, WEBP)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-900 mb-1">
                  PDF File {editingId && <span className="text-ink-400 font-normal">(Leave empty to keep existing)</span>}
                </label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label 
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-ink-50 border-2 border-ink-200 border-dashed rounded-xl hover:bg-ink-100 hover:border-burgundy-400 cursor-pointer"
                  >
                    <Upload size={24} className="text-ink-400 mb-2" />
                    <span className="text-sm text-ink-600">
                      {pdfFile ? pdfFile.name : 'Click to select PDF file'}
                    </span>
                    <span className="text-xs text-ink-400 mt-1">Max 10MB</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Brochure' : 'Upload Brochure'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
