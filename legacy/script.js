/* ======================================================
   ======= Love Loop JS (navigation + animations) =======
   - Simple SPA navigation (data-next / data-prev)
   - Typewriter for page2
   - Heart particle generation
   - Progress fill update (represents Day 1→160)
   - Accessibility: focus management on page change
   ====================================================== */

(() => {

  /* ===== Page Setup (Now supports 20 pages) ===== */
  const pages = Array.from({ length: 20 }, (_, i) =>
    document.getElementById('page' + (i + 1))
  );
  let current = 1;

  /* ===== Page Display & Progress ===== */
  function showPage(n) {
    pages.forEach((p, idx) => {
      const id = idx + 1;
      if (id === n) {
        p.classList.remove('hidden');
        p.classList.add('visible');

        // focus heading for accessibility
        const h = p.querySelector('h1');
        if (h) h.setAttribute('tabindex', '-1');
        if (h) h.focus();
      } else {
        p.classList.add('hidden');
        p.classList.remove('visible');
      }
    });

    current = n;

    // progress fill: proportional to total pages
    const fill = document.getElementById('progressBar');
    const pct = Math.round((n - 1) / (pages.length - 1) * 100);
    if (fill) fill.style.width = Math.max(5, pct) + '%';
  }

  /* ===== Button Navigation ===== */
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = Number(btn.getAttribute('data-next'));
      const next = ((target - 1 + pages.length) % pages.length) + 1;
      showPage(next);
      showSidePhoto(next);
    });
  });

  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = Number(btn.getAttribute('data-prev'));
      showPage(prev);
    });
  });

  document.querySelectorAll('[data-skip]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Example skip: jump to page 3
      showPage(3);
    });
  });

  // Initialize first page
  showPage(1);



  /* ===== Sakura Petal Generator ===== */
  const petalsLayer = document.getElementById('petalsContainer');

  function spawnPetal() {
    if (!petalsLayer) return;
    const el = document.createElement('div');
    el.className = 'p';

    // Random position
    el.style.left = (Math.random() * 100) + '%';

    // SVG Petal Shape
    el.innerHTML = `
      <svg viewBox="0 0 30 30" style="width:100%;height:100%;">
        <path d="M15,0 C20,10 30,15 15,30 C0,15 10,10 15,0 Z" />
      </svg>
    `;

    // Varying size
    const size = 15 + Math.random() * 20;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    petalsLayer.appendChild(el);

    // Animate
    const duration = 5000 + Math.random() * 5000; // Slow fall
    const wander = 50 + Math.random() * 100; // Left/Right drift

    const animation = el.animate(
      [
        { transform: `translate(0, -50px) rotate(0deg)`, opacity: 0 },
        { transform: `translate(${wander / 2}px, 40vh) rotate(180deg)`, opacity: 0.8, offset: 0.4 },
        { transform: `translate(${wander}px, 110vh) rotate(360deg)`, opacity: 0 }
      ],
      { duration: duration, easing: 'linear' }
    );

    animation.onfinish = () => el.remove();
  }

  // Spawn petals periodically
  setInterval(() => {
    spawnPetal();
  }, 400); // 1 petal every 400ms for gentle breeze

  /* ===== Main Heart Pulse Animation ===== */
  const mainHeart = document.getElementById('mainHeart');
  mainHeart.addEventListener('mouseenter', () => mainHeart.classList.add('pulse'));
  mainHeart.addEventListener('mouseleave', () => mainHeart.classList.remove('pulse'));

  /* ===== Keyboard Navigation (← → keys) ===== */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      showPage((current % pages.length) + 1);
    }
    if (e.key === 'ArrowLeft') {
      showPage(((current - 2 + pages.length) % pages.length) + 1);
    }
  });

})();



// for side photo display

const photoContainer = document.getElementById('photoContainer');
const sidePhoto = document.getElementById('sidePhoto');

// Add your photo list (one per page if you like)
const photoList = [
  'images/1.jpeg',
  'images/2.jpeg',
  'images/3.jpeg',
  'images/4.jpeg',
  'images/5.jpeg',
  'images/6.jpeg',
  'images/7.jpeg',
  'images/8.jpeg',
  'images/9.jpeg',
  'images/10.jpeg',
  'images/11.jpeg',
  'images/12.jpeg',
  'images/13.jpeg',
  'images/14.jpeg',
  'images/15.jpeg',
  'images/16.jpeg',
  'images/17.jpeg',
  'images/18.jpeg',
  'images/19.jpeg',
  'images/20.jpeg',
  // ...add up to 20 if you have them
];

function showSidePhoto(pageNum) {
  if (!sidePhoto) return;
  const src = photoList[(pageNum - 1) % photoList.length];
  sidePhoto.src = src;
  photoContainer.classList.add('show');

  // Hide after 3 seconds
  setTimeout(() => {
    photoContainer.classList.remove('show');
  }, 3000);
}
