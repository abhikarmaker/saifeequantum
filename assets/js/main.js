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

  // Contact form — sends the enquiry (to info@saifeequantum.com) and an
  // acknowledgment (to the visitor) via EmailJS, using the Outlook/Office 365
  // mailbox connected in the EmailJS dashboard. Fill in the four constants
  // below once that's set up: https://dashboard.emailjs.com
  //   1. Email Services → Add New → Outlook/Office 365 → connect info@saifeequantum.com
  //   2. Email Templates → create a "Notify" template (sent to info@) and an
  //      "Acknowledge" template (sent to {{email}}) — see the drafts delivered
  //      alongside this change for the copy to paste in.
  //   3. Account → General → copy the Public Key.
  // Until these are filled in, the form automatically falls back to the
  // previous mailto: behaviour, so nothing breaks in the meantime.
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_NOTIFY = 'YOUR_NOTIFY_TEMPLATE_ID';
  const EMAILJS_TEMPLATE_ACK = 'YOUR_ACK_TEMPLATE_ID';
  const emailjsConfigured = ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, EMAILJS_TEMPLATE_ACK]
    .some(v => v.startsWith('YOUR_'));
  if (emailjsConfigured && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form = document.querySelector('form[data-mailto]');
  if (form) {
    const statusEl = form.querySelector('[data-form-status]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.innerHTML : '';

    const showStatus = (kind, text) => {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.className = 'form__status form__status--' + kind;
      statusEl.hidden = false;
    };

    // mailto: has no way to detect success (silently does nothing if no
    // desktop mail app is configured, which is common with webmail-only
    // users), so we always reveal a copy-paste fallback alongside it.
    const sendViaMailto = (name, subject, bodyLines) => {
      const mailto = `mailto:info@saifeequantum.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
      window.location.href = mailto;

      const fallback = form.querySelector('[data-mailto-fallback]');
      const textarea = form.querySelector('[data-mailto-body]');
      if (fallback && textarea) {
        textarea.value = `To: info@saifeequantum.com\nSubject: ${subject}\n\n${bodyLines}`;
        fallback.hidden = false;
      }
    };

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

      if (!emailjsConfigured || !window.emailjs) {
        sendViaMailto(name, subject, bodyLines);
        return;
      }

      const params = { name, company, email, phone, need, sector, msg, to_email: 'info@saifeequantum.com' };
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }

      Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_NOTIFY, params),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ACK, params),
      ]).then(() => {
        showStatus('ok', `Thanks${name ? ', ' + name : ''} — we've received your enquiry and sent a confirmation to ${email}. We usually respond within 24 business hours.`);
        form.reset();
      }).catch(() => {
        showStatus('err', "We couldn't send that automatically, so we've opened your email client instead — or use the copy-paste option below.");
        sendViaMailto(name, subject, bodyLines);
      }).finally(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitLabel; }
      });
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
  document.querySelectorAll('.hex, .team-card, .cap').forEach(el => {
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
