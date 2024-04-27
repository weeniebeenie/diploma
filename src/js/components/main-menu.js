import trapFocus from './focus-trap';

export default class MainMenu {
    constructor() {
        this.documentBody = document.querySelector('body');
        this.mainMenuToggle = document.querySelector('.js-main-menu-toggle');
        this.mainMenu = document.querySelector('.js-main-menu');
        this.mainMenuCloseBtn = this.mainMenu.querySelector('.js-main-menu-close');
        this.navLinks = document.querySelectorAll('.header-nav__link, .main-menu__item-link');
        this.isOpen = false;

        if (this.mainMenuToggle) {
            this.mainMenuToggle.addEventListener('click', () => this.open());
        }

        if (this.mainMenuCloseBtn) {
            this.mainMenuCloseBtn.addEventListener('click', () => this.close());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        // Provide styling for current page anchor tag
        this.navLinks.forEach(link => {
            if (link.href === window.location.href) {
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    open = () => {
        this.isOpen = !this.isOpen;

        this.mainMenuToggle.classList.add('is-open');
        this.mainMenu.classList.add('is-open');

        this.mainMenu.removeAttribute('hidden');
        this.documentBody.classList.add('is-overflow-hidden');

        this.mainMenuToggle.setAttribute('tabindex', '-1');
        this.mainMenuCloseBtn.setAttribute('tabindex', '0');

        this.setA11yAttributes(this.isOpen);
        this.mainMenuCloseBtn.focus();

        trapFocus(this.mainMenu);
    };

    close = () => {
        this.isOpen = !this.isOpen;

        this.mainMenuToggle.classList.remove('is-open');
        this.mainMenu.classList.remove('is-open');

        this.mainMenu.setAttribute('hidden', '');
        this.documentBody.classList.remove('is-overflow-hidden');

        this.mainMenuToggle.setAttribute('tabindex', '0');
        this.mainMenuCloseBtn.setAttribute('tabindex', '-1');

        this.setA11yAttributes(this.isOpen);
        this.mainMenuToggle.focus();
    };

    setA11yAttributes = (isOpen) => {
        this.mainMenuToggle.setAttribute('aria-expanded', isOpen);
        this.mainMenu.setAttribute('aria-hidden', String(!isOpen));
    }
}