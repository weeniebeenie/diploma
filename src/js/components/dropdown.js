export default class Dropdown {
    constructor(selector, selectorClass) {
        this.dropdownWrapper = selector;
        this.dropdownToggler = selector.querySelector(selectorClass + '-toggle');
        this.dropdownContent = selector.querySelector(selectorClass + '-block');
        this.accordionIcon = selector.querySelector('.accordion-item__toggle-icon');
        this.isOpen = false;

        if (selectorClass === '.js-accordion') {
            this.isAccordion = true;
        }

        this.dropdownToggler.addEventListener('click', () => this.toggleDropdown());

        if (!this.isAccordion) {
            document.addEventListener('click', event => this.handleOutsideClick(event));
            document.addEventListener('keydown', event => this.handleKeyPress(event));
            document.addEventListener('keyup', (event) => this.closeDropdown(event));
        }
    }

    toggleDropdown = () => {
        this.isOpen = !this.isOpen;
        this.dropdownWrapper.classList.toggle('is-open', this.isOpen);
        this.setA11yAttributes(this.isOpen);

        if (this.isAccordion) {
            this.accordionIcon.classList.toggle('fa-plus', !this.isOpen);
            this.accordionIcon.classList.toggle('fa-minus', this.isOpen);
        }
    }

    closeDropdown = (event) => {
        if (event.key === 'Tab') {
            if (!this.dropdownWrapper.contains(event.target)) {
                this.isOpen = !this.isOpen;
                this.dropdownWrapper.classList.remove('is-open', this.isOpen);
                this.setA11yAttributes(this.isOpen);
            }
        }
    }

    handleOutsideClick = (event) => {
        if (!this.dropdownWrapper.contains(event.target)) {
            this.isOpen = false;
            this.dropdownWrapper.classList.remove('is-open');
            this.setA11yAttributes(this.isOpen);
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Escape' && this.isOpen) {
            this.isOpen = false;
            this.dropdownWrapper.classList.remove('is-open');
            this.setA11yAttributes(this.isOpen);
        }
    }

    setA11yAttributes = (isOpen) => {
        this.dropdownToggler.setAttribute('aria-expanded', isOpen);
        this.dropdownContent.setAttribute('aria-hidden', String(!isOpen));
    }
}