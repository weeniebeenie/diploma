import './base/external-libraries';
import Dropdown from './components/dropdown';
import MainMenu from './components/main-menu';
// import initCarousels from './components/carousel';
import gallery from './components/gallery';
import animationScroll from './components/scroll-animation';

document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.js-dropdown');
    dropdowns.forEach(dropdown => new Dropdown(dropdown, '.js-dropdown'));

    const accordions = document.querySelectorAll('.js-accordion');
    accordions.forEach(accordion => new Dropdown(accordion, '.js-accordion'));

    const mainMane = new MainMenu();
    // initCarousels();
    gallery();
    animationScroll('.appearance-animation');
});