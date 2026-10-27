// Stars, hero parallax, sticky story, card spotlight, fade-in on scroll, footer year.
// No tracking, no network calls.
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Twinkling star field for .night sections
  document.querySelectorAll('.stars').forEach(function (box) {
    var n = parseInt(box.getAttribute('data-count'), 10) || 60;
    for (var i = 0; i < n; i++) {
      var s = document.createElement('i');
      var size = Math.random() < 0.85 ? 1.5 : 2.5;
      s.style.width = s.style.height = size + 'px';
      s.style.left = (Math.random() * 100).toFixed(2) + '%';
      s.style.top = (Math.random() * 100).toFixed(2) + '%';
      s.style.setProperty('--t', (2 + Math.random() * 4).toFixed(1) + 's');
      s.style.setProperty('--d', (-Math.random() * 6).toFixed(1) + 's');
      box.appendChild(s);
    }
  });

  // Hero: copy drifts up and fades, phone eases forward as you scroll away
  var hero = document.querySelector('.hero');
  if (hero && !reduce) {
    var ticking = false;
    var update = function () {
      var p = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.9), 0), 1);
      hero.style.setProperty('--hs', p.toFixed(3));
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
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

  // Feature cards: soft spotlight follows the pointer
  document.querySelectorAll('.fcard').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

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
