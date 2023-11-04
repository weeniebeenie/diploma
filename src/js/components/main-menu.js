// import trapFocus from './focus-trap';

export default function initMainMenu() {
    const documentBody = document.querySelector('body');
    const mainMenu = document.querySelector('.js-main-menu');
    const mainMenuToggle = document.querySelector('.js-main-menu-toggle');
    const mainMenuCloseBtn = mainMenu.querySelector('.js-main-menu-close');

    const open = () => {
        mainMenuToggle.classList.add('is-open');
        mainMenuToggle.setAttribute('aria-expanded', 'true');

        mainMenu.classList.add('is-open');
        documentBody.classList.add('is-overflow-hidden');

        // trapFocus(mainMenu);
        // mainMenuCloseBtn.focus();
    };

    const close = () => {
        mainMenuToggle.classList.remove('is-open');
        mainMenuToggle.setAttribute('aria-expanded', 'false');

        mainMenu.classList.remove('is-open');
        documentBody.classList.remove('is-overflow-hidden');

        // mainMenuToggle.focus();
    };

    if (mainMenuToggle) {
        mainMenuToggle.addEventListener('click', open);
    }

    if (mainMenuCloseBtn) {
        mainMenuCloseBtn.addEventListener('click', close);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            close();
        }
    });

    // Provide styling for current page anchor tag
    const navLinks = [...document.querySelectorAll('.header-nav__link'), ...document.querySelectorAll('.main-menu__item-link')];

    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.setAttribute('aria-current', 'page');
        }
    });
}