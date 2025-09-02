
    var lang = "{{ lang|default:'uz' }}";
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
      }
    };
