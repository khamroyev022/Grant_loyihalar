var lang = "uz";
document.addEventListener('DOMContentLoaded', function() {
  if (window.setLang) window.setLang(lang);
});

window.translations = {
  uz: {
    navHome: "Bosh sahifa",
    navNews: "Yangiliklar",
    navMenu: "Tanlovlar",
    navLogin: "Kirish",
    heroTitle: "Hujjat kiritish uchun kirish qiling",
    heroUpload: "Hujjatni yuklang",
    aboutTitle: "Yangiliklar",
    aboutSubtitle: "So'ngi yangiliklar",
    menuTitle: "Tanlovlar",
    menuSubtitle: "Yangi tanlovlar ro'yxati",
    cardMore: "Batafsil",
    apliCation: "Arizalarim"
  },
  ru: {
    navHome: "Главная страница",
    navNews: "Новости",
    navMenu: "Конкурсы",
    navLogin: "Вход",
    heroTitle: "Войдите для подачи документов",
    heroUpload: "Загрузить документ",
    aboutTitle: "Новости",
    aboutSubtitle: "Последние новости",
    menuTitle: "Конкурсы",
    menuSubtitle: "Список новых конкурсов",
    cardMore: "Подробнее",
    apliCation: "Мои приложения"
  }
};

window.setLang = function(lang) {
  if (!window.translations) return;
  document.querySelectorAll('[data-txt]').forEach(function(el) {
    var key = el.getAttribute('data-txt');
    if (window.translations[lang][key]) {
      el.textContent = window.translations[lang][key];
    }
  });
  // Lang button active
  document.querySelectorAll('.lang-select').forEach(btn => btn.classList.remove('active'));
  var btn = document.querySelector('.lang-select[data-lang="' + lang + '"]');
  if (btn) btn.classList.add('active');
  var select = document.getElementById('lang-mobile');
  if (select) select.value = lang;
};

document.addEventListener('DOMContentLoaded', function() {
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
    });
  });
  window.setLang('uz');
});
