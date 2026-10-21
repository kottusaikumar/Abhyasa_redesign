(() => {
  const root = document.documentElement;
  const intro = document.getElementById('site-intro');
  if (!intro) return;
  if (!root.classList.contains('intro-eligible')) {
    intro.remove();
    return;
  }

  const video = intro.querySelector('video');
  const page = [document.querySelector('.skip-link'), document.querySelector('.site-header'),
    document.querySelector('main'), document.querySelector('.site-footer')].filter(Boolean);
  const previousInert = page.map(element => element.inert);
  const listeners = new AbortController();
  let closed = false;
  let fallback;

  page.forEach(element => { element.inert = true; });
  intro.focus({ preventScroll: true });

  const finish = () => {
    if (closed) return;
    closed = true;
    clearTimeout(fallback);
    listeners.abort();
    video.pause();
    intro.classList.add('is-closing');
    setTimeout(() => {
      root.classList.remove('intro-eligible');
      intro.remove();
      page.forEach((element, index) => { element.inert = previousInert[index]; });
    }, 120);
  };

  video.addEventListener('ended', finish, { signal: listeners.signal });
  video.addEventListener('error', finish, { signal: listeners.signal });
  video.addEventListener('playing', () => {
    clearTimeout(fallback);
    fallback = setTimeout(finish, Math.max(7000, video.duration * 1000 + 2000));
  }, { signal: listeners.signal });
  intro.addEventListener('wheel', event => event.preventDefault(),
    { passive: false, signal: listeners.signal });
  intro.addEventListener('touchmove', event => event.preventDefault(),
    { passive: false, signal: listeners.signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') finish();
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
    }
  }, { signal: listeners.signal });
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference.addEventListener('change', event => { if (event.matches) finish(); },
    { signal: listeners.signal });

  fallback = setTimeout(finish, 8000);
  video.muted = true;
  video.src = video.dataset.src;
  video.load();
  video.play().catch(finish);
})();
