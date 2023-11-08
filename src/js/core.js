import './base/external-libraries';
import initDropdowns from './components/dropdown';
import initMainMenu from './components/main-menu';
import initCarousels from './components/carousel';
import gallery from './components/gallery';
import animationScroll from './components/scroll-animation';

document.addEventListener("DOMContentLoaded", () => {
    initDropdowns();
    initMainMenu();
    initCarousels();
    gallery();
    animationScroll('.appearance-animation');
});