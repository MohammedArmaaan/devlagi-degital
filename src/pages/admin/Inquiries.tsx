import { useState, useEffect } from 'react';
import { Search, Calendar, Trash2, CheckCircle, Clock, X, MessageSquare } from 'lucide-react';
import { apiClient } from '@/lib/axios';

type Props = {
  navigate: (path: string) => void;
};

type Inquiry = {
  id: number;
  name: string;
  number: string;
  email: string | null;
  subject: string | null;
  description: string | null;
  status: 'pending' | 'completed';
  created_at: string;
};

export default function AdminInquiries({ navigate }: Props) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      if (statusFilter) params.append('status', statusFilter);
      
      const res = await apiClient.get(`/admin/inqueries?${params.toString()}`);
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (e) {
      console.error('Failed to fetch inquiries', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [startDate, endDate, statusFilter]);

  const updateStatus = async (id: number, status: 'pending' | 'completed') => {
    try {
      const res = await apiClient.post(`/admin/inquery/${id}/status`, { status });
      if (res.data.success) {
        setInquiries(prev => prev.map(inv => inv.id === id ? { ...inv, status } : inv));
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await apiClient.delete(`/admin/inquery/${id}`);
      if (res.data.success) {
        setInquiries(prev => prev.filter(inv => inv.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (e) {
      alert('Failed to delete inquiry');
    }
  };

  const safeSearch = search.trim().toLowerCase();
  const filteredInquiries = inquiries.filter(inv => {
    if (!safeSearch) return true;
    return (inv.name || '').toLowerCase().includes(safeSearch) || 
      String(inv.number || '').includes(safeSearch) ||
      (inv.email || '').toLowerCase().includes(safeSearch) ||
      (inv.subject || '').toLowerCase().includes(safeSearch);
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-ink-950">Inquiries</h1>
          <p className="text-ink-600 text-sm mt-1">Manage customer inquiries and messages</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-ink-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
          <input 
            type="text"
            placeholder="Search name, phone, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ink-50 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-ink-50 border border-ink-200 rounded-lg px-3 py-2 text-sm text-ink-700 outline-none focus:ring-2 focus:ring-burgundy-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-lg px-3 py-2">
            <Calendar size={16} className="text-ink-400" />
            <input 
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm text-ink-700 outline-none w-[110px]"
            />
          </div>
          <span className="text-ink-400">to</span>
          <div className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-lg px-3 py-2">
            <Calendar size={16} className="text-ink-400" />
            <input 
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-sm text-ink-700 outline-none w-[110px]"
            />
          </div>
          {(startDate || endDate || statusFilter) && (
            <button 
              onClick={() => { setStartDate(''); setEndDate(''); setStatusFilter(''); }}
              className="p-2 text-ink-400 hover:text-red-500 transition-colors"
              title="Clear Filters"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 bg-white rounded-xl border border-ink-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* List */}
        <div className={`w-full md:w-1/3 lg:w-1/4 border-r border-ink-200 flex flex-col h-full ${selectedInquiry ? 'hidden md:flex' : 'flex'}`}>
          <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center text-ink-500 text-sm">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="p-8 text-center text-ink-500 text-sm">No inquiries found</div>
            ) : (
              filteredInquiries.map(inv => (
                <button
                  key={inv.id}
                  onClick={() => setSelectedInquiry(inv)}
                  className={`w-full text-left p-4 rounded-lg transition-colors border ${
                    selectedInquiry?.id === inv.id 
                      ? 'bg-burgundy-50 border-burgundy-200' 
                      : 'bg-white border-transparent hover:bg-ink-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-ink-950 truncate pr-2">{inv.name}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      inv.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  <div className="text-xs text-ink-500 mb-1 truncate">{inv.subject || 'No Subject'}</div>
                  <div className="text-[10px] text-ink-400">{new Date(inv.created_at).toLocaleDateString()}</div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className={`flex-1 flex flex-col h-full bg-ink-50/50 ${!selectedInquiry ? 'hidden md:flex items-center justify-center' : 'flex'}`}>
          {!selectedInquiry ? (
            <div className="text-center text-ink-400">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p>Select an inquiry to view details</p>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Detail Header */}
              <div className="p-4 md:p-6 bg-white border-b border-ink-200 shrink-0">
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="md:hidden flex items-center gap-1 text-sm text-ink-500 mb-4 hover:text-ink-900"
                >
                  &larr; Back to list
                </button>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-ink-950 mb-1">Message from {selectedInquiry.name}</h2>
                    <div className="text-sm text-ink-500">Received: {new Date(selectedInquiry.created_at).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedInquiry.status === 'pending' ? (
                      <button 
                        onClick={() => updateStatus(selectedInquiry.id, 'completed')}
                        className="btn-primary !px-3 !py-1.5 text-xs flex items-center gap-1.5"
                      >
                        <CheckCircle size={14} /> Mark Completed
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateStatus(selectedInquiry.id, 'pending')}
                        className="btn-outline !px-3 !py-1.5 text-xs flex items-center gap-1.5"
                      >
                        <Clock size={14} /> Reopen
                      </button>
                    )}
                    <button 
                      onClick={() => deleteInquiry(selectedInquiry.id)}
                      className="p-1.5 text-ink-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                <div className="bg-white rounded-xl border border-ink-200 shadow-sm p-4 md:p-6 mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-4">Contact Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-ink-500 mb-1">Phone Number</div>
                      <div className="font-medium text-ink-900">{selectedInquiry.number}</div>
                    </div>
                    <div>
                      <div className="text-xs text-ink-500 mb-1">Email Address</div>
                      <div className="font-medium text-ink-900">{selectedInquiry.email || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-ink-200 shadow-sm p-4 md:p-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-2">Subject</h3>
                  <div className="text-ink-900 font-medium mb-6 text-sm">{selectedInquiry.subject || <span className="text-ink-400 italic">No Subject Provided</span>}</div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-ink-400 mb-4">Message</h3>
                  <div className="text-ink-800 whitespace-pre-wrap leading-relaxed text-sm">
                    {selectedInquiry.description || 'No message provided.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


