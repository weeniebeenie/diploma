// import Swiper JS
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default function initCarousels() {
    const swiper = new Swiper('.js-swiper', {
        modules: [Navigation],
        slidesPerView: 1,
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
        }
    });
}