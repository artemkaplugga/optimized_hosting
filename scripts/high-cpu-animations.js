document.addEventListener('DOMContentLoaded', function() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Функция для проверки видимости элемента с отступом
    function isElementInViewportWithOffset(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= offset
        );
    }

    // Функция для добавления класса visible к элементам
    function handleScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isElementInViewportWithOffset(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Добавляем класс animate-on-scroll ко всем секциям и элементам
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .advantage-card, .benefit-card');
    const titles = document.querySelectorAll('.section-title, .service-title, .advantage-title');
    const descriptions = document.querySelectorAll('.section-description, .service-description, .advantage-description');
    const lists = document.querySelectorAll('.feature-list, .service-tags');
    const buttons = document.querySelectorAll('.cta-button');
    const tables = document.querySelectorAll('.pricing-table, .pricing-table-row');
    const forms = document.querySelectorAll('.contact-form');
    const footers = document.querySelectorAll('.footer-section');

    // Объединяем все элементы в один массив
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

    // Добавляем класс animate-on-scroll ко всем элементам
    allElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    // Обработчик события прокрутки
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Инициализация при загрузке страницы
    handleScroll();
}); 