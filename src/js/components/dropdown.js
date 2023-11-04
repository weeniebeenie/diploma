export default function initDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            const dropdownToggler = dropdown.querySelector('.js-dropdown-toggle');
            const dropdownBlock = dropdown.querySelector('js-dropdown-block');

            if (dropdownToggler) {
                dropdownToggler.addEventListener('click', () => {
                    dropdown.classList.toggle('is-open');
                });
            }
        });
    }
}