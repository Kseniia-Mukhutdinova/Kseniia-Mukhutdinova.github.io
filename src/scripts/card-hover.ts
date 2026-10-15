/**
 * Card hover that reacts only to intentional pointer movement.
 * CSS :hover also fires when scrolling moves a card under a resting cursor,
 * which would replay the "View case study" animation on every scroll.
 * Here the card counts as hovered only after the mouse itself moves over it.
 */
export function initCardHover(): void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => (lastScroll = performance.now()), { passive: true });

  document.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
    const link = card.querySelector<HTMLElement>('.bl-trigger');
    const set = (on: boolean) => {
      card.classList.toggle('is-hovered', on);
      link?.classList.toggle('is-active', on);
    };

    card.addEventListener('pointermove', (e) => {
      if (card.classList.contains('is-hovered')) return;
      // Browsers send synthetic moves with no distance after a scroll; ignore those.
      const moved = e.movementX !== 0 || e.movementY !== 0;
      if (moved && performance.now() - lastScroll > 150) set(true);
    });
    card.addEventListener('pointerleave', () => set(false));
  });
}
