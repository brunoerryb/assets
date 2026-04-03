// Sobreiro Residences - main.js
// Premium animations: GSAP + ScrollTrigger + Lenis

(function() {
  'use strict';

  // ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  // Smooth dot follow
  function animateDot() {
    dotX += (mouseX - dotX) * 0.12;
    dotY += (mouseY - dotY) * 0.12;
    if (cursorDot) {
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
    }
    requestAnimationFrame(animateDot);
  }
  animateDot();

  // Cursor hover state
  document.querySelectorAll('a, button, .img-wrapper, .apt-feature').forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
  });

  // ─── NAVIGATION ──────────────────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  function updateNav() {
    const scrolled = window.scrollY > 60;
    if (nav) nav.classList.toggle('scrolled', scrolled);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── LENIS SMOOTH SCROLL ─────────────────────────────────────────────────────
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ─── GSAP SETUP ──────────────────────────────────────────────────────────────
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded, falling back to CSS animations');
    // Fallback: show all elements
    document.querySelectorAll('.reveal-fade,.reveal-img').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Connect Lenis to ScrollTrigger
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ─── HERO ENTRANCE ───────────────────────────────────────────────────────────
  const heroContent = document.querySelector('.hero-content');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to(heroContent, {
      opacity: 1,
      duration: 0.1,
      delay: 0.2
    })
    .from('.hero-logo', {
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out'
    }, 0.3)
    .from('.hero-sub', {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, 0.9)
    .to(scrollIndicator, {
      opacity: 1,
      duration: 0.8
    }, 1.4);

  // Subtle hero background pan
  gsap.to('.hero-bg', {
    backgroundPositionX: '30px',
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  });

  // ─── TITLE REVEAL (word by word) ─────────────────────────────────────────────
  function setupTitleReveal(el) {
    const text = el.textContent.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w =>
      `<span class="word-wrap" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;">${w}&nbsp;</span></span>`
    ).join('');

    gsap.from(el.querySelectorAll('.word'), {
      y: '110%',
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  document.querySelectorAll('.reveal-title').forEach(setupTitleReveal);

  // ─── FADE UP ANIMATIONS ──────────────────────────────────────────────────────
  document.querySelectorAll('.reveal-fade').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── IMAGE REVEAL (clip-path) ────────────────────────────────────────────────
  document.querySelectorAll('.reveal-img').forEach(el => {
    const placeholder = el.querySelector('.img-placeholder');
    if (!placeholder) return;

    gsap.fromTo(placeholder,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // ─── PARALLAX IMAGES ─────────────────────────────────────────────────────────
  document.querySelectorAll('.parallax-section').forEach(section => {
    const img = section.querySelector('.parallax-img');
    if (!img) return;

    gsap.to(img, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Parallax on full image sections
  gsap.utils.toArray('.section-full').forEach(section => {
    const img = section.querySelector('.img-placeholder');
    if (!img) return;
    gsap.to(img, {
      y: '-8%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  });

  // ─── NAV ACTIVE STATE ─────────────────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-80px 0px -30% 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.style.opacity = item.getAttribute('href') === '#' + id ? '1' : '0.5';
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  // ─── DARK SECTION NAV ────────────────────────────────────────────────────────
  const darkSections = document.querySelectorAll('.section-dark-full, .footer, [style*="background:var(--dark-bg)"]');
  const darkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav && nav.classList.add('dark-nav');
      } else {
        nav && nav.classList.remove('dark-nav');
      }
    });
  }, { threshold: 0.5 });
  darkSections.forEach(s => darkObserver.observe(s));

  // ─── STAGGER ANIMATIONS for POI items ────────────────────────────────────────
  const poiCols = document.querySelectorAll('.poi-col');
  poiCols.forEach(col => {
    const items = col.querySelectorAll('.poi-item');
    gsap.from(items, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: col,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── APT FEATURES STAGGER ────────────────────────────────────────────────────
  const aptFeatures = document.querySelectorAll('.apt-features');
  aptFeatures.forEach(group => {
    const items = group.querySelectorAll('.apt-feature');
    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── MAP SVG DRAW ────────────────────────────────────────────────────────────
  document.querySelectorAll('.map-svg path').forEach(path => {
    const length = path.getTotalLength ? path.getTotalLength() : 200;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── PERSON PHOTO HOVER ──────────────────────────────────────────────────────
  document.querySelectorAll('.person-photo, .arq-person').forEach(el => {
    const photo = el.querySelector('.img-placeholder');
    if (!photo) return;
    el.addEventListener('mouseenter', () => {
      gsap.to(photo, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(photo, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  // ─── BULLET LIST STAGGER ─────────────────────────────────────────────────────
  document.querySelectorAll('.bullet-list').forEach(list => {
    const items = list.querySelectorAll('li');
    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: list,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ─── FOOTER LOGO ENTRANCE ────────────────────────────────────────────────────
  gsap.from('.footer-logo', {
    opacity: 0,
    y: 60,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from(['.footer-sub', '.footer-copy'], {
    opacity: 0,
    y: 20,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 65%',
      toggleActions: 'play none none none'
    }
  });

  // ─── DESTAQUE LABEL ───────────────────────────────────────────────────────────
  gsap.from('.destaque-label', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.destaque-label',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // ─── PLANO HUMANO LOGO ────────────────────────────────────────────────────────
  gsap.from('.plano-humano-logo > *', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.plano-humano-logo',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  console.log('Sobreiro Residences — animations initialized');
})();
