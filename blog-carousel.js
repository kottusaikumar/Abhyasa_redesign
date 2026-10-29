(() => {
  const carousel = document.querySelector('[data-blog-carousel]');
  const track = carousel?.querySelector('[data-blog-track]');
  if (!carousel || !track) return;
  const cards = [...track.querySelectorAll('.blog-showcase-card')];
  const articles = cards.filter(card => !card.classList.contains('blog-showcase-card--empty'));
  const desktop = matchMedia('(min-width: 1200px)');
  const mobile = matchMedia('(max-width: 640px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let animations = [], visible = true, focusedCard = null, phasePosition = 0;
  let inputModality = 'keyboard';
  const previous = carousel.querySelector('[data-blog-direction="-1"]');
  const next = carousel.querySelector('[data-blog-direction="1"]');
  const pagination = carousel.querySelector('[data-blog-pagination]');
  const status = carousel.querySelector('[data-blog-status]');
  const layoutToggle = carousel.querySelector('[data-blog-layout-toggle]');
  let gridOpen = false, layoutChanging = false, savedPageOverflow = '';
  let mobilePosition = 0, scrollTimer;

  const cardLeft = index => articles[index].offsetLeft - articles[0].offsetLeft;
  const nearestArticle = () => articles.reduce((best, card, index) =>
    Math.abs(cardLeft(index) - track.scrollLeft) < Math.abs(cardLeft(best) - track.scrollLeft)
      ? index : best, 0);
  function updateMobileControls() {
    if (!previous || !next || !pagination) return;
    previous.disabled = mobilePosition === 0;
    next.disabled = mobilePosition === articles.length - 1;
    [...pagination.children].forEach((dot, index) => {
      if (index === mobilePosition) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (status && mobile.matches) status.textContent = 'Article ' + (mobilePosition + 1)
      + ' of ' + articles.length + ': ' + articles[mobilePosition].querySelector('h3').textContent;
  }
  function goToArticle(index) {
    mobilePosition = Math.max(0, Math.min(articles.length - 1, index));
    updateMobileControls();
    track.scrollTo({ left: cardLeft(mobilePosition),
      behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  if (previous && next && pagination) {
    articles.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'blog-showcase-dot';
      dot.setAttribute('aria-label', 'Show article ' + (index + 1) + ' of ' + articles.length
        + ': ' + card.querySelector('h3').textContent);
      dot.addEventListener('click', () => goToArticle(index));
      pagination.append(dot);
    });
    previous.addEventListener('click', () => goToArticle(mobilePosition - 1));
    next.addEventListener('click', () => goToArticle(mobilePosition + 1));
    track.addEventListener('scroll', () => {
      if (!mobile.matches) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        mobilePosition = nearestArticle();
        updateMobileControls();
      }, 160);
    }, { passive: true });
    mobile.addEventListener('change', () => {
      mobilePosition = nearestArticle();
      updateMobileControls();
    });
    updateMobileControls();
  }
  // A low pivot creates the curved paths; changing angle spacing changes overlap.
  const angle = (i, phase) => {
    const offset = i - 3.5;
    return 8.43 * Math.cos(phase)
      + offset * (12.5 + 1.37 * Math.sin(phase))
      - .1 * Math.cos(phase) * (offset * offset - 5.25);
  };
  const pose = (i, phase) => 'translateX(-50%) rotate('
    + angle(i, phase).toFixed(3) + 'deg)';
  const enabled = () => desktop.matches && !reducedMotion.matches;
  const shouldPlay = () => enabled() && !gridOpen && !layoutChanging && visible && !document.hidden
    && !focusedCard;
  function updatePlayback() {
    animations.forEach(a => shouldPlay() ? a.play() : a.pause());
  }
  function stopMotion() {
    animations.forEach(a => a.cancel());
    animations = [];
    cards.forEach(card => {
      card.style.removeProperty('transform');
      card.style.removeProperty('z-index');
    });
  }
  function startMotion() {
    if (gridOpen || layoutChanging) return;
    const active = animations.find(animation => animation.currentTime != null);
    if (active) phasePosition = Number(active.currentTime) % 4000;
    stopMotion();
    carousel.classList.toggle('blog-showcase--fan', enabled());
    if (!enabled()) {
      focusedCard = null;
      carousel.classList.remove('blog-showcase--keyboard-focus');
      return;
    }
    cards.forEach((card, i) => {
      card.style.zIndex = String(35 + i * 50);
      card.style.transform = pose(i, 0);
      const keyframes = Array.from({ length: 49 }, (_, frame) => ({
        offset: frame / 48, transform: pose(i, frame / 48 * 2 * Math.PI)
      }));
      animations.push(card.animate(keyframes, {
        duration: 4000, iterations: Infinity, easing: 'linear'
      }));
    });
    const created = animations;
    Promise.all(created.map(a => a.ready)).then(() => {
      if (animations !== created) return;
      const start = document.timeline.currentTime - phasePosition;
      created.forEach(a => { a.startTime = start; });
      updatePlayback();
    });
  }
  function releaseFocus() {
    if (!focusedCard) return;
    focusedCard = null;
    carousel.classList.remove('blog-showcase--keyboard-focus');
    if (enabled()) startMotion();
    else updatePlayback();
  }
  function focusCard(card) {
    if (gridOpen || layoutChanging) return;
    if (focusedCard === card) return;
    if (focusedCard) releaseFocus();
    focusedCard = card;
    carousel.classList.add('blog-showcase--keyboard-focus');
    updatePlayback();
    if (!enabled()) return;
    animations[cards.indexOf(card)]?.cancel();
    card.style.zIndex = '999';
    card.style.transform = 'translateX(-50%) rotate(0deg)';
  }
  document.addEventListener('pointerdown', () => {
    inputModality = 'pointer';
    if (focusedCard) releaseFocus();
  }, { capture: true, passive: true });
  document.addEventListener('keydown', () => { inputModality = 'keyboard'; }, { capture: true });
  track.addEventListener('focusin', event => {
    if (inputModality === 'pointer') return;
    const card = event.target.closest('.blog-showcase-card');
    if (card && cards.includes(card)) focusCard(card);
  });
  track.addEventListener('focusout', () => setTimeout(() => {
    if (inputModality === 'pointer') return;
    const card = document.activeElement?.closest('.blog-showcase-card');
    if (card === focusedCard) return;
    releaseFocus();
    if (card && cards.includes(card)) focusCard(card);
  }, 0));
  track.addEventListener('keydown', event => {
    if (gridOpen || layoutChanging) return;
    if (event.target !== track || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const current = enabled() ? Math.max(0, articles.indexOf(focusedCard)) : nearestArticle();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? articles.length - 1
      : Math.max(0, Math.min(articles.length - 1,
        current + (event.key === 'ArrowRight' ? 1 : -1)));
    if (enabled()) articles[index].querySelector('.blog-showcase-cta')?.focus();
    else goToArticle(index);
  });
  function updateLayoutButton() {
    if (!layoutToggle) return;
    layoutToggle.disabled = mobile.matches;
    layoutToggle.setAttribute('aria-expanded', String(gridOpen));
    layoutToggle.setAttribute('aria-label', gridOpen ? 'Return to blog carousel' : 'Expand blog cards');
    layoutToggle.querySelector('span').textContent = gridOpen ? 'Return to fan' : 'View grid';
  }
  function cardGeometry(card) {
    const rect = card.getBoundingClientRect();
    const matrix = new DOMMatrixReadOnly(getComputedStyle(card).transform);
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: card.offsetWidth,
      height: card.offsetHeight,
      angle: Math.atan2(matrix.b, matrix.a) * 180 / Math.PI
    };
  }
  function headerHeight() {
    return document.querySelector('.site-header')?.getBoundingClientRect().height || 0;
  }
  async function changeLayout(open, instant = false) {
    if (!layoutToggle || layoutChanging || gridOpen === open || (open && mobile.matches)) return;
    layoutChanging = true;
    const motion = !instant && !reducedMotion.matches;
    const header = headerHeight();
    const panelBefore = carousel.getBoundingClientRect();
    const cardBefore = cards.map(cardGeometry);
    const wasFan = carousel.classList.contains('blog-showcase--fan');
    const oldScroll = track.scrollLeft;
    if (open) {
      focusedCard = null;
      carousel.classList.remove('blog-showcase--keyboard-focus');
      const active = animations.find(animation => animation.currentTime != null);
      if (active) phasePosition = Number(active.currentTime) % 4000;
      stopMotion();
      carousel.classList.remove('blog-showcase--fan');
      gridOpen = true;
      carousel.style.setProperty('--blog-header-height', header + 'px');
      carousel.classList.add('blog-showcase--grid');
      document.documentElement.classList.add('blog-grid-open');
      track.scrollTop = 0;
      savedPageOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    } else {
      gridOpen = false;
      document.documentElement.classList.remove('blog-grid-open');
      carousel.classList.remove('blog-showcase--grid');
      carousel.classList.toggle('blog-showcase--fan', enabled());
      if (enabled()) {
        cards.forEach((card, index) => {
          card.style.transform = pose(index, phasePosition / 4000 * 2 * Math.PI);
          card.style.zIndex = String(35 + index * 50);
        });
      } else {
        track.scrollLeft = oldScroll;
      }
    }
    const panelAfter = carousel.getBoundingClientRect();
    const cardAfter = cards.map(cardGeometry);
    carousel.setAttribute('aria-roledescription', open ? 'article grid' : 'carousel');
    track.setAttribute('aria-label', open ? 'All seven blog articles, scroll vertically for more' : 'Latest blog articles');
    updateLayoutButton();
    if (motion) {
      carousel.style.visibility = 'hidden';
      const backdrop = document.createElement('div');
      backdrop.setAttribute('aria-hidden', 'true');
      Object.assign(backdrop.style, {
        position: 'fixed', zIndex: '18', background: '#17615f', pointerEvents: 'none',
        left: panelBefore.left + 'px', top: panelBefore.top + 'px',
        width: panelBefore.width + 'px', height: panelBefore.height + 'px',
        borderRadius: open ? '25px' : '0px', overflow: 'hidden'
      });
      const layer = document.createElement('div');
      layer.className = 'blog-transition-layer';
      layer.style.setProperty('--blog-header-height', header + 'px');
      layer.setAttribute('aria-hidden', 'true');
      layer.inert = true;
      document.body.append(backdrop, layer);
      const duration = 820;
      const easing = 'cubic-bezier(.22,.72,.18,1)';
      const moves = [backdrop.animate([
        {left: panelBefore.left + 'px', top: panelBefore.top + 'px', width: panelBefore.width + 'px', height: panelBefore.height + 'px', borderRadius: open ? '25px' : '0px'},
        {left: panelAfter.left + 'px', top: panelAfter.top + 'px', width: panelAfter.width + 'px', height: panelAfter.height + 'px', borderRadius: open ? '0px' : '25px'}
      ], {duration, easing, fill: 'forwards'})];
      cards.forEach((card, index) => {
        const from = cardBefore[index], to = cardAfter[index];
        const clone = card.cloneNode(true);
        clone.removeAttribute('id');
        clone.removeAttribute('role');
        clone.classList.add('blog-transition-card');
        clone.removeAttribute('style');
        clone.querySelectorAll('a,button').forEach(el => { el.removeAttribute('href'); el.tabIndex = -1; });
        Object.assign(clone.style, {
          left: (from.x - from.width / 2) + 'px', top: (from.y - from.height / 2 - header) + 'px',
          width: from.width + 'px', height: from.height + 'px',
          transform: 'rotate(' + from.angle + 'deg)',
          zIndex: String(wasFan && open ? 35 + index * 50 : cards.length - index)
        });
        layer.append(clone);
        const start = {left: (from.x - from.width / 2) + 'px', top: (from.y - from.height / 2 - header) + 'px', width: from.width + 'px', height: from.height + 'px', transform: 'rotate(' + from.angle + 'deg)'};
        const end = {left: (to.x - to.width / 2) + 'px', top: (to.y - to.height / 2 - header) + 'px', width: to.width + 'px', height: to.height + 'px', transform: 'rotate(' + to.angle + 'deg)'};
        moves.push(clone.animate([start, end], {duration, easing, fill: 'forwards'}));
      });
      await Promise.all(moves.map(animation => animation.finished.catch(() => {})));
      layer.remove();
      backdrop.remove();
      carousel.style.removeProperty('visibility');
    }
    if (!open) {
      document.documentElement.style.overflow = savedPageOverflow;
      layoutChanging = false;
      if (enabled()) startMotion();
      else updateMobileControls();
      if (mobile.matches) track.focus({preventScroll: true});
      else layoutToggle.focus({preventScroll: true});
    } else {
      track.scrollTop = 0;
      layoutToggle.focus({preventScroll: true});
    }
    layoutChanging = false;
    updatePlayback();
    if (status) status.textContent = gridOpen ? 'Blog cards expanded into a grid' : 'Blog carousel restored';
    if (mobile.matches && gridOpen) queueMicrotask(() => changeLayout(false, true));
  }
  layoutToggle?.addEventListener('click', () => changeLayout(!gridOpen));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && gridOpen) changeLayout(false);
    if (event.key !== 'Tab' || !gridOpen || layoutChanging) return;
    const items = [track, ...articles.map(card => card.querySelector('.blog-showcase-cta')), layoutToggle];
    const current = items.indexOf(document.activeElement);
    if (event.shiftKey && current === 0) {
      event.preventDefault();
      layoutToggle.focus();
    } else if (!event.shiftKey && current === items.length - 1) {
      event.preventDefault();
      track.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (gridOpen) carousel.style.setProperty('--blog-header-height', headerHeight() + 'px');
  });
  mobile.addEventListener('change', () => {
    updateLayoutButton();
    if (mobile.matches && gridOpen && !layoutChanging) changeLayout(false, true);
  });
  desktop.addEventListener('change', startMotion);
  reducedMotion.addEventListener('change', startMotion);
  document.addEventListener('visibilitychange', updatePlayback);
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }, { threshold: .05 }).observe(carousel);
  startMotion();
  updateLayoutButton();
})();
