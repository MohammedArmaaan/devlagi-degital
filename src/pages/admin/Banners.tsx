import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom'; // 🔥 FIX 1: Added createPortal
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import { AxiosError } from 'axios';

interface Banner {
  id: number;
  page_type: string;
  tytle: string[] | null;
  tytle_name: string[] | null;
  description: string[] | null;
  link: string[] | null;
  image: string[] | null;
  image_urls: string[];
}

const pageTypes = [
  'home', 'service', 'product', 'collection', 'project', 'Brochures', 'About', 'contact'
];

export default function Banners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form State
  const [pageType, setPageType] = useState('home');
  const [slides, setSlides] = useState<any[]>([
    { title: '', titleName: '', description: '', link: '', imageFile: null, imageUrl: '', imagePath: '' }
  ]);
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = () => {
    setLoading(true);
    apiClient.get('/admin/banners').then(res => {
      if (res.data.success) {
        setBanners(res.data.data);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  const handleAddSlide = () => {
    setSlides([...slides, { title: '', titleName: '', description: '', link: '', imageFile: null, imageUrl: '', imagePath: '' }]);
  };

  const handleRemoveSlide = (index: number) => {
    if (slides.length > 1) {
      setSlides(slides.filter((_, i) => i !== index));
    }
  };

  const handleSlideChange = (index: number, field: string, value: any) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };

  const openModal = (banner?: Banner) => {
    setError(null);
    if (banner) {
      setEditingBanner(banner);
      setPageType(banner.page_type);
      
      const count = Math.max(
        banner.tytle?.length || 0,
        banner.tytle_name?.length || 0,
        banner.description?.length || 0,
        banner.link?.length || 0,
        banner.image_urls?.length || 1,
        banner.image?.length || 0
      );
      
      const newSlides = [];
      for (let i = 0; i < count; i++) {
        newSlides.push({
          title: banner.tytle?.[i] || '',
          titleName: banner.tytle_name?.[i] || '',
          description: banner.description?.[i] || '',
          link: banner.link?.[i] || '',
          imageFile: null,
          imageUrl: banner.image_urls?.[i] || '',
          imagePath: banner.image?.[i] || '' 
        });
      }
      if (newSlides.length === 0) {
          newSlides.push({ title: '', titleName: '', description: '', link: '', imageFile: null, imageUrl: '', imagePath: '' });
      }
      setSlides(newSlides);
    } else {
      setEditingBanner(null);
      setPageType('home');
      setSlides([{ title: '', titleName: '', description: '', link: '', imageFile: null, imageUrl: '', imagePath: '' }]);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    formData.append('page_type', pageType);

    slides.forEach((slide, index) => {
      formData.append(`tytle[${index}]`, slide.title || '');
      formData.append(`tytle_name[${index}]`, slide.titleName || '');
      formData.append(`description[${index}]`, slide.description || '');
      formData.append(`link[${index}]`, slide.link || '');
      
      if (slide.imageFile) {
        formData.append(`image[${index}]`, slide.imageFile);
      } else if (slide.imagePath) { 
        let safePath = slide.imagePath;
        if (safePath.includes('banners/')) {
            safePath = 'banners/' + safePath.split('banners/')[1];
        }
        formData.append(`existing_images[${index}]`, safePath); 
      }
    });

    try {
      const config = {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data' 
        }
      };

      if (editingBanner) {
        const res = await apiClient.post(`/admin/banner/update/${editingBanner.id}`, formData, config);
        if (res.data.success) {
          setIsModalOpen(false);
          fetchBanners();
        }
      } else {
        const res = await apiClient.post('/admin/banner', formData, config);
        if (res.data.success) {
          setIsModalOpen(false);
          fetchBanners();
        }
      }
    } catch (err: any) {
      const axiosError = err as AxiosError<any>;
      console.error(axiosError);
      if (axiosError.response?.status === 404) {
         setError(`404 Not Found: Check if you saved your api.php routes!`);
      } else if (axiosError.response?.status === 422) {
         const validationErrors = axiosError.response.data.errors;
         if (validationErrors) {
            setError(Object.values(validationErrors).flat().join(', '));
         } else {
            setError('Validation failed. Check your inputs.');
         }
      } else {
         setError(axiosError.response?.data?.message || axiosError.message || 'Something went wrong');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this banner configuration?')) {
      try {
        await apiClient.delete(`/admin/banner/${id}`);
        fetchBanners();
      } catch (err) {
        alert('Failed to delete banner');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Configurations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage banners across different pages of the website.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto font-medium"
        >
          <Plus size={18} />
          Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {banners.map(banner => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-gray-100 relative group overflow-hidden">
                {banner.image_urls && banner.image_urls.length > 0 ? (
                  <img src={banner.image_urls[0]} alt="Banner" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm uppercase tracking-wide">
                  {banner.page_type}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => openModal(banner)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 hover:scale-110 transition-transform shadow-lg">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(banner.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 hover:scale-110 transition-transform shadow-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Layers size={16} />
                  <span>{banner.image_urls?.length || 0} Slides</span>
                </div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {banner.tytle?.[0] || 'No Title'}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {banner.description?.[0] || 'No Description'}
                </p>
              </div>
            </motion.div>
          ))}
          {banners.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-gray-100 border-dashed">
              <p className="text-gray-500">No banners configured yet.</p>
            </div>
          )}
        </div>
      )}

      {/* 🔥 FIX 2: PORTAL MODAL - This breaks the modal out of the sidebar container permanently */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
              
              {/* Full Screen Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate pr-4">
                    {editingBanner ? 'Edit Banner Configuration' : 'Add New Banner'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-start sm:items-center gap-3 border border-red-100 text-sm">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5 sm:mt-0" />
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {editingBanner && (
                    <div className="mb-6 p-4 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200">
                      <strong>Note:</strong> Update images carefully. Existing images will be kept unless you upload a new one for that slide.
                    </div>
                  )}

                  <form id="bannerForm" onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Page Type Selector */}
                    <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Page Type (Location)</label>
                      <select
                        value={pageType}
                        onChange={(e) => setPageType(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow bg-gray-50"
                      >
                        {pageTypes.map(type => (
                          <option key={type} value={type}>{type.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    {/* Slides */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 px-2">Slides Configuration</h3>
                        <button 
                          type="button" 
                          onClick={handleAddSlide}
                          className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 flex items-center gap-1.5 transition-colors"
                        >
                          <Plus size={16} /> <span>Add Slide</span>
                        </button>
                      </div>

                      {slides.map((slide, index) => (
                        <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 relative group">
                          <div className="absolute top-4 right-4 flex gap-2 z-10">
                            {slides.length > 1 && (
                              <button 
                                type="button" 
                                onClick={() => handleRemoveSlide(index)} 
                                className="bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-md transition-colors"
                                title="Remove Slide"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-5 border-b border-gray-100 pb-3">
                            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <h4 className="font-bold text-gray-800">Slide Info</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                            
                            {/* Left Column - Text Inputs */}
                            <div className="space-y-4 sm:space-y-5">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                <input
                                  type="text"
                                  value={slide.title}
                                  onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                  placeholder="E.g. Summer Collection"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title Name / Subtitle</label>
                                <input
                                  type="text"
                                  value={slide.titleName}
                                  onChange={(e) => handleSlideChange(index, 'titleName', e.target.value)}
                                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                  placeholder="E.g. Up to 50% Off"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                <textarea
                                  value={slide.description}
                                  onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors min-h-[100px] resize-y"
                                  placeholder="Short description..."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Link</label>
                                <input
                                  type="text"
                                  value={slide.link}
                                  onChange={(e) => handleSlideChange(index, 'link', e.target.value)}
                                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                  placeholder="E.g. /products?cat_id=1"
                                />
                              </div>
                            </div>
                            
                            {/* Right Column - Image Upload */}
                            <div className="flex flex-col h-full">
                              <label className="block text-sm font-medium text-gray-700 mb-1.5">Banner Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={el => fileInputRefs.current[index] = el}
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleSlideChange(index, 'imageFile', e.target.files[0]);
                                    handleSlideChange(index, 'imageUrl', URL.createObjectURL(e.target.files[0]));
                                  }
                                }}
                              />
                              <div 
                                onClick={() => fileInputRefs.current[index]?.click()}
                                className="w-full h-full min-h-[220px] sm:min-h-[280px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-all relative overflow-hidden group/upload"
                              >
                                {slide.imageUrl ? (
                                  <>
                                    <img src={slide.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                                      <span className="text-white font-medium text-sm flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full"><Upload size={16}/> Change Image</span>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-center p-6 transform group-hover/upload:scale-105 transition-transform">
                                    <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                                    <p className="text-xs text-gray-500 mt-2">JPEG, PNG, WEBP</p>
                                    <p className="text-xs text-gray-400 mt-1">Recommended: 1920x1080px</p>
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>

                {/* Modal Footer - Actions */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="bannerForm"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSaving ? (
                      <><RefreshCw size={18} className="animate-spin" /> Saving...</>
                    ) : (
                      <><CheckCircle size={18} /> Save Banner</>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}