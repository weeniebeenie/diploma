// import Swiper JS
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default function initCarousels() {
    const swiperOptions = {
        modules: [Navigation],
        slidesPerView: 1,
        maxBackfaceHiddenSlides: false,
        watchSlidesProgress: true,
        spaceBetween: 0,
        simulateTouch: false,
        loop: false,
        navigation: {
            nextEl: '.js-swiper-control.is-next',
            prevEl: '.js-swiper-control.is-prev',
        },
        breakpoints: {
            767: {
                slidesPerView: 3,
            },
            1279: {
                slidesPerView: 4,
            }
        },
        on: {
            'init': (swiper) => {
                setAccessibility(swiper);
            },
            'slideChange': (swiper) => {
                setAccessibility(swiper);
            }
        }
    };

    const setAccessibility = (swiper) => {
        const allSlides = swiper.slides;
        allSlides.forEach(slide => {
            const slideIsVisible = slide.classList.contains('swiper-slide-visible');
            const slideLink = slide.querySelector('a');

            if (slideIsVisible) {
                slide.setAttribute('aria-hidden', 'false');
                slideLink.setAttribute('tabindex', '0');
            } else {
                slide.setAttribute('aria-hidden', 'true');
                slideLink.setAttribute('tabindex', '-1');
            }
        });
    };

    const swiper = new Swiper('.js-swiper', swiperOptions);
}