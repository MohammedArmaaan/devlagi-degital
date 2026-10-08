import React, { useState, useEffect } from 'react';
import { Phone, Plus, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { apiClient } from '@/lib/axios';

type Whatsapp = {
  id: number;
  name: string | null;
  no: string;
  is_active: boolean;
};

type Props = {
  navigate: (path: string) => void;
};

export default function AdminWhatsapp({ navigate }: Props) {
  const [numbers, setNumbers] = useState<Whatsapp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', no: '', is_active: false });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/admin/whatsapp');
      if (res.data.success) {
        setNumbers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: '', no: '', is_active: false });
    setError('');
    setShowModal(true);
  };

  const openEditModal = (w: Whatsapp) => {
    setEditId(w.id);
    setFormData({ name: w.name || '', no: w.no, is_active: Boolean(w.is_active) });
    setError('');
    setShowModal(true);
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (editId) {
        await apiClient.post('/admin/whatsapp/update/' + editId, formData);
      } else {
        await apiClient.post('/admin/whatsapp', formData);
      }
      setShowModal(false);
      fetchNumbers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error saving number');
    } finally {
      setFormLoading(false);
    }
  };

    const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this number?')) return;
    try {
      await apiClient.delete('/admin/whatsapp/' + id);
      fetchNumbers();
    } catch (err) {
      console.error(err);
      alert('Error deleting number');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-ink-950">WhatsApp Numbers</h1>
          <p className="text-ink-600 text-sm mt-1">Manage contact numbers for inquiries</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm">
          <Plus size={18} />
          Add Number
        </button>
      </div>

      <div className="bg-white rounded-xl border border-ink-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink-50 border-b border-ink-200 text-ink-600 font-medium">
            <tr>
              <th className="py-3 px-4">Name / Label</th>
              <th className="py-3 px-4">WhatsApp Number</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {loading ? (
              <tr><td colSpan={4} className="py-8 text-center text-ink-500">Loading...</td></tr>
            ) : numbers.length === 0 ? (
              <tr><td colSpan={4} className="py-8 text-center text-ink-500">No numbers configured yet.</td></tr>
            ) : (
              numbers.map((w) => (
                <tr key={w.id} className="hover:bg-ink-50/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-ink-950">{w.name || '-'}</td>
                  <td className="py-3 px-4 text-ink-700 font-mono">{w.no}</td>
                  <td className="py-3 px-4">
                    {w.is_active ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 size={14} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-ink-100 text-ink-600">
                        <XCircle size={14} /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(w)} className="p-1.5 text-ink-500 hover:text-burgundy-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(w.id)} className="p-1.5 text-ink-500 hover:text-red-600 transition-colors">
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-5 border-b border-ink-100">
              <h3 className="font-serif text-xl text-ink-950">{editId ? 'Edit Number' : 'Add Number'}</h3>
              <button onClick={() => setShowModal(false)} className="text-ink-400 hover:text-ink-600">
                <XCircle size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
              
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Label / Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-ink-200 focus:ring-2 focus:ring-burgundy-500 outline-none"
                  placeholder="e.g. Sales Department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">WhatsApp Number *</label>
                <input 
                  type="text" 
                  required
                  value={formData.no} 
                  onChange={(e) => setFormData({...formData, no: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-lg border border-ink-200 focus:ring-2 focus:ring-burgundy-500 outline-none"
                  placeholder="e.g. +91 9876543210"
                />
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-burgundy-600 focus:ring-burgundy-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-sm text-ink-700">
                  Set as Active Number (deactivates others)
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-ink-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-ink-600 hover:bg-ink-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="btn-primary !py-2 !px-6"
                >
                  {formLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



