/* customized cursor implementation */

const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

// Cursor ring with inertia effect
function animRing() {
  rx += (mx - rx) * 0.25;
  ry += (my - ry) * 0.25;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animRing);
}
animRing();

// Scales up the cursor on hover over interactive elements
document.querySelectorAll('a, button, .plan, .mod-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animação escalonada para filhos (cards de planos e modalidades)
      const children = entry.target.querySelectorAll('.plan, .mod-card');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
        child.classList.add('reveal', 'visible');
      });
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));