import './base/external-libraries';
import initCarousels from './components/carousel';
import initDropdowns from './components/dropdown';
import initMainMenu from './components/main-menu';

document.addEventListener("DOMContentLoaded", () => {
    initCarousels();
    initDropdowns();
    initMainMenu();
});