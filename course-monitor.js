(() => {
  const monitor = document.querySelector('#courses .course-monitor');
  if (!monitor || !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  monitor.classList.add('is-pending');
  let observer;
  let introObserver;

  const reveal = () => {
    if (document.getElementById('site-intro')) return;
    monitor.classList.add('is-visible');
    observer?.disconnect();
    introObserver?.disconnect();
  };

  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) reveal();
  }, { rootMargin: '0px 0px -5% 0px', threshold: .1 });
  observer.observe(monitor);

  if (document.getElementById('site-intro')) {
    introObserver = new MutationObserver(() => {
      if (document.getElementById('site-intro')) return;
      introObserver.disconnect();
      if (monitor.getBoundingClientRect().top < innerHeight) reveal();
    });
    introObserver.observe(document.body, { childList: true });
  }

  window.addEventListener('pagehide', () => {
    observer.disconnect();
    introObserver?.disconnect();
  }, { once: true });
})();
