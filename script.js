// Shared navigation and reveal effects for every demo page.
(() => {
  'use strict';
  const root = document.getElementById('spk-site');
  if (!root) return;
  const menu = root.querySelector('#spk-menu');
  const nav = root.querySelector('#spk-mobile-nav');
  const header = root.querySelector('#spk-header');
  root.querySelector('#spk-year').textContent = new Date().getFullYear();
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  const updateHeader = () => header.classList.toggle('stuck', window.scrollY > 80);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  const items = root.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }
})();
