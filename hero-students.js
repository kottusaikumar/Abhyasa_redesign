(() => {
  const visual = document.querySelector('[data-student-sequence]');
  if (!visual) return;

  const frames = [...visual.querySelectorAll('[data-student-frame]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (frames.length < 2) return;

  let available = [];
  let active = frames[0];
  let timer = null;
  let handoffTimer = null;
  let inView = !('IntersectionObserver' in window);
  let introComplete = !document.getElementById('site-intro');

  const stop = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
  };

  const cancelHandoff = () => {
    if (handoffTimer === null) return;
    window.clearTimeout(handoffTimer);
    handoffTimer = null;
    show(active);
  };

  const canAdvance = () => available.length > 1 && !reducedMotion.matches
    && !document.hidden && inView && introComplete;

  const show = frame => {
    frames.forEach(item => item.classList.toggle('is-active', item === frame));
    active = frame;
  };

  const advance = () => {
    timer = null;
    if (!canAdvance()) {
      reconcile();
      return;
    }
    const next = available[(available.indexOf(active) + 1) % available.length];
    show(next);
    handoffTimer = window.setTimeout(() => {
      handoffTimer = null;
      schedule();
    }, 600);
  };

  function schedule() {
    stop();
    if (canAdvance() && handoffTimer === null) timer = window.setTimeout(advance, 2900);
  }

  const reconcile = () => {
    if (!canAdvance()) {
      stop();
      cancelHandoff();
    }
    if (reducedMotion.matches && available.length) {
      show(available[0]);
    }
    schedule();
  };

  const ready = async frame => {
    if (!frame.complete) {
      await new Promise(resolve => {
        frame.addEventListener('load', resolve, { once: true });
        frame.addEventListener('error', resolve, { once: true });
      });
    }
    if (!frame.naturalWidth) return false;
    try { await frame.decode(); } catch (_) { /* A decoded image can still render. */ }
    return true;
  };

  document.addEventListener('visibilitychange', reconcile);
  reducedMotion.addEventListener('change', reconcile);

  let viewportObserver;
  if ('IntersectionObserver' in window) {
    viewportObserver = new IntersectionObserver(entries => {
      const nextInView = entries[entries.length - 1].isIntersecting;
      if (inView === nextInView) return;
      inView = nextInView;
      reconcile();
    }, { threshold: 0.01 });
    viewportObserver.observe(visual);
  }

  let introObserver;
  if (!introComplete) {
    introObserver = new MutationObserver(() => {
      if (document.getElementById('site-intro')) return;
      introComplete = true;
      introObserver.disconnect();
      reconcile();
    });
    introObserver.observe(document.body, { childList: true });
  }

  window.addEventListener('pagehide', () => {
    stop();
    cancelHandoff();
    viewportObserver?.disconnect();
  });

  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    const bounds = visual.getBoundingClientRect();
    inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
    introComplete = !document.getElementById('site-intro');
    viewportObserver?.observe(visual);
    reconcile();
  });

  Promise.all(frames.map(ready)).then(results => {
    available = frames.filter((_, index) => results[index]);
    frames.forEach(frame => { frame.hidden = !available.includes(frame); });
    if (available.length) show(available[0]);
    reconcile();
  });
})();
