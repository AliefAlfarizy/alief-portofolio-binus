/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ══════════════════════════════════════════
   STICKY HEADER
══════════════════════════════════════════ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('stuck', window.scrollY > 40);
});

/* ══════════════════════════════════════════
   BURGER MENU
══════════════════════════════════════════ */
const burger  = document.getElementById('burger');
const navList = document.getElementById('navList');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navList.classList.toggle('open');
});

navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
  });
});

/* ══════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});

/* ══════════════════════════════════════════
   REVEAL ON SCROLL
══════════════════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id], .section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('--active'));
      const match = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (match) match.classList.add('--active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => activeObs.observe(s));

// Style active nav
const style = document.createElement('style');
style.textContent = '.nav__link.--active { color: var(--white) !important; }';
document.head.appendChild(style);

/* ══════════════════════════════════════════
   SKILL CARDS — stagger on first visible
══════════════════════════════════════════ */
const skillCards = document.querySelectorAll('.skill, .ccard');
const staggerObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.style.getPropertyValue('--i') || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 80);
      staggerObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

skillCards.forEach(c => {
  c.classList.add('reveal');
  staggerObs.observe(c);
});
