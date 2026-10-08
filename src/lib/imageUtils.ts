export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  
  if (path.startsWith('data:')) return path;

  const baseUrl = 'https://devlajidigital.com/backend/storage/app/public/';

  // Extract the actual folder path regardless of what domain or localhost prefix it has
  const match = path.match(/(banners|brochures|category|products|projects|services|thumbnails|gallery)\/.*$/i);
  if (match) {
    return baseUrl + match[0];
  }

  // Fallback for paths that don't match the known folders
  if (path.startsWith(baseUrl)) return path;

  let relativePath = path;
  const incorrectPrefixes = [
    'https://devlajidigital.com/backend/storage/app/public/',
    'https://devlajidigital.com/backend/storage/',
    'http://devlajidigital.com/backend/storage/',
    'https://localhost:8000/storage/',
    'http://localhost:8000/storage/',
    'http://127.0.0.1:8000/storage/',
    'http://localhost/devlajidigital.com/backend/storage/',
    'http://localhost/backend/storage/'
  ];

  for (const prefix of incorrectPrefixes) {
    if (relativePath.startsWith(prefix)) {
      relativePath = relativePath.substring(prefix.length);
      break;
    }
  }

  if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1);
  }

  if (relativePath.startsWith('http')) return relativePath;

  return baseUrl + relativePath;
};
