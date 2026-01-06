// Simple interactions: mobile menu, reveal on scroll, typed-like effect, contact form handler
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Reveal on scroll (IntersectionObserver)
  const observerOptions = { threshold: 0.08 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => el.classList.add('visible'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Simple "typing" / rotating roles effect
  const roles = ['Designer', 'Developer', 'Creator', 'Problem-solver'];
  const typeEl = document.getElementById('type');
  let idx = 0, char = 0, deleting = false;
  function tick() {
    if (!typeEl) return;
    const word = roles[idx];
    if (!deleting) {
      typeEl.textContent = word.slice(0, ++char);
      if (char === word.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      typeEl.textContent = word.slice(0, --char);
      if (char === 0) {
        deleting = false;
        idx = (idx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 120);
  }
  tick();

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

// Contact form handler (simple mailto fallback)
function onContactSubmit(e){
  e.preventDefault();
  const form = e.target;
  const name = encodeURIComponent(form.name.value.trim());
  const email = encodeURIComponent(form.email.value.trim());
  const message = encodeURIComponent(form.message.value.trim());

  // Open default mail client (replace with AJAX endpoint for production)
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:you@domain.com?subject=${subject}&body=${body}`;
}