(() => {
  const carousel = document.querySelector('.blog-carousel');
  const row = carousel?.querySelector('.blog-row');
  if (!carousel || !row) return;

  const cards = [...row.querySelectorAll('.blog-card')];
  if (!cards.length) return;

  let restingIndex = Math.max(0, cards.findIndex((card) => card.dataset.active === 'true'));
  let activeIndex = restingIndex;
  let revealTimer;

  const revealCard = (card) => {
    const cardLeft = row.scrollLeft + card.getBoundingClientRect().left - row.getBoundingClientRect().left;
    const left = Math.max(0, Math.min(row.scrollWidth - row.clientWidth, cardLeft - (row.clientWidth - card.clientWidth) / 2));
    row.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  const activate = (index, { persist = false, reveal = false } = {}) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      if (cardIndex === activeIndex) card.dataset.active = 'true';
      else delete card.dataset.active;
    });
    if (persist) restingIndex = activeIndex;
    if (reveal) {
      const card = cards[activeIndex];
      window.clearTimeout(revealTimer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(() => revealCard(card));
      else revealTimer = window.setTimeout(() => revealCard(card), 560);
    }
  };

  cards.forEach((card, index) => {
    card.addEventListener('pointerenter', () => activate(index));
    card.addEventListener('focusin', () => activate(index, { persist: true, reveal: true }));
    card.addEventListener('click', (event) => {
      if (index === activeIndex || event.target.closest('a')) return;
      activate(index, { persist: true });
    });
  });

  row.addEventListener('pointerleave', () => {
    if (!row.contains(document.activeElement)) activate(restingIndex);
  });

  carousel.querySelectorAll('[data-blog-step]').forEach((button) => {
    button.addEventListener('click', () => activate(activeIndex + Number(button.dataset.blogStep), { persist: true, reveal: true }));
  });
})();
