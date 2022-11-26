import App from './App.js';

const root = document.getElementById('app');
const app = new App(root);

const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

const theme = localStorage.getItem('theme');

if (theme) {
	body.classList.add(theme);
}

themeSwitcher.addEventListener('click', () => {
	if (body.classList.contains('dark')) {
		body.classList.replace('dark', 'light');

		themeSwitcher.childNodes[1].src = 'images/moon.png';
		localStorage.setItem('theme', 'light');
	} else {
		body.classList.replace('light', 'dark');
		themeSwitcher.childNodes[1].src = 'images/sun.png';
		localStorage.setItem('theme', 'dark');
	}
});

// TODO: dodaj zmianę koloru tytułu w ramach wybranego motywu
const colorPicker = document.getElementsByClassName('color-picker-button');

// colorPicker.forEach((element) => {
// 	addEventListener('click', () => {
// 		console.log('hey');
// 	});
// });

const notification = document.getElementById('notification');
const audio = document.getElementById('notification-audio');

notification.addEventListener('click', () => {
	audio.play();
});
