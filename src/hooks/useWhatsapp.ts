import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/axios';
import { business } from '@/lib/data';

type WhatsappData = {
  no: string;
};

// Global cache to prevent multiple fetches
let globalWhatsapp: string | null = null;
let isFetching = false;
const listeners = new Set<(no: string) => void>();

export function useWhatsapp() {
  const [whatsappNo, setWhatsappNo] = useState<string>(globalWhatsapp || business.phoneRaw);

  useEffect(() => {
    if (globalWhatsapp) return; // Already fetched

    const fetchWhatsapp = async () => {
      if (isFetching) return;
      isFetching = true;
      try {
        const res = await apiClient.get('/whatsapp/active');
        if (res.data.success && res.data.data && res.data.data.no) {
          globalWhatsapp = res.data.data.no;
          setWhatsappNo(globalWhatsapp as string);
          listeners.forEach(fn => fn(globalWhatsapp!));
        }
      } catch (err) {
        console.error('Failed to fetch active whatsapp number', err);
      } finally {
        isFetching = false;
      }
    };

    fetchWhatsapp();

    const updateListener = (no: string) => setWhatsappNo(no);
    listeners.add(updateListener);
    
    return () => {
      listeners.delete(updateListener);
    };
  }, []);

  return whatsappNo;
}
