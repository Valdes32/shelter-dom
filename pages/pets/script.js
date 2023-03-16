const mq = window.innerWidth;
		if (mq > 1279) { var count = 8
		} else if (1280 > mq && mq > 767){ var count = 6
		} else { var count = 3}

	let dataGlobal;
	let currentData = [];
	const res = [];
	let pages;
	let currentPage = 0;
	let lastPage;

const getData = async () => {
	const response = await fetch("../../assets/json/pets.json");
	const data = await response.json();
	dataGlobal = data;
	return data;
};
	const generateCard = (item,index) => {
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
		displayList();
	})();



/* Рандомный массив */
function displayList() {
	const m_chunk = 6;
	const l_chunk = 8;
	let a = dataGlobal;
	const petsItems = document.querySelector('.slider__items');
	const loop = 8 * 3;

	while (res.length !== l_chunk * 6) {
		if (res.length % loop === 0) {
			a = a.sort(() => Math.random() - 0.5); // перемешивание массива
			res.push(...a);
		} else {
			let n1 = res.length % m_chunk === 0 ? res.length % l_chunk : res.length % m_chunk;
			const tail1 = res.slice(-n1);
			const a_rest = a.filter(x => !tail1.includes(x));
			let n2 = m_chunk - n1;
			const head = a_rest.slice(0, n2).sort(() => Math.random() - 0.5);
			res.push(...head);
			const tail2 = [...tail1, ...a_rest.slice(n2)].sort(() => Math.random() - 0.5);
			res.push(...tail2);
		}
	}

		lastPage = res.length / count -1;


		let array = res
		let page_size = count
		pages = paginate(array, page_size)

		pages.forEach(page => {
			let pageEl = ''
			page.forEach((item,index) => {
				pageEl += generateCard(item, index);
			});	
			petsItems.insertAdjacentHTML('beforeend', '<div class="page">' + pageEl + '</div>');
		});

		
}


	function paginate (arr, size) {
		return arr.reduce((acc, val, i) => {
			let idx = Math.floor(i / size)
			let page = acc[idx] || (acc[idx] = [])
			page.push(val)
	
			return acc
		}, [])
	}

	function openModal(event) {
		const popup = document.querySelector('.popup__body');

			const { index } = event.currentTarget.dataset;
			//const item = res[index];
			const item = pages[currentPage][index];
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
		document.querySelector('.popup__close').style.background = '';
	}
	


	const number = document.querySelector('.number-page');
	number.innerText = currentPage+1;


	const buttonFirst = document.querySelector('.nav__button.first');
	const buttonPrevious = document.querySelector('.nav__button.previous');
	if (currentPage == 0 ) {
		buttonFirst.disabled = true;
		buttonPrevious.disabled = true;
	} 
	else {buttonFirst.disabled = false;
			buttonPrevious.disabled = false;
	}

	const buttonNext = document.querySelector('.nav__button.next');
	const buttonLast = document.querySelector('.nav__button.last');
/* кнопки пагинации */

	buttonLast.addEventListener('click', function(e) {
		const petsItems = document.querySelector('.slider__items');
		const pageWidth = petsItems.children[0].clientWidth;
		currentPage = lastPage;
		petsItems.style.transform = 'translateX(-' + (currentPage * pageWidth) + 'px)';
		petsItems.style.transition = 'all 0.3s ease-out';
		number.innerText = currentPage+1;
		if (currentPage == lastPage) {
			buttonNext.disabled = true;
			buttonLast.disabled = true;
			buttonFirst.disabled = false;
			buttonPrevious.disabled = false;
		} 
		else{buttonFirst.disabled = false;
			buttonPrevious.disabled = false;}
	});

	buttonNext.addEventListener('click', function(e) {
		const petsItems = document.querySelector('.slider__items');
		currentPage = Math.max(0, currentPage + 1);
		const pageWidth = petsItems.children[0].clientWidth;
		petsItems.style.transform = 'translateX(-' + (currentPage * pageWidth) + 'px)';
		petsItems.style.transition = 'all 0.3s ease-out';
		number.innerText = currentPage+1;
		if (currentPage == lastPage) {
			buttonNext.disabled = true;
			buttonLast.disabled = true;
			buttonFirst.disabled = false;
			buttonPrevious.disabled = false;
		} 
		else{buttonFirst.disabled = false;
			buttonPrevious.disabled = false;}
	});


	buttonPrevious.addEventListener('click', function(e) {
		const petsItems = document.querySelector('.slider__items');
		const pageWidth = petsItems.children[0].clientWidth;
		currentPage = Math.max(0, currentPage - 1)
		petsItems.style.transform = 'translateX(-' + (currentPage * pageWidth) + 'px)';;
		petsItems.style.transition = 'all 0.3s ease-out';
		number.innerText = currentPage+1;
		if (currentPage == 0 ) {
			buttonFirst.disabled = true;
			buttonPrevious.disabled = true;
			buttonNext.disabled = false;
			buttonLast.disabled = false;
		} 
		else{buttonNext.disabled = false;
			buttonLast.disabled = false;}
	});

	buttonFirst.addEventListener('click', function(e) {
		const petsItems = document.querySelector('.slider__items');
		currentPage = 0;
		const pageWidth = petsItems.children[0].clientWidth;
		petsItems.style.transform = 'translateX(-' + (currentPage * pageWidth) + 'px)';
		petsItems.style.transition = 'all 0.3s ease-out';
		number.innerText = currentPage+1;
		if (currentPage == 0 ) {
			buttonFirst.disabled = true;
			buttonPrevious.disabled = true;
			buttonNext.disabled = false;
			buttonLast.disabled = false;
		} 
		else{buttonNext.disabled = false;
			buttonLast.disabled = false;}
	});

		/* нумерация страницы */
		
