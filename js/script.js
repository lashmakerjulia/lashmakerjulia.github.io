// =========================================================
// ЮЛІЯ LASHMAKER — інтерактивність сайту
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header on scroll ---------- */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const openNav = () => { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeNav = () => { mobileNav.classList.remove('open'); document.body.style.overflow = ''; };
  burger?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .lash-divider');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- lightbox gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryImages = Array.from(document.querySelectorAll('[data-gallery-src]')).map(el => el.getAttribute('data-gallery-src'));
  let currentIndex = 0;

  const showImage = (i) => {
    currentIndex = (i + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  };

  document.querySelectorAll('[data-gallery-src]').forEach((el, i) => {
    el.addEventListener('click', () => {
      showImage(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.getElementById('lightboxPrev')?.addEventListener('click', () => showImage(currentIndex - 1));
  document.getElementById('lightboxNext')?.addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  /* ---------- year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
