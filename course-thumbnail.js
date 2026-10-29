(() => {
  'use strict';

  const section = document.querySelector('#courses');
  const monitor = section?.querySelector('[data-course-rotation]');
  const details = section?.querySelector('[data-course-details]');
  if (!section || !monitor || !details) return;

  const slides = [...monitor.querySelectorAll('[data-course-slide]')];
  const position = details.querySelector('[data-course-position]');
  const title = details.querySelector('[data-course-title]');
  const description = details.querySelector('[data-course-description]');
  const enroll = details.querySelector('[data-course-enroll]');
  const more = details.querySelector('[data-course-more]');

  const courses = [
    {
      name: 'VLSI Physical Design',
      description: 'Study the complete physical design journey, from design preparation through implementation and sign-off.',
      enrollment: 'https://abhyasa.graphy.com/courses/VLSI--Physical-Design--66e40e7870e1ab34d9f9933d-66e40e7870e1ab34d9f9933d',
      details: './courses/course1.html'
    },
    {
      name: 'VLSI Verification Design',
      description: 'Gain in-depth knowledge in design and verification methodologies with practical implementation.',
      enrollment: 'https://abhyasa.graphy.com/courses/VLSI--Design--Verification--66e2b24053750d2d5bf2d01d-66e2b24053750d2d5bf2d01d',
      details: './courses/course2.html'
    }
  ];

  if (slides.length !== courses.length) return;

  let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  let timer = 0;
  let inView = false;
  let focused = false;
  let stopped = false;
  const intervalMs = 3500;

  const stopTimer = () => {
    window.clearTimeout(timer);
    timer = 0;
  };

  const canRotate = () => inView && !focused && !document.hidden && !stopped;

  const schedule = () => {
    stopTimer();
    if (!canRotate()) return;
    timer = window.setTimeout(() => {
      render(activeIndex + 1);
      schedule();
    }, intervalMs);
  };

  const render = index => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active) slide.removeAttribute('inert');
      else slide.setAttribute('inert', '');
    });

    const course = courses[activeIndex];
    details.classList.add('is-changing');
    window.setTimeout(() => {
      if (stopped) return;
      position.textContent = `COURSE ${activeIndex + 1} OF ${courses.length}`;
      title.textContent = course.name;
      description.textContent = course.description;
      enroll.href = course.enrollment;
      more.href = course.details;
      details.classList.remove('is-changing');
    }, 150);
  };

  section.addEventListener('focusin', event => {
    if (details.contains(event.target) && event.target.matches('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
      focused = true;
      stopTimer();
    }
  });
  section.addEventListener('focusout', event => {
    const nextTarget = event.relatedTarget;
    const remainsOnCourseAction = nextTarget && details.contains(nextTarget)
      && nextTarget.matches('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!remainsOnCourseAction) { focused = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('pagehide', () => { stopped = true; stopTimer(); });
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    stopped = false;
    const bounds = monitor.getBoundingClientRect();
    inView = bounds.bottom > 0 && bounds.top < window.innerHeight;
    schedule();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      schedule();
    }, { threshold: 0.15 });
    observer.observe(monitor);
  } else {
    inView = true;
    schedule();
  }
})();
