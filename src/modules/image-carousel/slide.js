export default class Slide {
	constructor(slideInfo) {
		this.slidePosition = slideInfo.position;
		this.slideNumber = slideInfo.number;
		this.slideImageSrc = slideInfo.image;
		this.slideImageAlt = slideInfo.alt;
		this.slide = this.createSlideElement();
	}

	createSlideContainerElement() {
		const slideContainer = document.createElement('div');
		slideContainer.classList.add('image-carousel-slide');
		slideContainer.classList.add(`slide-${this.slideNumber}`);
		return slideContainer;
	}

	createSlideImageElement() {
		const slideImage = document.createElement('img');
		slideImage.setAttribute('src', `${this.slideImageSrc}`);
		slideImage.setAttribute('alt', `${this.slideImageAlt}`);
		return slideImage;
	}

	createSlideElement() {
		const slideContainer = this.createSlideContainerElement();
		const slideImage = this.createSlideImageElement();
		slideContainer.appendChild(slideImage);
		return slideContainer;
	}
}
