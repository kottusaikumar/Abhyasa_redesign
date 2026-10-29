(() => {
  const section = document.querySelector('#journey');
  const track = section?.querySelector('#offer-carousel-track');
  const pagination = section?.querySelector('[data-offer-pagination]');
  const previous = section?.querySelector('[data-offer-direction="-1"]');
  const next = section?.querySelector('[data-offer-direction="1"]');
  if (!track || !pagination || !previous || !next) return;

  const cards = [...track.querySelectorAll(':scope > .journey-step')];
  const mobile = matchMedia('(max-width: 640px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let scrollFrame = 0;

  function position(index) { return cards[index].offsetLeft - cards[0].offsetLeft; }
  function updateControls() {
    previous.disabled = active === 0;
    next.disabled = active === cards.length - 1;
    [...pagination.children].forEach((dot, index) => {
      if (index === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  function goTo(index) {
    if (!mobile.matches) return;
    active = Math.max(0, Math.min(cards.length - 1, index));
    updateControls();
    track.scrollTo({ left: position(active), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  cards.forEach((card, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'offer-carousel-dot';
    dot.setAttribute('aria-label', 'Show offering ' + (index + 1) + ' of ' + cards.length + ': ' + card.querySelector('h3').textContent);
    dot.addEventListener('click', () => goTo(index));
    pagination.append(dot);
  });
  previous.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));
  track.addEventListener('scroll', () => {
    if (!mobile.matches || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      active = cards.reduce((best, _, index) => Math.abs(position(index) - track.scrollLeft) < Math.abs(position(best) - track.scrollLeft) ? index : best, 0);
      updateControls();
    });
  }, { passive: true });
  track.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== track) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  function updateViewport() {
    track.tabIndex = mobile.matches ? 0 : -1;
    if (mobile.matches) track.setAttribute('aria-roledescription', 'carousel');
    else { track.removeAttribute('aria-roledescription'); track.scrollLeft = 0; active = 0; }
    updateControls();
  }
  mobile.addEventListener('change', updateViewport);
  updateViewport();
})();
