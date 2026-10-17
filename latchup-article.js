(() => {
  const article = document.querySelector('.latchup-article');
  const toc = document.querySelector('.latchup-toc');
  if (!article || !toc || !('IntersectionObserver' in window)) return;

  const links = [...toc.querySelectorAll('nav a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((section) => section && article.contains(section));

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  toc.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link) setActive(decodeURIComponent(link.hash.slice(1)));
  });

  if (location.hash && sections.some((section) => `#${section.id}` === location.hash)) {
    setActive(decodeURIComponent(location.hash.slice(1)));
  }

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible[0]) return;
    setActive(visible[0].target.id);
  }, { rootMargin: '-16% 0px -72% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
})();
