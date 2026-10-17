(() => {
  const links = [...document.querySelectorAll('.article-toc a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || !sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: '-18% 0px -68% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
})();
