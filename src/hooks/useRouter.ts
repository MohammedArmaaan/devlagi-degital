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
  | { name: 'contact' };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'services' && parts.length === 1) return { name: 'services' };
  if (parts[0] === 'services' && parts[1]) return { name: 'service', slug: parts[1] };
  if (parts[0] === 'projects' && parts.length === 1) return { name: 'projects' };
  if (parts[0] === 'projects' && parts[1]) return { name: 'project', slug: parts[1] };
  if (parts[0] === 'products' && parts.length === 1) return { name: 'products' };
  if (parts[0] === 'products' && parts[1]) return { name: 'product', slug: parts[1] };
  if (parts[0] === 'brochures') return { name: 'brochures' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
  }, []);

  return { route, navigate };
}
