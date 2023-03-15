
let dataGlobal;
let currentData = [];

const getData = async () => {
	const response = await fetch("../../assets/json/pets.json");
	const data = await response.json();
	dataGlobal = data;
	return data;
};


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
				
const getRandomSlides = () => {
	let elements = [];
	const mq = window.innerWidth;
	if (mq > 1279) { var n = 8
	} else if (1280 > mq && mq > 767){ var n = 6
	} else { var n = 3}
	while (elements.length < n) {
		const index = randomInt(0, dataGlobal.length - 1);
		const element = dataGlobal[index];
		if(
			!elements.find(el => el[1] === element) &&
			!currentData.find(el => el[1] === element)
		){
				elements.push([index,element]);
			} 
	}
	currentData = elements;
	return elements;
}

const generateSlide = (index,item) => {
		const name = item.name;
		const imgPhoto = item.img;

		return `
		<article class="slider__item" data-index="${index}" onclick="openModal(event)">
			<div class="slider__card">
				<img class="slider__card__photo" src="../../assets/images/${imgPhoto}">
				<h3 class="slider__card__name">${name}</h3>
					<button class="slider__card__button popup-link">Learn more</button>	
			</div>
		</article>
		`;
}

	(async () => {
		await getData();
		console.log(dataGlobal);
		petslist();

	})();

	function petslist () {
		const petsItems = document.querySelector('.slider__items');

		getRandomSlides().forEach(([index,item]) => {
			let tempcard = generateSlide(index, item);
			petsItems.insertAdjacentHTML('beforeend', tempcard);
		});	
	};


	function openModal(event) {
		const popup = document.querySelector('.popup__body');

		const { index } = event.currentTarget.dataset;
		const item = dataGlobal[index];

			const name = item.name;
			const type = item.type;
			const breed = item.breed;
			const imgPhoto = item.img;
			const age = item.age;
			const inoculations = item.inoculations;
			const diseases = item.diseases;
			const parasites = item.parasites;
			const description = item.description;

			let tempcard = `
					<div class="popup__box">
					<button class="popup__close close-popup" onclick="closeModal()" onmouseover="changeItem()" onmouseout="rechangeItem()"><img class="button__close" src="../../assets/icons/vector.svg"></button>
					<img class="popup__img" src="../../assets/images/${imgPhoto}">
					<div class="popup__content">
						<div class="popup__info">
							<h2 class="popup__name">${name}</h2>
							<h3 class="popup__breed">${type} - ${breed}</h3>
							<p class="popup__text">${description}</p>
						</div>
						<div class="popup__subinfo">
							<ul class="info__pet">
								<li class="item"><p class="info__name">Age:</p>${age}</li>
								<li class="item"><p class="info__name">Inoculations:</p>${inoculations}</li>
								<li class="item"><p class="info__name">Diseases:</p>${diseases}</li>
								<li class="item"><p class="info__name">Parasites:</p>${parasites}</li>
							</ul>
						</div>
					</div>
				</div>
			`;
			popup.insertAdjacentHTML('beforeend', tempcard);
			document.querySelector('.popup').classList.add('open');
			document.body.classList.add('lock');
	}


	function closeModal() {
	const popup = document.querySelector('.popup__body');
		popup.innerHTML = '';
		document.querySelector('.popup').classList.remove('open');
		document.body.classList.remove('lock');
	}
	
// Меню бургер
const iconMenu = document.querySelector('.menu__btn');
const logoMenu = document.querySelector('.header__logo');
const menuBody = document.querySelector('.menu__body');
const menuArea = document.querySelector('.menu__area');
if (iconMenu){
	iconMenu.addEventListener("click", function (e){
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('active_icon');
		menuBody.classList.toggle('active_menu');
		logoMenu.classList.toggle('logo_active');
		menuArea.classList.toggle('area_active');
	});
}

const menu = document.querySelector('.menu__btn');
	document.addEventListener('click', (e) =>{
		const click = e.composedPath().includes(menu);
		if ( !click) {
			document.body.classList.remove('_lock')
			iconMenu.classList.remove('active_icon');
			menuBody.classList.remove('active_menu');
			logoMenu.classList.remove('logo_active');
			menuArea.classList.remove('area_active');
		}
	})

	function changeItem() {
		document.querySelector('.popup__close').style.background= '#FDDCC4';
	}
	function rechangeItem() {
		document.querySelector('.popup__close').style.background = 'none';
	}

	