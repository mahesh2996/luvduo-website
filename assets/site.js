// Header shadow on scroll, sticky story, fade-in on scroll, footer year.
// No tracking, no network calls.
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Header gets a hairline + soft shadow once the page scrolls
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var checkHeader = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(checkHeader); }
    }, { passive: true });
    checkHeader();
  }

  // Story: the chapter in focus picks the phone screen
  var stage = document.querySelector('.story-stage');
  if (stage && hasIO) {
    var chapters = document.querySelectorAll('.chapter');
    var wide = window.matchMedia('(min-width: 960px)').matches;
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        chapters.forEach(function (c) { c.classList.toggle('active', c === e.target); });
        stage.setAttribute('data-step', e.target.getAttribute('data-step'));
      });
    }, { rootMargin: wide ? '-45% 0px -45% 0px' : '-64% 0px -28% 0px' });
    chapters.forEach(function (c) { sio.observe(c); });
  }

  // Fade-in on scroll
  var items = document.querySelectorAll('.reveal');
  if (reduce || !hasIO) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
