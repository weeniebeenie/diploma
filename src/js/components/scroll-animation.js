export default function scrollAnimation(elements) {
    const observer = new IntersectionObserver((entries, options) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-showed');
            }
        });
    }, { threshold: [0.4] });
    document.querySelectorAll(elements).forEach(el => observer.observe(el));
}