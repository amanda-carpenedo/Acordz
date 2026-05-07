(() => {
  const stage    = document.getElementById('stage');
  const path     = document.getElementById('cable-path');
  const corePath = document.getElementById('cable-core');
  const pianoImg = document.getElementById('piano-img');
  const cableSvg = document.getElementById('cable-svg');

  function syncSvgHeight() {
    cableSvg.setAttribute('viewBox', '0 0 1000 4400');
    cableSvg.style.height = stage.offsetHeight + 'px';
  }

  const len = path.getTotalLength();
  path.style.strokeDasharray     = len;
  path.style.strokeDashoffset    = len;
  corePath.style.strokeDasharray  = len;
  corePath.style.strokeDashoffset = len;

  pianoImg.style.opacity = 0;

  function update() {
    const rect        = stage.getBoundingClientRect();
    const vh          = window.innerHeight;
    const stageHeight = rect.height;

    const scrolled = -rect.top + vh * 0.3;
    const total    = stageHeight - vh * 0.3;
    const p        = Math.max(0, Math.min(1, scrolled / total));

    path.style.strokeDashoffset     = len * (1 - p);
    corePath.style.strokeDashoffset = len * (1 - p);

    if (p > 0.96) {
      const t = (p - 0.96) / 0.04;
      pianoImg.style.opacity   = t;
      pianoImg.style.transform = `translateX(-50%) scale(${0.6 + 0.4 * t})`;
    } else {
      pianoImg.style.opacity   = 0;
      pianoImg.style.transform = 'translateX(-50%) scale(0.6)';
    }

    const docH    = document.documentElement.scrollHeight - window.innerHeight;
    const overall = Math.max(0, Math.min(1, window.scrollY / docH));

    const bar = document.querySelector('.progress .bar i');
    if (bar) bar.style.width = (overall * 100) + '%';

    const pct = document.querySelector('.progress .pct');
    if (pct) pct.textContent = Math.round(overall * 100) + '%';

    const stops  = document.querySelectorAll('.stop');
    let active   = 0;
    stops.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.6 && r.bottom > vh * 0.4) active = i + 1;
    });

    const counter = document.querySelector('.progress .counter');
    if (counter) counter.textContent = String(active).padStart(2, '0') + ' / 04';
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.25 });
  document.querySelectorAll('.stop').forEach(s => io.observe(s));

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { syncSvgHeight(); update(); });

  syncSvgHeight();
  update();
})();
