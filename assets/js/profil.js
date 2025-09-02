

function getIndexNews() {
	var news = [];
	var wrapper = window.opener ? window.opener.document.getElementById('news-cards-wrapper') : null;
	if (!wrapper) wrapper = document.getElementById('news-cards-wrapper');
	if (wrapper) {
		var cards = wrapper.querySelectorAll('.card.news-card');
		cards.forEach(function(card) {
			var title = card.querySelector('.card-title')?.textContent?.trim() || '';
			var preview = card.querySelector('.card-preview')?.textContent?.trim() || '';
			news.push(title + ' — ' + preview);
		});
	}
	return news;
}

function getIndexSelections() {
	var selections = [];
	var list = window.opener ? window.opener.document.getElementById('selections-list') : null;
	if (!list) list = document.getElementById('selections-list');
	if (list) {
		var cards = list.querySelectorAll('.card');
		cards.forEach(function(card) {
			var title = card.querySelector('.card-title')?.textContent?.trim() || '';
			var desc = card.querySelector('.card-text')?.textContent?.trim() || '';
			selections.push(title + ' — ' + desc);
		});
	}
	return selections;
}

function renderList(listId, items) {
	var ul = document.getElementById(listId);
	ul.innerHTML = '';
	items.forEach(function(item) {
		var li = document.createElement('li');
		li.textContent = item;
		ul.appendChild(li);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	// Language switcher logic
	function setLang(lang) {
		// Sidebar
		document.querySelector('.profile-user-name').textContent = lang === 'uz' ? 'Bardia Adibi' : 'Бардиа Адиби';
		document.querySelector('.profile-session').textContent = lang === 'uz' ? "Sessiya 9 daqiqa 5 soniyadan so'ng tugaydi" : "Сессия закончится через 9 мин 5 сек";
		// Nav
		var navItems = document.querySelectorAll('.profile-nav-item');
		navItems[0].textContent = lang === 'uz' ? 'Profil' : 'Профиль';
		navItems[1].textContent = lang === 'uz' ? 'Arizalarim' : 'Мои заявки';
		navItems[2].textContent = lang === 'uz' ? 'Xabarlar' : 'Сообщения';
		navItems[3].textContent = lang === 'uz' ? 'Tanlovlar' : 'Конкурсы';
		navItems[4].textContent = lang === 'uz' ? 'Yangiliklar' : 'Новости';
		// Profile section
		document.querySelector('#profile-section h2').textContent = lang === 'uz' ? 'Profil' : 'Профиль';
		var labels = document.querySelectorAll('#profile-section label');
		labels[0].textContent = lang === 'uz' ? 'Ism' : 'Имя';
		labels[1].textContent = lang === 'uz' ? 'Familiya' : 'Фамилия';
		labels[2].textContent = lang === 'uz' ? 'Telefon' : 'Телефон';
		labels[3].textContent = 'Email';
		document.querySelector('#profile-section input[type="text"]').value = lang === 'uz' ? 'Bardia' : 'Бардиа';
		document.querySelectorAll('#profile-section input[type="text"]')[1].value = lang === 'uz' ? 'Adibi' : 'Адиби';
		// Tanlovlar section
		document.querySelector('#tanlovlar-section h2').textContent = lang === 'uz' ? 'Tanlovlar' : 'Конкурсы';
		document.querySelector('#tanlovlar-section ul').innerHTML = '';
		var tanlovlar = lang === 'uz' ?
			["Grant 2025", "Yoshlar innovatsiyasi", "Ilmiy tadqiqotlar"] :
			["Грант 2025", "Молодежные инновации", "Научные исследования"];
		tanlovlar.forEach(function(item) {
			var li = document.createElement('li');
			li.textContent = item;
			document.querySelector('#tanlovlar-section ul').appendChild(li);
		});
		// Yangiliklar section
		document.querySelector('#yangiliklar-section h2').textContent = lang === 'uz' ? 'Yangiliklar' : 'Новости';
		document.querySelector('#yangiliklar-section ul').innerHTML = '';
		var yangiliklar = lang === 'uz' ?
			["Yangi grantlar e’lon qilindi", "Tanlov natijalari", "Yangi platforma ishga tushdi"] :
			["Новые гранты объявлены", "Результаты конкурсов", "Запущена новая платформа"];
		yangiliklar.forEach(function(item) {
			var li = document.createElement('li');
			li.textContent = item;
			document.querySelector('#yangiliklar-section ul').appendChild(li);
		});
		// Arizalar section
		document.querySelector('#arizalar-section h2').textContent = lang === 'uz' ? 'Arizalarim' : 'Мои заявки';
		document.querySelector('#arizalar-section p').textContent = lang === 'uz' ? "Arizalar ro'yxati va holati." : "Список заявок и их статус.";
		// Xabarlar section
		document.querySelector('#xabarlar-section h2').textContent = lang === 'uz' ? 'Xabarlar' : 'Сообщения';
		document.querySelector('#xabarlar-section p').textContent = lang === 'uz' ? "Xabarlar va bildirishnomalar." : "Сообщения и уведомления.";
		// Logout button
		document.getElementById('logout-btn').textContent = lang === 'uz' ? 'Chiqish' : 'Выйти';
		// HTML lang attribute
		document.documentElement.lang = lang;
		// Select value sync
		var select = document.getElementById('lang-mobile');
		if(select) select.value = lang;
	}

	// Event listeners for language switcher
	var select = document.getElementById('lang-mobile');
	if(select) {
		select.addEventListener('change', function() {
			setLang(this.value);
		});
		setLang(select.value);
	}
	// If you add desktop buttons, add listeners here
	var btnUz = document.getElementById('lang-uz');
	var btnRu = document.getElementById('lang-ru');
	if(btnUz) btnUz.addEventListener('click', function(){ setLang('uz'); });
	if(btnRu) btnRu.addEventListener('click', function(){ setLang('ru'); });
	// Yangiliklar va tanlovlarni index.html-dan olib kelish
	var yangiliklar = getIndexNews();
	var tanlovlar = getIndexSelections();
	renderList('profile-yangiliklar-list', yangiliklar);
	renderList('profile-tanlovlar-list', tanlovlar);
});
const fileInput = document.getElementById('ariza-file');
const fileRemoveBtn = document.getElementById('ariza-file-remove');
const uzatishBtn = document.querySelector('.ariza-upload-row .btn.btn-primary');
const arizaSuccessMsg = document.getElementById('ariza-success-msg');
if(fileInput && fileRemoveBtn) {
	fileInput.addEventListener('change', function(e) {
		const file = e.target.files[0];
		if (file && file.size > 20 * 1024 * 1024) {
			alert('Fayl hajmi 20 MB dan kichik bo\'lishi kerak!');
			e.target.value = '';
			fileRemoveBtn.style.display = 'none';
		} else if (file) {
			fileRemoveBtn.style.display = 'inline-block';
		} else {
			fileRemoveBtn.style.display = 'none';
		}
	});
	fileRemoveBtn.addEventListener('click', function() {
		fileInput.value = '';
		fileRemoveBtn.style.display = 'none';
	});
}

// Faylni backendga yuborish (AJAX, Django uchun)
if (uzatishBtn && fileInput) {
	uzatishBtn.addEventListener('click', function() {
		if (!fileInput.files.length) {
			alert('Fayl tanlanmagan!');
			return;
		}
		var formData = new FormData();
		formData.append('file', fileInput.files[0]);
		fetch('/upload-ariza/', {
			method: 'POST',
			body: formData,
			headers: {
				'X-CSRFToken': getCookie('csrftoken')
			}
		})
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				fileInput.value = '';
				fileRemoveBtn.style.display = 'none';
				if (arizaSuccessMsg) {
					arizaSuccessMsg.style.display = 'inline-block';
					setTimeout(function() {
						arizaSuccessMsg.style.display = 'none';
					}, 2500);
				}
			} else {
				alert('Xatolik: ' + (data.error || 'Yuborishda xatolik!'));
			}
		})
		.catch(() => {
			alert('Serverga ulanishda xatolik!');
		});
	});
}

