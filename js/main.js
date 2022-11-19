import App from './App.js';

const root = document.getElementById('app');
const app = new App(root);

const editor = Jodit.make('#editor', {
	height: 500,
	spellcheck: true,
	showCharsCounter: false,
	showXPathInStatusbar: false,
	askBeforePasteHTML: false,
	askBeforePasteFromWord: false,
	disablePlugins: 'about',
	toolbarInlineForSelection: true,
	showPlaceholder: false,
	buttons:
		'bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,superscript,subscript,file,image,video,spellcheck,selectall,hr,table,link',
});
editor.value = '<p>start</p>';

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

colorPicker.forEach((element) => {
	addEventListener('click', () => {
		console.log('hey');
	});
});
