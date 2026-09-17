import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Enquiry = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  project_type?: string;
  message?: string;
  status?: string;
  created_at?: string;
};

export async function submitEnquiry(data: Enquiry): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('enquiries').insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      project_type: data.project_type || null,
      message: data.message || null,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch {
    return { success: false, error: 'Network error. Please try again or call us directly.' };
  }
}
