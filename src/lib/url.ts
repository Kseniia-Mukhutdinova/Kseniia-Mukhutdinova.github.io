/** Prefix an internal path with the configured base, so links work at the domain root or under a subpath. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export const EMAIL = 'devksuksu@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/ksenia-mukhutdinova/';
