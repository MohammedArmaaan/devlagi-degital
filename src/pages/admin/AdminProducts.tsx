import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import { AxiosError } from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Category {
  id: number;
  category_name: string;
}

interface SubCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
}

interface Product {
  id: number;
  cat_id: number;
  sub_cat_id: number | null;
  product_name: string;
  description: string | null;
  sell_price: number | null;
  mrp: number | null;
  is_new: number | boolean;
  thumbnail_image: string | null;
  thumbnail_image_url: string | null;
  gallery_image: string[] | null;
  gallery_image_urls: string[] | null;
  category?: { id: number, category_name: string };
  sub_category?: { id: number, sub_category_name: string };
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form state
  const [catId, setCatId] = useState('');
  const [subCatId, setSubCatId] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [isNew, setIsNew] = useState(true);
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, subCatRes] = await Promise.all([
        apiClient.get('/admin/products', { headers: { 'Accept': 'application/json' } }),
        apiClient.get('/admin/categories', { headers: { 'Accept': 'application/json' } }),
        apiClient.get('/admin/sub-categories', { headers: { 'Accept': 'application/json' } })
      ]);
      
      if (prodRes.data.success) setProducts(prodRes.data.data);
      if (catRes.data.success) setCategories(catRes.data.data);
      if (subCatRes.data.success) setSubCategories(subCatRes.data.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setIsEditMode(false);
    setCurrentId(null);
    setCatId('');
    setSubCatId('');
    setProductName('');
    setDescription('');
    setSellPrice('');
    setMrp('');
    setIsNew(true);
    
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    
    setError('');
    
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    resetForm();
    setIsEditMode(true);
    setCurrentId(product.id);
    
    setCatId(product.cat_id.toString());
    setSubCatId(product.sub_cat_id ? product.sub_cat_id.toString() : '');
    setProductName(product.product_name);
    setDescription(product.description || '');
    setSellPrice(product.sell_price ? product.sell_price.toString() : '');
    setMrp(product.mrp ? product.mrp.toString() : '');
    setIsNew(!!product.is_new);
    
    setThumbnailPreview(product.thumbnail_image_url || null);
    setGalleryPreviews(product.gallery_image_urls || []);
    
    setIsModalOpen(true);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles(filesArray);
      
      const previews = filesArray.map(file => URL.createObjectURL(file));
      setGalleryPreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catId || !productName.trim()) {
      setError('Category and Product Name are required.');
      return;
    }

    try {
      setSubmitLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('cat_id', catId);
      if (subCatId) formData.append('sub_cat_id', subCatId);
      formData.append('product_name', productName);
      if (description) formData.append('description', description);
      if (sellPrice) formData.append('sell_price', sellPrice);
      if (mrp) formData.append('mrp', mrp);
      formData.append('is_new', isNew ? '1' : '0');
      
      if (thumbnailFile) {
        formData.append('thumbnail_image', thumbnailFile);
      }
      
      if (galleryFiles.length > 0) {
        galleryFiles.forEach(file => {
          formData.append('gallery_image[]', file);
        });
      }

      const config = {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data' 
        }
      };

      let res;
      if (isEditMode && currentId) {
        res = await apiClient.post(`/admin/product/update/${currentId}`, formData, config);
      } else {
        res = await apiClient.post('/admin/product', formData, config);
      }

      if (res.data.success) {
        setIsModalOpen(false);
        fetchData();
      } else {
        setError(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      const validationErrors = axiosError.response?.data?.errors;
      if (validationErrors) {
        setError(Object.values(validationErrors).flat().join(', '));
      } else {
        setError(axiosError.response?.data?.message || axiosError.message || 'Failed to save product');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await apiClient.delete(`/admin/product/${id}`);
      if (res.data.success) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  const filteredProducts = products.filter(p => 
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category?.category_name || '').toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredSubCategories = subCategories.filter(sc => sc.category_id.toString() === catId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-ink-100">
        <div>
          <h1 className="text-2xl font-serif text-ink-950 font-bold">Products</h1>
          <p className="text-ink-600 text-sm mt-1">Manage your catalog items.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-burgundy-600 text-white px-5 py-2.5 rounded-xl hover:bg-burgundy-700 transition-colors text-sm font-medium whitespace-nowrap shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-ink-100 overflow-hidden flex flex-col min-h-[60vh]">
        {/* Toolbar */}
        <div className="p-4 border-b border-ink-100 flex flex-col sm:flex-row justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all text-sm bg-white"
            />
          </div>
          <div className="text-sm text-ink-500 flex items-center font-medium px-2">
            Total: {filteredProducts.length}
          </div>
        </div>

        {/* Table/List */}
        <div className="overflow-x-auto flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-ink-400">
              <Loader2 className="w-8 h-8 animate-spin text-burgundy-600" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-ink-500">
              <div className="w-16 h-16 bg-ink-50 rounded-full flex items-center justify-center mb-3">
                <Search className="w-8 h-8 text-ink-300" />
              </div>
              <p className="font-medium text-ink-900">No products found</p>
              <p className="text-sm mt-1">Try adjusting your search</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white border-b border-ink-100">
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider w-16">Image</th>
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider">Product Name</th>
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider">Price (MRP/Sell)</th>
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-ink-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-50">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-ink-50/50 transition-colors group">
                    <td className="py-3 px-6">
                      <div className="w-12 h-12 rounded-lg bg-ink-50 border border-ink-100 overflow-hidden flex items-center justify-center">
                        {product.thumbnail_image_url ? (
                          <img src={product.thumbnail_image_url} alt={product.product_name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-ink-300" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="font-medium text-ink-900 line-clamp-2">{product.product_name}</div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="text-sm text-ink-600">
                        {product.category?.category_name || 'N/A'}
                        {product.sub_category?.sub_category_name && <span className="text-ink-400 text-xs block">&raquo; {product.sub_category.sub_category_name}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="text-sm">
                         <span className="font-semibold text-ink-900">?{product.sell_price || '0'}</span>
                         {product.mrp && <span className="text-ink-400 line-through text-xs ml-2">?{product.mrp}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      {product.is_new ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-2 text-ink-400 hover:text-burgundy-600 hover:bg-burgundy-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 relative flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-ink-100 bg-gray-50/50 rounded-t-2xl shrink-0">
              <h3 className="font-serif text-xl font-bold text-ink-950">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 text-ink-400 hover:text-ink-600 hover:bg-white rounded-full transition-colors shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-2">
                  <span className="font-semibold shrink-0">Error:</span>
                  <p>{error}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">Category *</label>
                  <select
                    value={catId}
                    onChange={(e) => { setCatId(e.target.value); setSubCatId(''); }}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.category_name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">Sub Category</label>
                  <select
                    value={subCatId}
                    onChange={(e) => setSubCatId(e.target.value)}
                    disabled={!catId}
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">None / Select Sub Category</option>
                    {filteredSubCategories.map(sc => (
                      <option key={sc.id} value={sc.id}>{sc.sub_category_name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">Selling Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all"
                    placeholder="e.g. 1999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">MRP (Regular Price)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-ink-200 focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-100 outline-none transition-all"
                    placeholder="e.g. 2999"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border border-ink-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                      className="w-5 h-5 text-burgundy-600 rounded border-gray-300 focus:ring-burgundy-500"
                    />
                    <div>
                      <div className="font-medium text-ink-900">Mark as New Arrival</div>
                      <div className="text-sm text-ink-500">Product will show a "New" badge and appear in latest sections</div>
                    </div>
                  </label>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-2">Description</label>
                  <div className="bg-white rounded-xl overflow-hidden border border-ink-200 focus-within:border-burgundy-500 focus-within:ring-2 focus-within:ring-burgundy-100 transition-all">
                    <ReactQuill 
                      theme="snow" 
                      value={description} 
                      onChange={setDescription} 
                      className="min-h-[250px]"
                      placeholder="Describe the product..."
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
                  <style>{`
                    .ql-editor { min-height: 200px; font-family: inherit; }
                    .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #e7e5e4; background: #fcfafb; padding: 12px; }
                    .ql-container.ql-snow { border: none; }
                  `}</style>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">Thumbnail Image {isEditMode ? '' : '*'}</label>
                  <div 
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="border-2 border-dashed border-ink-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-burgundy-300 transition-all text-center h-48 relative overflow-hidden group"
                  >
                    {thumbnailPreview ? (
                      <>
                        <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                          <p className="text-white text-sm font-medium flex items-center gap-2"><Edit2 size={16} /> Change Image</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-burgundy-50 rounded-full flex items-center justify-center mb-3 text-burgundy-600">
                          <ImageIcon size={24} />
                        </div>
                        <p className="text-sm font-medium text-ink-700">Click to upload thumbnail</p>
                        <p className="text-xs text-ink-400 mt-1">JPEG, PNG, WEBP up to 2MB</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                
                {/* Gallery Upload */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-2">Gallery Images (Replaces all on edit)</label>
                  <div 
                    onClick={() => galleryInputRef.current?.click()}
                    className="border-2 border-dashed border-ink-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-burgundy-300 transition-all text-center h-48 relative overflow-hidden group"
                  >
                    {galleryPreviews.length > 0 ? (
                      <div className="w-full h-full p-2 grid grid-cols-3 gap-2 overflow-y-auto">
                        {galleryPreviews.map((src, i) => (
                           <img key={i} src={src} className="w-full h-full object-cover rounded shadow-sm border border-gray-200" alt="Gallery" />
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-burgundy-50 rounded-full flex items-center justify-center mb-3 text-burgundy-600">
                          <Plus size={24} />
                        </div>
                        <p className="text-sm font-medium text-ink-700">Click to add gallery images</p>
                        <p className="text-xs text-ink-400 mt-1">Select multiple files</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={handleGalleryChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </div>

              </div>
              
              <div className="pt-6 border-t border-ink-100 flex gap-3 justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-medium text-ink-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-8 py-2.5 rounded-xl font-medium text-white bg-burgundy-600 hover:bg-burgundy-700 transition-colors flex items-center gap-2 disabled:opacity-70 shadow-sm"
                >
                  {submitLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    isEditMode ? 'Save Changes' : 'Add Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




