(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var hero = document.querySelector('.hero');
  var topbar = document.querySelector('.topbar');
  var ticking = false;

  function update() {
    ticking = false;
    var h = hero.offsetHeight || 1;
    // reach full background at ~85% of the hero scrolled away
    var p = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)));
    root.style.setProperty('--p', p.toFixed(3));
    topbar.dataset.active = p > 0.9 ? 'true' : 'false';
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // reveal cards as they enter the viewport
  var cards = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(function (c) { io.observe(c); });
  } else {
    cards.forEach(function (c) { c.classList.add('is-visible'); });
  }

  // some browsers block autoplay; retry on first interaction
  var video = document.querySelector('.hero__video');
  if (video && video.paused) {
    var kick = function () { video.play().catch(function () {}); };
    window.addEventListener('pointerdown', kick, { once: true });
  }
})();
