import Slides from './modules/image-carousel/slides';
import sunWukong from './images/sun-wukong.jpeg';
import shaWujing from './images/sha-wujing.jpeg';
import tanSanzang from './images/tan-sanzang.jpeg';
import zhuBajie from './images/zhu-bajie.jpeg';
import heavenlyCourt from './images/heavenly-court.jpeg';

const slideData = {
	slides: document.querySelector('.image-carousel-slides'),
	arrowBack: document.querySelector('.arrow-back'),
	arrowForward: document.querySelector('.arrow-forward'),
	imageCarouselNavigation: document.querySelector(
		'.image-carousel-navigation'
	),
	firstSlide: 0,
	images: [
		{ image: sunWukong, alt: 'Sun Wukong' },
		{ image: tanSanzang, alt: 'Tan Sanzang' },
		{ image: zhuBajie, alt: 'Zhu Bajie' },
		{ image: shaWujing, alt: 'Sha Wujing' },
		{ image: heavenlyCourt, alt: 'Heavenly Court' },
	],
};

// eslint-disable-next-line no-unused-vars
const slides = new Slides(slideData);
