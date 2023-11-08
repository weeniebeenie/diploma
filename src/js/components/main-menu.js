import trapFocus from './focus-trap';

export default function initMainMenu() {
    const documentBody = document.querySelector('body');
    const mainMenu = document.querySelector('.js-main-menu');
    const mainMenuToggle = document.querySelector('.js-main-menu-toggle');
    const mainMenuCloseBtn = mainMenu.querySelector('.js-main-menu-close');
    const navLinks = document.querySelectorAll('.header-nav__link, .main-menu__item-link');

    const open = () => {
        mainMenuToggle.classList.add('is-open');
        mainMenuToggle.setAttribute('aria-expanded', 'true');

        mainMenu.classList.add('is-open');
        mainMenu.removeAttribute('hidden');
        documentBody.classList.add('is-overflow-hidden');

        mainMenuToggle.setAttribute('tabindex', '-1');
        mainMenuCloseBtn.setAttribute('tabindex', '0');

        mainMenuCloseBtn.focus();

        trapFocus(mainMenu);
    };

    const close = () => {
        mainMenuToggle.classList.remove('is-open');
        mainMenuToggle.setAttribute('aria-expanded', 'false');

        mainMenu.classList.remove('is-open');
        mainMenu.setAttribute('hidden', '');
        documentBody.classList.remove('is-overflow-hidden');

        mainMenuToggle.setAttribute('tabindex', '0');
        mainMenuCloseBtn.setAttribute('tabindex', '-1');

        mainMenuToggle.focus();
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
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.setAttribute('aria-current', 'page');
        }
    });
}