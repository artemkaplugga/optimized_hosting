document.addEventListener('DOMContentLoaded', function() {

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

   
    function isElementInViewportWithOffset(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset
        );
    }

 
    function handleScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isElementInViewportWithOffset(element)) {
                element.classList.add('visible');
            }
        });
    }

    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .advantage-card, .benefit-card');
    const titles = document.querySelectorAll('.section-title, .service-title, .advantage-title');
    const descriptions = document.querySelectorAll('.section-description, .service-description, .advantage-description');
    const lists = document.querySelectorAll('.feature-list, .service-tags');
    const buttons = document.querySelectorAll('.cta-button');
    const tables = document.querySelectorAll('.pricing-table, .pricing-table-row');
    const forms = document.querySelectorAll('.contact-form');
    const footers = document.querySelectorAll('.footer-section');

    const allElements = [
        ...sections,
        ...cards,
        ...titles,
        ...descriptions,
        ...lists,
        ...buttons,
        ...tables,
        ...forms,
        ...footers
    ];

    allElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });


    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();
}); 