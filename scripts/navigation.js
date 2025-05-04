document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');


    function fixMenuPosition(menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

        if (rect.right > viewportWidth) {
            menu.style.left = 'auto';
            menu.style.right = '0';
        }
    }
});
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

   
        fixMenuPosition(menu);

        if (window.getComputedStyle(menu).visibility === 'hidden') {
            console.log('Меню изначально скрыто, применяем исправление');
      
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

        toggle.addEventListener('mouseover', () => {
            openDropdown();
        });


        toggle.addEventListener('focus', () => {
            openDropdown();
        });

    
        dropdown.addEventListener('mouseover', () => {
            openDropdown();
        });

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.getComputedStyle(menu).visibility === 'hidden' ||
                window.getComputedStyle(menu).opacity === '0') {
                openDropdown();
       
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

    window.forceShowDropdowns = function () {
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


    console.log('Для принудительного отображения всех меню вызовите в консоли: window.forceShowDropdowns()');

  
    setTimeout(() => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (window.getComputedStyle(menu).visibility === 'hidden') {
                const parent = menu.closest('.nav-item-dropdown');
                if (parent) {
                    console.log('Активируем скрытое меню через 1 секунду после загрузки');
                    menu.classList.add('active');
                
                    forceShowMenu(menu);
                }
            }
        });

        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

      
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }); 
