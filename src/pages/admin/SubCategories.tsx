import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Loader2, Search } from 'lucide-react';
import { apiClient } from '@/lib/axios';

interface Category {
  id: number;
  category_name: string;
}

interface SubCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
  sub_category_image: string | null;
  sub_category_image_url: string | null;
  sub_category_description: string | null;
  category?: Category; // Eager loaded from Laravel
}

export default function AdminSubCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form State
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch both Categories (for dropdown) and SubCategories (for table)
      const [catRes, subCatRes] = await Promise.all([
        apiClient.get('/admin/categories'),
        apiClient.get('/admin/sub-categories')
      ]);
      setCategories(catRes.data.data);
      setSubCategories(subCatRes.data.data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCategoryId('');
    setName('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsEditMode(false);
    setCurrentId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (subCategory: SubCategory) => {
    resetForm();
    setIsEditMode(true);
    setCurrentId(subCategory.id);
    setCategoryId(subCategory.category_id);
    setName(subCategory.sub_category_name);
    setDescription(subCategory.sub_category_description || '');
    setImagePreview(subCategory.sub_category_image_url);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Please select a parent category.');
      return;
    }
    
    setError('');
    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append('category_id', categoryId.toString());
      formData.append('sub_category_name', name);
      
      if (description.trim()) {
        formData.append('sub_category_description', description);
      } else {
        formData.append('sub_category_description', '');
      }
      
      if (imageFile) {
        formData.append('sub_category_image', imageFile);
      }

      let res;
      // Using native fetch for FormData to prevent any Axios overriding bugs
      const url = isEditMode && currentId 
        ? `https://devlajidigital.com/backend/api/admin/sub-category/update/${currentId}`
        : 'https://devlajidigital.com/backend/api/admin/sub-category';
        
      const token = localStorage.getItem('adminToken');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw { response: { data: responseData } };
      }
      res = { data: responseData };

      if (res.data.success) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0] as string[];
        setError(firstError[0]);
      } else {
        setError(err.response?.data?.message || 'Something went wrong');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sub-category?')) return;
    try {
      await apiClient.delete(`/admin/sub-category/${id}`);
      fetchData();
    } catch (err) {
      console.error('Delete error', err);
      alert('Failed to delete sub-category.');
    }
  };

  const filteredSubCategories = subCategories.filter(sc => 
    sc.sub_category_name.toLowerCase().includes(search.toLowerCase()) ||
    sc.category?.category_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Sub-Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage sub-categories for your products.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Add Sub-Category
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search sub-categories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Sub-Category Name</th>
                <th className="px-6 py-4 font-medium">Parent Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    Loading...
                  </td>
                </tr>
              ) : filteredSubCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No sub-categories found.
                  </td>
                </tr>
              ) : (
                filteredSubCategories.map((subCategory) => (
                  <tr key={subCategory.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {subCategory.sub_category_image_url ? (
                          <img src={subCategory.sub_category_image_url} alt={subCategory.sub_category_name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-400" size={20} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {subCategory.sub_category_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {subCategory.category?.category_name || `ID: ${subCategory.category_id}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(subCategory)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(subCategory.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">
                {isEditMode ? 'Edit Sub-Category' : 'Add Sub-Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Parent Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm bg-white"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sub-Category Name *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                  placeholder="e.g. Living Room Wallpaper"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm min-h-[80px]"
                  placeholder="Brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sub-Category Image</label>
                
                <div className="mt-1 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-slate-400" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Choose Image
                    </button>
                    <p className="text-xs text-slate-500 mt-1">
                      {isEditMode ? "Leave empty to keep current image." : "Recommended size: 800x800px"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitLoading && <Loader2 size={16} className="animate-spin" />}
                  {isEditMode ? 'Update Sub-Category' : 'Save Sub-Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
