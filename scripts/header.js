document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const body = document.body;
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Мобильное меню
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');

    // Модальные окна
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');
    const closeBtns = document.querySelectorAll('.modal-close');

    // Функция для открытия/закрытия мобильного меню
    function toggleMobileMenu() {
        header.classList.toggle('menu-open');
        body.style.overflow = header.classList.contains('menu-open') ? 'hidden' : '';
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    }

    // Обработчик клика по кнопке мобильного меню
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Обработчик для мобильного выпадающего меню
    mobileDropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const mobileNavItem = this.closest('.mobile-nav-item');
        
        // Закрываем все остальные открытые мобильные выпадающие меню
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            if (item !== mobileNavItem) {
                item.classList.remove('active');
                item.querySelector('.mobile-dropdown-menu')?.classList.remove('active');
            }
        });

        // Открываем/закрываем текущее мобильное выпадающее меню
        mobileNavItem.classList.toggle('active');
        mobileDropdownMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Обработчик для выпадающих меню
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.closest('.nav-item-dropdown');
            
            // Закрываем все остальные открытые выпадающие меню
            dropdownToggles.forEach(otherToggle => {
                const otherDropdown = otherToggle.closest('.nav-item-dropdown');
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Открываем/закрываем текущее выпадающее меню
            dropdown.classList.toggle('active');
        });
    });

    // Закрытие меню при клике по ссылке
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link, .mobile-auth-buttons a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (header.classList.contains('menu-open')) {
                toggleMobileMenu();
            }
        });
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && header.classList.contains('menu-open')) {
            toggleMobileMenu();
            // Закрываем все выпадающие меню
            dropdownToggles.forEach(toggle => {
                const dropdown = toggle.closest('.nav-item-dropdown');
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Закрытие выпадающих меню при клике вне них
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown') && !e.target.closest('.mobile-nav-item')) {
            dropdownToggles.forEach(toggle => {
                const dropdown = toggle.closest('.nav-item-dropdown');
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.mobile-dropdown-menu')?.classList.remove('active');
            });
        }
    });

    // Функции для модальных окон
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Обработчики для кнопок входа
    loginBtn.addEventListener('click', () => openModal(loginModal));
    mobileLoginBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        header.classList.remove('menu-open');
        openModal(loginModal);
    });

    // Обработчики для кнопок регистрации
    registerBtn.addEventListener('click', () => openModal(registerModal));
    mobileRegisterBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        header.classList.remove('menu-open');
        openModal(registerModal);
    });

    // Закрытие модальных окон
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Закрытие модальных окон при клике вне их области
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    // Показать/скрыть пароль
    const showPasswordToggles = document.querySelectorAll('.password-toggle input');
    showPasswordToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const passwordInput = this.closest('.form-group').querySelector('input[type="password"]');
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    });

    // Обработчик для мобильной кнопки выхода
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
}); 