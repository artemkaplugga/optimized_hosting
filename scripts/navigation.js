document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    
    // Функция для проверки позиционирования меню
    function fixMenuPosition(menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Если меню выходит за правую границу экрана
        if (rect.right > viewportWidth) {
            menu.style.left = 'auto';
            menu.style.right = '0';
        }
    }
    
    // Функция для принудительного показа меню
    function forceShowMenu(menu) {
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
        menu.style.transform = 'translateY(0)';
        menu.classList.add('active');
        menu.setAttribute('data-forced', 'true');
    }
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (!menu || !toggle) return;

        // Fix menu position initially
        fixMenuPosition(menu);

        // Сначала проверим, скрыто ли меню изначально
        if (window.getComputedStyle(menu).visibility === 'hidden') {
            console.log('Меню изначально скрыто, применяем исправление');
            // Устанавливаем важные свойства для отображения меню
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(5px)';
        }

        function closeDropdown() {
            if (menu.getAttribute('data-forced') === 'true') {
                console.log('Меню принудительно открыто, не закрываем');
                return;
            }
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(5px)';
            menu.classList.remove('active');
        }

        function openDropdown() {
            fixMenuPosition(menu);
            menu.style.visibility = 'visible';
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
            menu.classList.add('active');
            console.log('Меню открыто!');
        }

        // Используем mouseover вместо mouseenter для большей надежности
        toggle.addEventListener('mouseover', () => {
            openDropdown();
        });
        
        // Добавляем обработчик фокуса для клавиатурной навигации
        toggle.addEventListener('focus', () => {
            openDropdown();
        });
        
        // Обработчик для dropdown контейнера
        dropdown.addEventListener('mouseover', () => {
            openDropdown();
        });

        // Добавляем обработчик для клика тоже
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.getComputedStyle(menu).visibility === 'hidden' || 
                window.getComputedStyle(menu).opacity === '0') {
                openDropdown();
                // Принудительно показываем меню при клике
                forceShowMenu(menu);
            } else {
                if (menu.getAttribute('data-forced') === 'true') {
                    menu.removeAttribute('data-forced');
                    closeDropdown();
                } else {
                    closeDropdown();
                }
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            closeDropdown();
        });

        menu.addEventListener('mouseover', () => {
            openDropdown();
        });
    });
    
    // Force display for debugging - доступно через консоль браузера
    window.forceShowDropdowns = function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.visibility = 'visible';
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
            menu.classList.add('active');
            menu.setAttribute('data-forced', 'true');
            console.log('Принудительно показано меню:', menu);
        });
        return "Все выпадающие меню принудительно отображены";
    };
    
    // Можно вызвать в консоли браузера для проверки:
    console.log('Для принудительного отображения всех меню вызовите в консоли: window.forceShowDropdowns()');
    
    // Дополнительно проверяем все меню после загрузки
    setTimeout(() => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (window.getComputedStyle(menu).visibility === 'hidden') {
                const parent = menu.closest('.nav-item-dropdown');
                if (parent) {
                    console.log('Активируем скрытое меню через 1 секунду после загрузки');
                    menu.classList.add('active');
                    // Принудительно показываем меню
                    forceShowMenu(menu);
                }
            }
        });

    
        // FAQ functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Toggle the clicked item
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    
        
 
}); 