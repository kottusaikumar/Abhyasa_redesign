/*
 * Page entrances are disabled to keep direct loads, refreshes, route changes,
 * and browser history stable. Intentional pointer interactions live in motion.css.
 */

// A same-tab page link marks the next homepage load as internal navigation.
// Fresh tabs and explicit reloads still receive the intro.
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey
      || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href]');
  if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const destination = new URL(link.href, location.href);
  if (destination.origin !== location.origin
      || (destination.pathname === location.pathname && destination.search === location.search)) return;
  try {
    sessionStorage.setItem('abhyasa-internal-navigation', JSON.stringify({
      destination: destination.pathname,
      time: Date.now()
    }));
  } catch (_) { /* The intro still works when session storage is disabled. */ }
}, { capture: true });
