import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import { AxiosError } from 'axios';

interface Category {
  id: number;
  category_name: string;
  category_description: string | null;
  category_image: string | null;
  category_image_url: string | null;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/categories', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
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

  const handleOpenEdit = (category: Category) => {
    resetForm();
    setIsEditMode(true);
    setCurrentId(category.id);
    setName(category.category_name);
    setDescription(category.category_description || '');
    setImagePreview(category.category_image_url);
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
    
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    setSubmitLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('category_name', name);
      
      if (description.trim()) {
        formData.append('category_description', description);
      } else {
        formData.append('category_description', ''); // Send empty if cleared
      }
      
      if (imageFile) {
        formData.append('category_image', imageFile);
      }

      const config = {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data' 
        }
      };


      let res;
      if (isEditMode && currentId) {
        res = await apiClient.post(`/admin/category/update/${currentId}`, formData, config);
      } else {
        res = await apiClient.post('/admin/category', formData, config);
      }

      if (res.data.success) {
        setIsModalOpen(false);
        fetchCategories(); // Refresh table data automatically
      } else {
        setError(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      console.error(axiosError);
      
      if (axiosError.response?.status === 404) {
         setError(`404 Not Found: Check if you saved your api.php routes, or if the route is /categories instead of /category!`);
      } else if (axiosError.response?.status === 422) {
         const validationErrors = axiosError.response.data.errors;
         if (validationErrors) {
            // Flatten Laravel validation errors into a single string
            setError(Object.values(validationErrors).flat().join(', '));
         } else {
            setError('Validation failed. Check your inputs.');
         }
      } else {
         setError(axiosError.response?.data?.message || axiosError.message || 'Failed to save category');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const res = await apiClient.delete(`/admin/category/${id}`);
      if (res.data.success) {
        setCategories(categories.filter(c => c.id !== id));
      } else {
        alert(res.data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete category');
    }
  };

  const filteredCategories = categories.filter(c => 
    c.category_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>
        
        <button 
          onClick={handleOpenAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-600/20"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Category Name</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Description</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
                    Loading categories...
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {category.category_image_url ? (
                          <img src={category.category_image_url} alt={category.category_name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-400" size={20} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {category.category_name}
                    </td>
                    <td className="px-6 py-4 text-slate-500 hidden md:table-cell max-w-[200px] truncate">
                      {category.category_description || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(category)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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
                {isEditMode ? 'Edit Category' : 'Add New Category'}
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Category Name *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                  placeholder="e.g. Customized Wallpaper"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm min-h-[80px]"
                  placeholder="Brief description about this category..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category Image</label>
                
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
                  {isEditMode ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}