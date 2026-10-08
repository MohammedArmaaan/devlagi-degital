import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, Loader2, PlusCircle, MinusCircle } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ServiceInfo {
  id: number;
  tytle: string | null;
  slogan: string | null;
  description: string | null;
  key_benefits: string[];
  image: string | null;
  image_url: string | null;
  slug: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form state
  const [tytle, setTytle] = useState('');
  const [slogan, setSlogan] = useState('');
  const [description, setDescription] = useState('');
  const [keyBenefits, setKeyBenefits] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      // UPDATED: Added /admin prefix
      const res = await apiClient.get('/admin/services', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.data.success) {
        setServices(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setTytle('');
    setSlogan('');
    setDescription('');
    setKeyBenefits([]);
    setImageFile(null);
    setImagePreview(null);
    setError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceInfo) => {
    setIsEditMode(true);
    setCurrentId(service.id);
    setTytle(service.tytle || '');
    setSlogan(service.slogan || '');
    setDescription(service.description || '');
    setKeyBenefits(service.key_benefits || []);
    setImageFile(null);
    setImagePreview(service.image_url);
    setError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      // UPDATED: Added /admin prefix
      const res = await apiClient.delete(`/admin/service/${id}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.data.success) {
        fetchServices();
      }
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    const formData = new FormData();
    if (tytle) formData.append('tytle', tytle);
    if (slogan) formData.append('slogan', slogan);
    if (description) formData.append('description', description);
    
    // Append key_benefits array correctly
    keyBenefits.forEach((benefit, index) => {
        if (benefit.trim() !== '') {
            formData.append(`key_benefits[${index}]`, benefit.trim());
        }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      let res;
      if (isEditMode && currentId) {
        // UPDATED: Added /admin prefix
        res = await apiClient.post(`/admin/service/update/${currentId}`, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        });
      } else {
        // UPDATED: Added /admin prefix
        res = await apiClient.post('/admin/service', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        });
      }

      if (res.data.success) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        setError(res.data.message || "An error occurred.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors || "Something went wrong!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredServices = services.filter(s => 
    (s.tytle || '').toLowerCase().includes(search.toLowerCase()) || 
    (s.slug || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto pb-20 lg:pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Services</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your website services</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading services...
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No services found.
                  </td>
                </tr>
              ) : (
                filteredServices.map(service => (
                  <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                        {service.image_url ? (
                          <img src={service.image_url} alt={service.tytle || ''} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-400" size={20} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-900">{service.tytle || '-'}</td>
                    <td className="px-6 py-3 text-slate-500">{service.slug}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(service)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">
                {isEditMode ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
              )}

              <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={tytle}
                    onChange={e => setTytle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="e.g. Decorative Glass Film"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slogan</label>
                  <input 
                    type="text" 
                    value={slogan}
                    onChange={e => setSlogan(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    placeholder="e.g. Enhance privacy and style"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <ReactQuill 
                      theme="snow" 
                      value={description} 
                      onChange={setDescription} 
                      className="min-h-[250px]"
                      placeholder="Describe the service..."
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'align': [] }],
                          [{ 'color': [] }, { 'background': [] }],
                          ['link', 'image'],
                          ['clean']
                        ]
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">Key Benefits</label>
                    <button type="button" onClick={() => setKeyBenefits([...keyBenefits, ''])} className="text-xs text-indigo-600 flex items-center font-semibold hover:text-indigo-800">
                      <PlusCircle size={14} className="mr-1" /> Add Benefit
                    </button>
                  </div>
                  <div className="space-y-2">
                    {keyBenefits.map((b, i) => (
                      <div key={i} className="flex gap-2">
                        <input 
                          type="text" 
                          value={b}
                          onChange={e => {
                            const newB = [...keyBenefits];
                            newB[i] = e.target.value;
                            setKeyBenefits(newB);
                          }}
                          className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="e.g. 99% UV Protection"
                        />
                        <button type="button" onClick={() => setKeyBenefits(keyBenefits.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 p-2">
                          <MinusCircle size={18} />
                        </button>
                      </div>
                    ))}
                    {keyBenefits.length === 0 && (
                      <div className="text-sm text-slate-400 italic">No key benefits added.</div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Image</label>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 shrink-0 rounded-lg border-2 border-dashed border-slate-300 overflow-hidden bg-slate-50 flex items-center justify-center">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-slate-300" size={24} />
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
                      <div className="flex gap-3">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                          Choose Image
                        </button>
                        {(imageFile || imagePreview) && (
                          <button 
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="px-4 py-2 bg-white border border-slate-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Recommended: 800x600px (JPG, PNG, WEBP)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={submitLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitLoading}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {submitLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isEditMode ? 'Update Service' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}