import { apiClient } from '@/lib/axios';

export const trackInterest = async (title: string, path: string) => {
  const domain = window.location.origin;
  const interestString = title + ' (' + domain + path + ')';
  
  const name = localStorage.getItem('lead_name');
  const phone = localStorage.getItem('lead_phone');
  const email = localStorage.getItem('lead_email');
  
  if (name && phone) {
    try {
      await apiClient.post('/visitors', {
        name,
        phone,
        email,
        source: 'continuous_tracking',
        product_interest: interestString
      });
    } catch (e) {
      console.error('Tracking error', e);
    }
  } else {
    try {
      const history = JSON.parse(localStorage.getItem('browsing_history') || '[]');
      if (true) {
        history.push(interestString);
        localStorage.setItem('browsing_history', JSON.stringify(history));
      }
    } catch (e) {
      localStorage.setItem('browsing_history', JSON.stringify([interestString]));
    }
  }
};



