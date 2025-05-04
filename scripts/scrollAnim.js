
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function addAnimationClass() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {

    addAnimationClass();

    window.addEventListener('scroll', addAnimationClass);
}); 