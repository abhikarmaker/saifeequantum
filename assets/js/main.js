/* Saifee Quantum — interactions */
(function () {
  // Sticky nav state
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  // Count-up stats
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    let start = null;
    const dec = (target % 1 !== 0) ? 1 : 0;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      el.textContent = (target * easeOut(p)).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCount(e.target); countIO.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => countIO.observe(el));

  // Contact form — opens the visitor's email client with a pre-filled message.
  // mailto: has no way to detect success (silently does nothing if no desktop
  // mail app is configured, which is common with webmail-only users), so we
  // always reveal a copy-paste fallback alongside attempting it.
  const form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (id) => (form.querySelector('#' + id) || {}).value || '';
      const name = val('name'), company = val('company'), email = val('email'), phone = val('phone');
      const need = val('need'), sector = val('sector'), msg = val('msg');

      const subject = `Export enquiry from ${name || 'website visitor'}`;
      const bodyLines = [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Interested in: ${need}`,
        `Sector: ${sector}`,
        '',
        'Business & target market:',
        msg,
      ].join('\n');

      const mailto = `mailto:info@saifeequantum.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
      window.location.href = mailto;

      const fallback = form.querySelector('[data-mailto-fallback]');
      const textarea = form.querySelector('[data-mailto-body]');
      if (fallback && textarea) {
        textarea.value = `To: info@saifeequantum.com\nSubject: ${subject}\n\n${bodyLines}`;
        fallback.hidden = false;
      }
    });

    const copyBtn = form.querySelector('[data-mailto-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const textarea = form.querySelector('[data-mailto-body]');
        try {
          await navigator.clipboard.writeText(textarea.value);
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'Copied ✓';
          setTimeout(() => { copyBtn.textContent = orig; }, 2000);
        } catch {
          textarea.select();
        }
      });
    }
  }

  // Footer year
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Tap-to-flip for the honeycomb hexes + team cards on touch devices
  // (their flip is otherwise driven by :hover, which touch screens don't have)
  const noHover = window.matchMedia('(hover: none)');
  document.querySelectorAll('.hex, .team-card').forEach(el => {
    el.addEventListener('click', () => {
      if (noHover.matches) el.classList.toggle('is-flipped');
    });
  });

  // Scroll-spy: highlight the nav link for the section in view
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (sections.length && navLinks.length) {
    const spyIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => spyIO.observe(s));
  }
})();
