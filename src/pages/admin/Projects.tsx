import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Search, Image as ImageIcon, MapPin, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Project {
  id: number;
  tytle: string;
  slug: string;
  type: string;
  thumbnail_image: string | null;
  thumbnail_url: string | null;
  gallery_image: string[] | null;
  gallery_urls: string[] | null;
  Challenge: string | null;
  Solution: string | null;
  Description: string | null;
  Location: string | null;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [tytle, setTytle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('Residential');
  const [location, setLocation] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [description, setDescription] = useState('');

  // Media
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const [gallery, setGallery] = useState<{file: File | null, url: string, path: string}[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTytle('');
    setSlug('');
    setType('Residential');
    setLocation('');
    setChallenge('');
    setSolution('');
    setDescription('');
    
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setGallery([]);
    
    setError(null);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
  };

  const openModal = (project?: Project) => {
    resetForm();
    if (project) {
      setEditingProject(project);
      setTytle(project.tytle || '');
      setSlug(project.slug || '');
      setType(project.type || 'Residential');
      setLocation(project.Location || '');
      setChallenge(project.Challenge || '');
      setSolution(project.Solution || '');
      setDescription(project.Description || '');

      setThumbnailPreview(project.thumbnail_url);
      
      const g = [];
      if (project.gallery_image && project.gallery_urls) {
        for (let i = 0; i < project.gallery_image.length; i++) {
          g.push({ file: null, url: project.gallery_urls[i], path: project.gallery_image[i] });
        }
      }
      setGallery(g);
    } else {
      setEditingProject(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        path: ''
      }));
      setGallery([...gallery, ...newFiles]);
    }
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    setGallery(newGallery);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    formData.append('tytle', tytle);
    if (slug) formData.append('slug', slug);
    formData.append('type', type);
    if (location) formData.append('Location', location);
    if (challenge) formData.append('Challenge', challenge);
    if (solution) formData.append('Solution', solution);
    if (description) formData.append('Description', description);

    if (thumbnailFile) {
      formData.append('thumbnail_image', thumbnailFile);
    } else if (editingProject && thumbnailPreview === null) {
      // Deleting thumbnail
      formData.append('thumbnail_image', ''); // PHP checks for empty string to delete
    }

    // Gallery
    gallery.forEach((g, idx) => {
      if (g.file) {
        formData.append(`gallery_image[${idx}]`, g.file);
      } else if (g.path) {
        formData.append(`existing_gallery[${idx}]`, g.path);
      }
    });

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (editingProject) {
        await apiClient.post(`/admin/project/update/${editingProject.id}`, formData, config);
      } else {
        await apiClient.post('/admin/project', formData, config);
      }

      closeModal();
      fetchProjects();
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors?.slug?.[0] || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.delete(`/admin/project/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-ink-950">Projects</h1>
          <p className="text-ink-600 text-sm mt-1">Manage your portfolio of completed projects</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-burgundy-600 hover:bg-burgundy-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shadow-sm"
        >
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy-600"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex-1 bg-white rounded-xl border border-ink-200 p-8 flex items-center justify-center">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-ink-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-ink-900 mb-1">No Projects Found</h3>
            <p className="text-ink-600 mb-6">Create your first project to showcase it in the portfolio.</p>
            <button onClick={() => openModal()} className="btn-primary inline-flex">Add Project</button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl border border-ink-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[4/3] bg-ink-50 relative overflow-hidden group">
                  {project.thumbnail_url ? (
                    <img src={project.thumbnail_url} alt={project.tytle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-ink-400">
                      <ImageIcon size={32} className="mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Thumbnail</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest text-burgundy-600 shadow-sm">
                    {project.type}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-ink-950 mb-1 line-clamp-1">{project.tytle}</h3>
                  <div className="flex items-center gap-1.5 text-ink-500 text-sm mb-4">
                    <MapPin size={14} />
                    <span className="line-clamp-1">{project.Location || 'No location set'}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-ink-100">
                    <div className="flex items-center gap-1.5 text-xs text-ink-500 font-medium">
                      <ImageIcon size={14} />
                      {project.gallery_urls?.length || 0} Photos
                    </div>
                    
                    <div className="flex items-center gap-1 ml-auto">
                      <button
                        onClick={() => openModal(project)}
                        className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#fcfcfc] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-white/20"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-ink-100 px-6 py-4 flex items-center justify-between z-20">
                <div>
                  <h2 className="text-xl font-bold text-ink-950">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                  <p className="text-xs text-ink-500 font-medium mt-1">Fill in the project details below</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full hover:bg-ink-100 flex items-center justify-center text-ink-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <form id="projectForm" onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Info */}
                  <div className="bg-white p-5 rounded-xl border border-ink-200 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-burgundy-200"></span> Basic Info
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Project Title</label>
                        <input
                          type="text"
                          value={tytle}
                          onChange={(e) => setTytle(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all"
                          placeholder="e.g. Modern Office Interiors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Slug URL (Optional)</label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all"
                          placeholder="e.g. modern-office-interiors"
                        />
                        <p className="text-[11px] text-ink-500 mt-1">Leave empty to auto-generate from title</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Project Type</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all"
                        >
                          {['Residential', 'commercial', 'hospital', 'industry', 'retail'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Location</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all"
                          placeholder="e.g. Ahmedabad, Gujarat"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images Section */}
                  <div className="bg-white p-5 rounded-xl border border-ink-200 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-burgundy-200"></span> Media
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Thumbnail */}
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-ink-700 mb-2">Thumbnail Cover</label>
                        <div 
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="aspect-[4/3] rounded-xl border-2 border-dashed border-ink-200 flex flex-col items-center justify-center cursor-pointer hover:bg-ink-50 transition-all relative overflow-hidden group"
                        >
                          {thumbnailPreview ? (
                            <>
                              <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-ink-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-sm font-medium flex items-center gap-1"><Edit2 size={16} /> Change</span>
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setThumbnailFile(null); setThumbnailPreview(null); if (thumbnailInputRef.current) thumbnailInputRef.current.value = ''; }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-md"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <div className="w-10 h-10 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-600 mx-auto mb-2">
                                <Upload size={20} />
                              </div>
                              <span className="text-sm font-medium text-ink-700">Upload Thumbnail</span>
                            </div>
                          )}
                        </div>
                        <input type="file" ref={thumbnailInputRef} onChange={handleThumbnailChange} accept="image/*" className="hidden" />
                      </div>

                      {/* Gallery */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-ink-700">Project Gallery</label>
                          <label className="text-xs font-semibold text-burgundy-600 hover:text-burgundy-700 cursor-pointer flex items-center gap-1">
                            <Plus size={14} /> Add Images
                            <input type="file" onChange={handleAddGalleryImages} accept="image/*" multiple className="hidden" />
                          </label>
                        </div>
                        
                        <div className="bg-ink-50 rounded-xl border border-ink-200 p-4 h-[200px] overflow-y-auto">
                          {gallery.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {gallery.map((g, index) => (
                                <div key={index} className="aspect-square relative rounded-lg overflow-hidden border border-ink-200 group">
                                  <img src={g.url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-ink-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-sm transform translate-y-2 group-hover:translate-y-0"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-ink-400">
                              <ImageIcon size={32} className="mb-2 opacity-50" />
                              <span className="text-sm font-medium">No gallery images added</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="bg-white p-5 rounded-xl border border-ink-200 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-burgundy-200"></span> Details
                    </h3>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Challenge</label>
                        <textarea
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all resize-none"
                          placeholder="What was the core problem or challenge in this project?"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Solution</label>
                        <textarea
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-ink-300 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none transition-all resize-none"
                          placeholder="How did Devlaji Digital solve the challenge?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink-700 mb-1.5">Full Description</label>
                        <div className="rounded-lg overflow-hidden border border-ink-300 focus-within:ring-2 focus-within:ring-burgundy-500 focus-within:border-burgundy-500">
                          <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            className="bg-white min-h-[200px]"
                            modules={{
                              toolbar: [
                                [{'header': [1, 2, 3, false]}],
                                ['bold', 'italic', 'underline'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                ['clean']
                              ]
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-ink-100 px-6 py-4 flex items-center justify-end gap-3 z-20 rounded-b-2xl">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-700 hover:bg-ink-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="projectForm"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold bg-burgundy-600 hover:bg-burgundy-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                >
                  {isSaving ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Saving...</>
                  ) : (
                    <><CheckCircle size={18} /> Save Project</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
