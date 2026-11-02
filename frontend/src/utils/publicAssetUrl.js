export const resolvePublicAssetUrl = (url, basePath = import.meta.env.BASE_URL) => {
  if (typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//')) return url;

  const base = basePath.endsWith('/') ? basePath : `${basePath}/`;
  if (base === '/' || url.startsWith(base)) return url;

  return `${base}${url.slice(1)}`;
};
