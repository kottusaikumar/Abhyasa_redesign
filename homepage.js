(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !event.defaultPrevented && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') && !event.target.closest('.site-header')) closeNav();
    });
    window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
      if (event.matches) closeNav();
    });
  }

  const enrollmentForm = document.getElementById('enrollment-form');
  const enrollmentStatus = document.getElementById('form-status');
  if (enrollmentForm && enrollmentStatus) {
    enrollmentForm.addEventListener('submit', event => {
      event.preventDefault();

      const values = new FormData(enrollmentForm);
      const course = String(values.get('course') || '').trim();
      const subject = `Enrollment Request${course ? ` - ${course}` : ''}`;
      const body = [
        'Enrollment request',
        '',
        `Name: ${String(values.get('name') || '').trim()}`,
        `Phone: ${String(values.get('phone') || '').trim()}`,
        `Email: ${String(values.get('email') || '').trim()}`,
        `Highest Qualification: ${String(values.get('qualification') || '').trim()}`,
        `Year of Passed Out: ${String(values.get('passedOut') || '').trim()}`,
        `Interested Course: ${course}`
      ].join('\r\n');
      const encodeMailtoValue = value => encodeURIComponent(value).replace(/[!'()*]/g, character => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
      const mailto = `mailto:abhyasasemitech@gmail.com?subject=${encodeMailtoValue(subject)}&body=${encodeMailtoValue(body)}`;

      enrollmentStatus.textContent = 'Opening an email draft. Review it and press Send in your email app. If no draft opens, email abhyasasemitech@gmail.com directly. The website cannot confirm delivery.';
      window.location.href = mailto;
    });
  }

  // Pointer hover feedback is provided by the shared motion.css stylesheet.
})();
