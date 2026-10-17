(() => {
  const cardDefinitions = [
    {
      id: 'physical-design-guides',
      category: 'Physical Design',
      title: 'Floorplanning the design',
      description: 'Explore target and effective utilization, density, row spacing, instance groups, bounding boxes and Innovus hierarchy commands.',
      href: '/blog/pnr/floorplanning-the-design.html',
      label: 'Read Floorplanning the design'
    },
    {
      id: 'pd-essentials',
      category: 'PD Essentials',
      title: 'Latch-Up in CMOS/BiCMOS Circuits',
      description: 'Understand latch-up causes, circuit impact, parasitic structure, trigger conditions, and prevention remedies.',
      href: '/blog/pnr/latchup-effect.html',
      label: 'Read the Latch-Up in CMOS/BiCMOS Circuits guide'
    },
    {
      id: 'trim-design-guide',
      category: 'PD Essentials',
      title: 'Trimming a Design in Innovus (trimDesign)',
      description: 'Explore selected-region extraction, retained physical data, boundary connectivity, command examples, and limitations in Innovus trimDesign.',
      href: '/blog/pnr/trim-design.html',
      label: 'Read the Trim Design guide'
    },
    {
      id: 'module-placement-constraints-guide',
      category: 'PD Essentials',
      title: 'Module placement constraints in physical design',
      description: 'Compare None, Guide, Fence, Region, and Soft Guide/Cluster constraints in Cadence Innovus, with original command examples.',
      href: '/blog/pnr/module-placement-constraints.html',
      label: 'Read the Module Placement Constraints guide'
    }
  ];

  const addCard = (grid, card) => {
    if (grid.querySelector(`#${card.id}`)) return;
    const element = document.createElement('div');
    element.id = card.id;
    element.className = 'rounded-xl border shadow bg-gray-800 text-white border-gray-700 flex flex-col';
    element.innerHTML = `<div class="flex-grow p-5"><span class="text-sm font-semibold text-blue-300"></span><h2 class="font-semibold tracking-tight text-xl my-2"></h2><p class="text-gray-300 mb-4"></p></div><div class="flex items-center p-4 pt-0"><a class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 w-full bg-blue-600 text-white"></a></div>`;
    element.querySelector('span').textContent = card.category;
    element.querySelector('h2').textContent = card.title;
    element.querySelector('p').textContent = card.description;
    const link = element.querySelector('a');
    link.href = card.href;
    link.textContent = 'Read Guide';
    link.setAttribute('aria-label', card.label);
    grid.insertBefore(element, grid.firstElementChild);
    if (location.hash === `#${card.id}`) element.scrollIntoView({ block: 'start' });
  };

  const ensureCards = () => {
    const heading = [...document.querySelectorAll('h1')]
      .find((item) => item.textContent.trim() === 'Latest Blog Posts');
    const grid = heading?.parentElement?.querySelector(':scope > .grid');
    if (!grid) return;
    cardDefinitions.forEach((card) => addCard(grid, card));
  };

  let observer;
  const startAfterHydration = () => {
    window.setTimeout(() => {
      ensureCards();
      observer = new MutationObserver(ensureCards);
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }, 800);
  };

  if (document.readyState === 'complete') startAfterHydration();
  else window.addEventListener('load', startAfterHydration, { once: true });
  window.addEventListener('pagehide', () => observer?.disconnect(), { once: true });
})();