// CSRF token olish uchun yordamchi funksiya
function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
	// Header controls expand/collapse logic
					const collapsed = document.getElementById('header-controls-collapsed');
					const expanded = document.getElementById('header-controls-expanded');
					const toggleBtn = document.getElementById('header-controls-toggle');
						toggleBtn.addEventListener('click', function(e) {
							collapsed.style.display = 'none';
							expanded.style.display = 'block';
							e.stopPropagation();
						});
						document.addEventListener('click', function(e) {
							if (expanded.style.display === 'block') {
								// Only close if click is outside the expanded panel and toggle button
								if (!expanded.contains(e.target) && e.target !== toggleBtn) {
									expanded.style.display = 'none';
									collapsed.style.display = 'block';
								}
							}
						});

document.querySelectorAll('.profile-nav-item').forEach(function(item) {
	item.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelectorAll('.profile-nav-item').forEach(function(nav) {
			nav.classList.remove('active');
		});
		item.classList.add('active');
		document.querySelectorAll('.profile-section').forEach(function(section) {
			section.style.display = 'none';
		});
		var sectionId = item.getAttribute('data-section') + '-section';
		var section = document.getElementById(sectionId);
		if(section) section.style.display = 'block';
	});
});

document.querySelectorAll('.profile-nav-item').forEach(function(item) {
	item.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelectorAll('.profile-nav-item').forEach(function(nav) {
			nav.classList.remove('active');
		});
		item.classList.add('active');
		document.querySelectorAll('.profile-section').forEach(function(section) {
			section.style.display = 'none';
		});
		var sectionId = item.getAttribute('data-section') + '-section';
		var section = document.getElementById(sectionId);
		if(section) section.style.display = 'block';
	});
});
document.querySelectorAll('.profile-nav-item').forEach(function(item) {
	item.addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelectorAll('.profile-nav-item').forEach(function(nav) {
			nav.classList.remove('active');
		});
		item.classList.add('active');
		document.querySelectorAll('.profile-section').forEach(function(section) {
			section.style.display = 'none';
		});
		var sectionId = item.getAttribute('data-section') + '-section';
		var section = document.getElementById(sectionId);
		if(section) section.style.display = 'block';
	});
});

// Demo: index.html-dan tanlovlar va yangiliklarni localStorage orqali uzatish
function renderList(listId, items) {
	var ul = document.getElementById(listId);
	ul.innerHTML = '';
	items.forEach(function(item) {
		var li = document.createElement('li');
		li.textContent = item;
		ul.appendChild(li);
	});
}

// Tanlovlar va yangiliklar demo ma'lumotlari (real loyihada backenddan keladi)
var tanlovlar = JSON.parse(localStorage.getItem('tanlovlar') || '["Grant 2025", "Yoshlar innovatsiyasi", "Ilmiy tadqiqotlar"]');
var yangiliklar = JSON.parse(localStorage.getItem('yangiliklar') || '["Yangi grantlar e’lon qilindi", "Tanlov natijalari", "Yangi platforma ishga tushdi"]');
renderList('profile-tanlovlar-list', tanlovlar);
renderList('profile-yangiliklar-list', yangiliklar);