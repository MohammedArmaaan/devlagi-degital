import React, { useState, useEffect } from 'react';
import { Download, Calendar, Search, RefreshCcw } from 'lucide-react';
import { apiClient } from '@/lib/axios';

type Visitor = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  source: string | null;
  product_interest: string | null;
  created_at: string;
};

type Props = {
  navigate: (path: string) => void;
};

export default function AdminVisitors({ navigate }: Props) {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      let url = '/admin/visitors';
      const params = new URLSearchParams();
      if (startDate && endDate) {
        params.append('start_date', startDate);
        params.append('end_date', endDate);
      }
      const response = await apiClient.get(url + '?' + params.toString());
      if (response.data.success) {
        setVisitors(response.data.data);
      }
    } catch (e) {
      console.error(e);
      // If auth fails, handle logout here or handled globally
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [startDate, endDate]);

    const handleExport = () => {
    if (visitors.length === 0) return alert('No data to export');
    
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Source', 'Products/Brochures Interested'];
    const csvContent = [
      headers.join(','),
      ...visitors.map(v => {
        const id = v.id;
        const date = new Date(v.created_at).toLocaleDateString();
        const name = '"' + (v.name || '').replace(/"/g, '""') + '"';
        const phone = '"' + (v.phone || '') + '"';
        const email = '"' + (v.email || '') + '"';
          const source = '"' + (v.source || '').split(',').map(s => s.trim()).filter(Boolean).join('\n') + '"';
          const formattedInterest = (v.product_interest || '').split('|').map(s => s.trim()).filter(Boolean).join('\n');
          const interest = '"' + formattedInterest.replace(/"/g, '""') + '"';
        return [id, date, name, phone, email, source, interest].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'visitors_export_' + new Date().getTime() + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter local search
  const filteredVisitors = visitors.filter(v => 
    (v.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (v.phone || '').includes(search) ||
    (v.product_interest || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-sans font-bold text-ink-950">Visitor Data</h1>
          <p className="text-ink-600 text-sm mt-1">View and export captured leads</p>
        </div>
        
        <button 
          onClick={handleExport}
          className="btn-primary flex items-center justify-center gap-2 !py-2 !px-4 text-sm whitespace-nowrap"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-ink-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
          <input 
            type="text"
            placeholder="Search names, phones, or interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ink-50 border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-lg px-3 py-2">
            <Calendar size={16} className="text-ink-400" />
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
          <span className="text-ink-400">to</span>
          <div className="flex items-center gap-2 bg-ink-50 border border-ink-200 rounded-lg px-3 py-2">
            <Calendar size={16} className="text-ink-400" />
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
        
        <button 
          onClick={fetchVisitors} 
          className="p-2 text-ink-600 hover:text-burgundy-600 bg-ink-50 border border-ink-200 rounded-lg transition-colors"
          title="Refresh"
        >
          <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-ink-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-50 border-b border-ink-200 text-ink-600 font-medium">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 min-w-[300px]">Interests & History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ink-500">Loading visitors...</td>
                </tr>
              ) : filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ink-500">No visitors found matching the criteria.</td>
                </tr>
              ) : (
                filteredVisitors.map(v => (
                  <tr key={v.id} className="hover:bg-ink-50/50 transition-colors">
                    <td className="py-3 px-4 text-ink-500 whitespace-nowrap">
                      {new Date(v.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-medium text-ink-950">
                      {v.name}
                    </td>
                    <td className="py-3 px-4 text-ink-700 font-mono">
                      {v.phone}
                    </td>
                    <td className="py-3 px-4 text-ink-700">
                      {v.email || <span className="text-ink-400 italic">-</span>}
                    </td>
                    <td className="py-3 px-4 text-ink-500">
                      <div className="flex flex-col gap-1">
                          {v.source ? v.source.split(',').map((src, i) => (
                            <span key={i} className="bg-ink-100 px-2 py-1 rounded text-xs w-fit">{src.trim()}</span>
                          )) : <span className="bg-ink-100 px-2 py-1 rounded text-xs w-fit">Unknown</span>}
                        </div>
                    </td>
                    <td className="py-3 px-4 text-ink-700">
                      <div className="flex flex-col gap-1">
                        {(v.product_interest || '').split(' | ').map((interest, i) => (
                          interest ? <div key={i} className="text-xs bg-burgundy-50 text-burgundy-900 px-2 py-1.5 rounded">{interest}</div> : null
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}


