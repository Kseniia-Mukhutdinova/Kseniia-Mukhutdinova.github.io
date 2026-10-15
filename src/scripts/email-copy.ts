/**
 * "Send me an email" links: many visitors have no desktop mail app, so a bare mailto: does nothing.
 * On click we copy the address and show a small "Email copied" toast.
 * If copying isn't possible, the normal mailto: behaviour is left untouched.
 */
export function initEmailCopy(): void {
  const toast = document.querySelector<HTMLElement>('[data-email-toast]');
  if (!toast || !navigator.clipboard) return;

  let hideTimer: number | undefined;
  const hide = () => toast.classList.remove('is-open');
  const title = toast.querySelector('.toast__title');
  const show = () => {
    toast.hidden = false;
    // re-set the text so screen readers announce it every time
    if (title) {
      title.textContent = '';
      window.setTimeout(() => (title.textContent = 'Email copied to clipboard'), 50);
    }
    // next frame so the entrance transition runs
    requestAnimationFrame(() => toast.classList.add('is-open'));
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, 6000);
  };

  toast.querySelector('[data-email-toast-close]')?.addEventListener('click', hide);
  toast.addEventListener('mouseenter', () => window.clearTimeout(hideTimer));
  toast.addEventListener('mouseleave', () => (hideTimer = window.setTimeout(hide, 3000)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && hide());

  document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener('click', async (e) => {
      const address = link.href.replace(/^mailto:/, '').split('?')[0];
      try {
        e.preventDefault();
        await navigator.clipboard.writeText(address);
        show();
      } catch {
        window.location.href = link.href; // clipboard blocked: fall back to the mail app
      }
    });
  });
}
