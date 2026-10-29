/* One section, one set of complete cards: form a deck, then return each card
   to its normal layout. */
(() => {
  const section = document.querySelector('#journey');
  const flow = section?.querySelector('.journey-flow');
  const cards = flow ? [...flow.querySelectorAll('.journey-step')] : [];
  if (!section || !flow || cards.length !== 3) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  let started = false;
  let observer;
  let introObserver;
  let resizeObserver;
  let fallbackCheck;
  const timers = [];
  const schedule = (callback, delay) => timers.push(setTimeout(callback, delay));

  function measure() {
    if (started) return;
    const width = flow.clientWidth;
    const targetX = width / 2;
    const targetY = Math.min(flow.clientHeight * .48, 215);
    const compact = width < 690;
    const stacked = width < 980;
    const scale = compact ? .68 : stacked ? .52 : .72;
    const spread = compact ? Math.min(50, width * .14) : stacked ? Math.min(145, width * .20) : Math.min(185, width * .16);

    cards.forEach((card, index) => {
      const cardCenterX = card.offsetLeft + card.offsetWidth / 2;
      const cardCenterY = card.offsetTop + card.offsetHeight / 2;
      card.style.setProperty('--offer-deck-x', `${targetX - cardCenterX}px`);
      card.style.setProperty('--offer-deck-y', `${targetY - cardCenterY}px`);
      card.style.setProperty('--offer-deck-scale', scale);
      card.style.setProperty('--offer-stack-r', `${[-3, 0, 3][index]}deg`);
      card.style.setProperty('--offer-fan-x', `${[-spread, 0, spread][index]}px`);
      card.style.setProperty('--offer-fan-y', `${[18, 0, 18][index]}px`);
      card.style.setProperty('--offer-fan-r', `${[-9, 0, 9][index]}deg`);
      card.style.setProperty('--offer-layer', [1, 3, 2][index]);
    });
    section.dataset.offerMotion = 'ready';
  }

  function finish() {
    started = true;
    timers.forEach(clearTimeout);
    observer?.disconnect();
    introObserver?.disconnect();
    resizeObserver?.disconnect();
    if (fallbackCheck) {
      removeEventListener('scroll', fallbackCheck);
      removeEventListener('resize', fallbackCheck);
    }
    section.dataset.offerMotion = 'complete';
  }

  function play() {
    if (started || reducedMotion.matches) return;
    started = true;
    observer?.disconnect();
    resizeObserver?.disconnect();
    section.dataset.offerMotion = 'rise';
    schedule(() => { section.dataset.offerMotion = 'fan'; }, 900);
    schedule(() => { section.dataset.offerMotion = 'settle'; }, 1950);
    schedule(finish, 3350);
  }

  function observeSection() {
    if (started) return;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) play();
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
      observer.observe(section);
    } else {
      fallbackCheck = () => {
        const rect = section.getBoundingClientRect();
        if (rect.top < innerHeight * .88 && rect.bottom > 0) play();
      };
      addEventListener('scroll', fallbackCheck, { passive: true });
      addEventListener('resize', fallbackCheck, { passive: true });
      fallbackCheck();
    }
  }

  function waitForIntro() {
    const intro = document.querySelector('#site-intro');
    if (!intro || getComputedStyle(intro).display === 'none') return observeSection();
    introObserver = new MutationObserver(() => {
      if (!document.documentElement.contains(intro)) {
        introObserver.disconnect();
        observeSection();
      }
    });
    introObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  measure();
  if ('ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => { if (!started) measure(); });
    resizeObserver.observe(flow);
  }
  section.addEventListener('focusin', finish, { once: true });
  reducedMotion.addEventListener('change', event => { if (event.matches) finish(); });
  waitForIntro();
})();
