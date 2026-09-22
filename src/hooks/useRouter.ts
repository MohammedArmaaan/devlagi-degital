import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'services' }
  | { name: 'service'; slug: string }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
  | { name: 'products' }
  | { name: 'product'; slug: string }
  | { name: 'brochures' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'category'; slug: string }
  | { name: 'collections' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'returns' };

function parsePath(): Route {
  const path = window.location.pathname.replace(/^\/?/, '');
  const parts = path.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'services' && parts.length === 1) return { name: 'services' };
  if (parts[0] === 'services' && parts[1]) return { name: 'service', slug: parts[1] };
  if (parts[0] === 'projects' && parts.length === 1) return { name: 'projects' };
  if (parts[0] === 'projects' && parts[1]) return { name: 'project', slug: parts[1] };
  if (parts[0] === 'products' && parts.length === 1) return { name: 'products' };
  if (parts[0] === 'products' && parts[1]) return { name: 'product', slug: parts[1] };
  if (parts[0] === 'category' && parts[1]) return { name: 'category', slug: parts[1] };
  if (parts[0] === 'brochures') return { name: 'brochures' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };
  if (parts[0] === 'collections') return { name: 'collections' };
  if (parts[0] === 'privacy') return { name: 'privacy' };
  if (parts[0] === 'terms') return { name: 'terms' };
  if (parts[0] === 'returns') return { name: 'returns' };
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parsePath());

  useEffect(() => {
    const onChange = () => {
      setRoute(parsePath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    
    window.addEventListener('popstate', onChange);
    window.addEventListener('pushstate', onChange);
    
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('pushstate', onChange);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState({}, '', normalizedPath);
    window.dispatchEvent(new Event('pushstate'));
  }, []);

  return { route, navigate };
}
