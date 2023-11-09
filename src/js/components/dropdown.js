export default function initDropdowns() {
    const dropdowns = document.querySelectorAll('.js-dropdown');

    const showHoverDropdown = (dropdown, toggle, block) => {
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        block.setAttribute('aria-hidden', 'false');
    };

    const hideHoverDropdown = (dropdown, toggle, block) => {
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        block.setAttribute('aria-hidden', 'true');
    };

    if (dropdowns) {
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.js-dropdown-toggle');
            const dropdownBlock = dropdown.querySelector('.js-dropdown-block');

            if (dropdownToggle.classList.contains('header-nav__link')) {
                dropdown.addEventListener('mouseover', () => {
                    showHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                });
                dropdown.addEventListener('mouseout', () => {
                    hideHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                });
            } else {
                dropdownToggle.addEventListener('click', () => {
                    dropdown.classList.toggle('is-open');
                });
            }

            document.addEventListener('click', (event) => {
                if (!dropdownToggle.contains(event.target)) {
                    hideHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    if (dropdown.classList.contains('is-open')) {
                        hideHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                    }
                }
            });

            document.addEventListener('keyup', (event) => {
                if (event.key === 'Tab') {
                    if (!dropdown.contains(event.target)) {
                        hideHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                    }
                }
            });

            dropdownToggle.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();

                    if (dropdown.classList.contains('is-open')) {
                        hideHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                    } else {
                        showHoverDropdown(dropdown, dropdownToggle, dropdownBlock);
                        dropdownBlock.focus();
                    }
                }
            });
        });
    }
}