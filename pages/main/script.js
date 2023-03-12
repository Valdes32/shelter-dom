
let dataGlobal;

const getData = async () => {
const response = await fetch("../../assets/json/pets.json");
const data = await response.json();
dataGlobal = data;
return data;
};
				
	(async () => {
		await getData();
		console.log(dataGlobal);
		petslist();
	})();

	function petslist () {
		const petsItems = document.querySelector('.slider__items');
		dataGlobal.forEach(item => {
			const id = item.id;
			const name = item.name;
			const imgPhoto = item.img;

			let tempcard = `
			<article class="slider__card" id="${id}">
					<img class="slider__card__photo" src="../../assets/images/${imgPhoto}">
					<h3 class="slider__card__name">${name}</h3>
					<button class="slider__card__button">Learn more</button>	
				</article>
			`;
			petsItems.insertAdjacentHTML('beforeend', tempcard);
		});	
	};
	
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