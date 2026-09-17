// Supabase is disabled for now as requested.
// We are keeping the types and function signature so the forms don't break.

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
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Always return success for the static version
  console.log('Form submission received:', data);
  return { success: true };
}
