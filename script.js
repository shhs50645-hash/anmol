const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const revealEls = document.querySelectorAll('.reveal');
const magneticEls = document.querySelectorAll('.magnetic');
const yearEl = document.getElementById('year');

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.14 }
);

revealEls.forEach((el) => observer.observe(el));

magneticEls.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0,0)';
  });
});

yearEl.textContent = new Date().getFullYear();
