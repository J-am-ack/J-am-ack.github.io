(function () {
  const nav = document.querySelector('[data-site-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  const backToTop = document.querySelector('[data-back-to-top]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('is-open', !isOpen);
      toggle.querySelector('i').className = !isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  }

  function updateScrollState() {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 16);
    if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 420);
  }

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
