
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
		const petsItems = document.querySelector('.sleder__items');
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
	}

	function lockScroll() {
		document.body.classList.toggle('lock-scroll');
}