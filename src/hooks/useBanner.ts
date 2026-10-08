import { useState, useEffect } from 'react';
import { apiClient, getCachedDataSync } from '@/lib/axios';

export function useBanner(pageType: string) {
  const [banner, setBanner] = useState<any>(() => {
    const cached = getCachedDataSync('/frontendbanners');
    if (cached && cached.success && cached.data[pageType] && cached.data[pageType].length > 0) {
      const config = cached.data[pageType][0];
      if (config && config.image_urls && config.image_urls.length > 0) {
        const slides = (config.image_urls || []).map((url: string, index: number) => ({
          image: url,
          title: config.tytle?.[index] || '',
          subtitle: config.tytle_name?.[index] || '',
          link: config.link?.[index] || ''
        }));
        return {
          image: config.image_urls[0],
          title: config.tytle?.[0] || '',
          subtitle: config.tytle_name?.[0] || '',
          description: config.description?.[0] || '',
          link: config.link || [],
          slides
        };
      }
    }
    return null;
  });
  
  const [isLoading, setIsLoading] = useState(() => {
    const cached = getCachedDataSync('/frontendbanners');
    return !cached;
  });

  useEffect(() => {
    let hasImage = false;
    apiClient.get('/frontendbanners')
      .then(res => {
        if (res.data.success && res.data.data[pageType] && res.data.data[pageType].length > 0) {
          const config = res.data.data[pageType][0];
          if (config && config.image_urls && config.image_urls.length > 0) {
             hasImage = true;
             const slides = (config.image_urls || []).map((url: string, index: number) => ({
                 image: url,
                 title: config.tytle?.[index] || '',
                 subtitle: config.tytle_name?.[index] || '',
                 link: config.link?.[index] || ''
             }));
             setBanner({
               image: config.image_urls[0],
               title: config.tytle?.[0] || '',
               subtitle: config.tytle_name?.[0] || '',
               description: config.description?.[0] || '',
               link: config.link || [],
               slides
             });
          }
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
        if (!hasImage) {
          window.dispatchEvent(new Event('banner-missing'));
        }
      });
  }, [pageType]);

  return { banner, isLoading };
}
