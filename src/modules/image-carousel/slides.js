import Slide from './slide';

export default class Slides {
	constructor(slideData) {
		this.slides = [];
		this.slidesUI = slideData.slides;
		this.arrowBack = slideData.arrowBack;
		this.arrowForward = slideData.arrowForward;
		this.currentSlide = slideData.firstSlide;
		this.navigation = slideData.imageCarouselNavigation;
		this.images = slideData.images;
		this.initialize();
	}

	newSlideNumber() {
		const slideNumber = Number(this.slides.length);
		return slideNumber;
	}

	newSlidePosition() {
		const slidePosition = Number(this.newSlideNumber() * -800);
		return slidePosition;
	}

	getSlideInfo({ image, alt }) {
		const slideInfo = {};
		slideInfo.number = this.newSlideNumber();
		slideInfo.position = this.newSlidePosition();
		slideInfo.image = image;
		slideInfo.alt = alt;
		return slideInfo;
	}

	createSlide({ image, alt }) {
		const slideInfo = this.getSlideInfo({ image, alt });
		const slide = new Slide(slideInfo);
		this.slides.push(slide);
	}

	getSlideNumber(slideElement) {
		const slide = this.slides.find(
			(slideItem) => slideItem === slideElement
		);
		return slide.slideNumber;
	}

	getSlidePosition(slideElement) {
		const slide = this.slides.find(
			(slideItem) => slideItem === slideElement
		);
		return slide.slidePosition;
	}

	checkIfLast(slideElement) {
		const lastElement = this.slides[Number(this.slides.length - 1)];
		return slideElement === lastElement;
	}

	checkIfFirst(slideElement) {
		const firstElement = this.slides[0];
		return slideElement === firstElement;
	}

	nextSlide() {
		if (this.checkIfLast(this.slides[this.currentSlide])) {
			const nextSlide = this.slides[0];
			this.slidesUI.style.left = `${nextSlide.slidePosition}px`;
			this.currentSlide = 0;
			this.changeActiveNavigationDot(nextSlide);
		} else {
			const nextSlide = this.slides[this.currentSlide + 1];
			this.slidesUI.style.left = `${nextSlide.slidePosition}px`;
			this.currentSlide += 1;
			this.changeActiveNavigationDot(nextSlide);
		}
	}

	cycleSlides() {
		setInterval(() => this.nextSlide(), 5000);
	}

	previousSlide() {
		if (this.checkIfFirst(this.slides[this.currentSlide])) {
			const nextSlide = this.slides[Number(this.slides.length - 1)];
			this.slidesUI.style.left = `${nextSlide.slidePosition}px`;
			this.currentSlide = Number(this.slides.length - 1);
			this.changeActiveNavigationDot(nextSlide);
		} else {
			const nextSlide = this.slides[this.currentSlide - 1];
			this.slidesUI.style.left = `${nextSlide.slidePosition}px`;
			this.currentSlide -= 1;
			this.changeActiveNavigationDot(nextSlide);
		}
	}

	createNavigationDotElement(slideElement) {
		const navigationDot = document.createElement('div');
		navigationDot.classList.add('navigation-dot');
		navigationDot.classList.add(`slide${slideElement.slideNumber}`);
		navigationDot.addEventListener('click', () => {
			this.slidesUI.style.left = `${slideElement.slidePosition}px`;
			this.currentSlide = slideElement.slideNumber;
			this.changeActiveNavigationDot(slideElement);
		});
		return navigationDot;
	}

	// eslint-disable-next-line class-methods-use-this
	changeActiveNavigationDot(slideElement) {
		const { slideNumber } = slideElement;
		const navigationDots = document.querySelectorAll('.navigation-dot');
		const activeNavigationDot = document.querySelector(
			`.navigation-dot.slide${slideNumber}`
		);
		navigationDots.forEach((item) => {
			item.classList.remove('active');
		});
		activeNavigationDot.classList.add('active');
	}

	initializeNavigationDots() {
		this.slides.forEach((item) => {
			const navigationDot = this.createNavigationDotElement(item);
			this.navigation.appendChild(navigationDot);
		});
		this.changeActiveNavigationDot(this.slides[this.currentSlide]);
	}

	initializeSlides() {
		this.images.forEach((item) => {
			this.createSlide(item);
		});
		this.arrowForward.addEventListener('click', () => this.nextSlide());
		this.arrowBack.addEventListener('click', () => this.previousSlide());
	}

	createSlidesDom() {
		this.slides.forEach((item) => {
			this.slidesUI.appendChild(item.slide);
		});
	}

	initialize() {
		this.initializeSlides();
		this.initializeNavigationDots();
		this.createSlidesDom();
		this.cycleSlides();
	}
}
