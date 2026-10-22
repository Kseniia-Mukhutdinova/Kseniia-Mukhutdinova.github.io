/** Prefix an internal path with the configured base, so links work at the domain root or under a subpath. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export const EMAIL = 'kseniia.mukh@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/ksenia-mukhutdinova/';
/** Put the PDF at public/<RESUME_FILE>; the nav shows "Download Resume" once it exists. */
export const RESUME_FILE = 'Kseniia-Mukhutdinova-Resume.pdf';
