// Fayl yuklanganda nomini ko'rsatish, 2-fayl yuklashni bloklash, X tugmasi va "Hujjatni uzatish" tugmasi ko'rsatish
document.addEventListener('DOMContentLoaded', function() {
  var fileInput = document.getElementById('hero-file');
  var fileNameSpan = null;
  var fileRemoveBtn = document.getElementById('file-remove-btn');
  var uploadBtn = document.getElementById('upload-btn');
  if (fileInput) {
    // Fayl nomini ko'rsatish uchun span yaratamiz
    fileNameSpan = document.createElement('span');
    fileNameSpan.className = 'file-name-label';
    fileNameSpan.style.cssText = 'display:block;margin-top:8px;font-size:14px;color:#fff;text-align:center;';
    fileInput.parentNode.appendChild(fileNameSpan);

    fileInput.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (file) {
        if (file.size > 20 * 1024 * 1024) {
          alert('Fayl hajmi 20 MBdan ko\'p!');
          fileInput.value = '';
          fileNameSpan.textContent = '';
          fileInput.disabled = false;
          if (fileRemoveBtn) fileRemoveBtn.style.display = 'none';
          if (uploadBtn) uploadBtn.style.display = 'none';
          return;
        }
        fileNameSpan.textContent = 'Yuklangan fayl: ' + file.name;
        fileInput.disabled = true;
        if (fileRemoveBtn) fileRemoveBtn.style.display = 'flex';
        if (uploadBtn) uploadBtn.style.display = 'inline-block';
      } else {
        fileNameSpan.textContent = '';
        fileInput.disabled = false;
        if (fileRemoveBtn) fileRemoveBtn.style.display = 'none';
        if (uploadBtn) uploadBtn.style.display = 'none';
      }
    });

    if (fileRemoveBtn) {
      fileRemoveBtn.addEventListener('click', function() {
        fileInput.value = '';
        fileNameSpan.textContent = '';
        fileInput.disabled = false;
        fileRemoveBtn.style.display = 'none';
        if (uploadBtn) uploadBtn.style.display = 'none';
      });
    }
  }
});
// Fayl hajmi cheklovi (20MB) va xabar chiqarish
document.addEventListener('DOMContentLoaded', function() {
  var fileInput = document.getElementById('hero-file');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (file && file.size > 20 * 1024 * 1024) { // 20MB
        alert('Fayl hajmi 20 MBdan ko\'p!');
        fileInput.value = '';
      }
    });
  }
});

(function() {
  // Tilga mos matnlar
  window.setLang = function(lang) {
    if (!window.translations) return;
    var el;
    el = document.getElementById('current-lang');
    if (el) el.textContent = lang === 'uz' ? "O'zbek" : "Русский";
    el = document.querySelector('[data-txt="navHome"]');
    if (el) el.textContent = window.translations[lang].navHome;
    el = document.querySelector('[data-txt="navNews"]');
    if (el) el.textContent = window.translations[lang].navNews;
    el = document.querySelector('[data-txt="navMenu"]');
    if (el) el.textContent = window.translations[lang].navMenu;
    el = document.querySelector('[data-txt="navLogin"]');
    if (el) el.textContent = window.translations[lang].navLogin;
    el = document.querySelector('[data-txt="heroTitle"]');
    if (el) el.textContent = window.translations[lang].heroTitle;
    el = document.querySelector('[data-txt="heroUpload"]');
    if (el) el.textContent = window.translations[lang].heroUpload;
    el = document.querySelector('[data-txt="aboutTitle"]');
    if (el) el.textContent = window.translations[lang].aboutTitle;
    el = document.querySelector('[data-txt="aboutSubtitle"]');
    if (el) el.textContent = window.translations[lang].aboutSubtitle;
    el = document.querySelector('[data-txt="menuTitle"]');
    if (el) el.textContent = window.translations[lang].menuTitle;
    el = document.querySelector('[data-txt="menuSubtitle"]');
    if (el) el.textContent = window.translations[lang].menuSubtitle;
    document.querySelectorAll('[data-txt="cardMore"]').forEach(btn => {
      if (btn) btn.textContent = window.translations[lang].cardMore;
    });
  };

  // Tilni almashtirish dropdown
  window.addEventListener('DOMContentLoaded', function() {
    // Mobile dropdown til almashtirgich
    var langMobile = document.getElementById('lang-mobile');
    if (langMobile) {
      langMobile.addEventListener('change', function() {
        window.setLang(this.value);
      });
    }
    document.querySelectorAll('.lang-select').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang');
        window.setLang(lang);
        document.querySelectorAll('.lang-select').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      });
    });
    // Default Uzbek
    window.setLang('uz');
    document.getElementById('lang-uz')?.classList.add('active');
  });
  // Expand/collapse news card on click
  window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.news-card').forEach(function(card) {
      card.addEventListener('click', function(e) {
        var title = card.querySelector('.card-title-full')?.textContent || '';
        var img = card.querySelector('img')?.getAttribute('src') || '';
        var fullText = card.querySelector('.card-full')?.textContent || '';
        var modalBody = document.getElementById('cardDetailModalBody');
        var modalTitle = document.getElementById('cardDetailModalLabel');
        if (modalBody && modalTitle) {
          modalTitle.textContent = title;
          modalBody.innerHTML = '<img src="' + img + '" alt="' + title + '" style="width:100%;max-height:220px;object-fit:cover;border-radius:8px;margin-bottom:16px;">' +
            '<p style="font-size:16px;color:#333;">' + fullText + '</p>';
          var modal = new bootstrap.Modal(document.getElementById('cardDetailModal'));
          modal.show();
        }
      });
    });
  });
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (document.querySelector('.about-swiper')) {
        new Swiper('.about-swiper', {
          slidesPerView: 4,
          spaceBetween: 24,
          loop: true,
          speed: 700,
          effect: 'slide',
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 10 },
            576: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 18 },
            992: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 }
          }
        });
      }
    }, 300);
  });
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();