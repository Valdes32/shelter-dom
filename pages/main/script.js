window.matchMedia('(max-width: 767px)').addEventListener('change', function (event) {petslist();})
window.matchMedia('(min-width: 768px) and (max-width:1070px)').addEventListener('change', function (event) {petslist();})
window.matchMedia('(min-width: 1279px)').addEventListener('change', function (event) {petslist();})




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
	if (mq > 1279) { var n = 3
	} else if (1280 > mq && mq > 767){ var n = 2
	} else { var n = 1}
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

			let tempcard = `
				<div class="popup__box">
					<button class="popup__close close-popup" onclick="closeModal()"><img class="button__close" src="../../assets/icons/vector.svg"></button>
					<img class="popup__img" src="../../assets/images/${imgPhoto}">
					<div class="popup__content">
						<div class="popup__info">
							<h2 class="popup__name">${name}</h2>
							<h3 class="popup__breed">${type} - ${breed}</h3>
							<p class="popup__text">Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.</p>
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
if (iconMenu){
	iconMenu.addEventListener("click", function (e){
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('active_icon');
		menuBody.classList.toggle('active_menu');
		logoMenu.classList.toggle('logo_active');
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
		}
	})



document.querySelector('.slider__button.left').addEventListener('click', (e) => {
	const petsItems = document.querySelector('.slider__items');

	getRandomSlides().forEach(([index,item]) => {
		let tempcard = generateSlide(index, item);
		petsItems.insertAdjacentHTML('afterbegin', tempcard);
	});
	const mq = window.innerWidth;
	if (mq > 1279) { var n = 3
	} else if (1280 > mq && mq > 767){ var n = 2
	} else { var n = 1}
	const onTransitionEnd = (e) => {
		const children = [...petsItems.children];
		for(let i = n ; i < children.length; i++) {
			petsItems.removeChild(children[i]);
		}
		petsItems.removeEventListener('transitionend', onTransitionEnd);
	}
	petsItems.addEventListener('transitionend', onTransitionEnd)


	petsItems.style.transform = 'translateX(-100%)';
	petsItems.style.transition = '';

	requestAnimationFrame(() => {
		petsItems.style.transition = 'all 0.3s ease-out';
		petsItems.style.transform = '';
	});
});

document.querySelector('.slider__button.right').addEventListener('click', (e) => {
	const petsItems = document.querySelector('.slider__items');

	getRandomSlides().forEach(([index,item]) => {
		let tempcard = generateSlide(index, item);
		petsItems.insertAdjacentHTML('beforeend', tempcard);
	});
	const mq = window.innerWidth;
	if (mq > 1279) { var n = 3
	} else if (1280 > mq && mq > 767){ var n = 2
	} else { var n = 1}
	const onTransitionStart = (e) => {
		const children = [...petsItems.children];
		for(let i = 0 ; i < children.length - n; i++) {
			petsItems.removeChild(children[i]);
		}
		petsItems.removeEventListener('transitionend', onTransitionStart);
		petsItems.style.transform = null;
		petsItems.style.transition = null;
	}
	petsItems.addEventListener('transitionend', onTransitionStart)

	petsItems.style.transform = '';
	petsItems.style.transition = '';
	
	requestAnimationFrame(() => {
		petsItems.style.transition = 'all 0.3s ease-out';
		petsItems.style.transform = 'translateX(-100%)';
	});
});