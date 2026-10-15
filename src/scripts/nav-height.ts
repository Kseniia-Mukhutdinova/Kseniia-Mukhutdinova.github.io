/** Exposes the header height as --nav-h so the hero can fill exactly the rest of the first screen. */
export function trackNavHeight(): void {
  const nav = document.querySelector<HTMLElement>('.nav');
  if (!nav) return;
  const set = () => document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
  set();
  new ResizeObserver(set).observe(nav);
}
