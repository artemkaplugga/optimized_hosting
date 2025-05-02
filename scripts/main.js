


document.addEventListener('DOMContentLoaded', function () {

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setTimeout(() => {
        loadScriptAsync('https://unpkg.com/swiper/swiper-bundle.min.js')
            .then(() => {
                initializeSwiper();
            })
            .catch(err => console.error('Failed to load Swiper:', err));
    }, 1000);

    const sections = document.querySelectorAll('.hosting-promo, .features-strip, .services-overview, .why-aetix');
    
    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.modal-close');
    

    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });


    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    const showPasswordToggles = document.querySelectorAll('input[type="checkbox"]');
    showPasswordToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const passwordInput = this.closest('.form-group').querySelector('input[type="password"]');
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    });


    const authLinks = document.querySelector('.auth-links');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userMenuHeader = document.querySelector('.user-menu-header');
    const logoutBtn = document.getElementById('logoutBtn');


    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }

    function resetUIToLoggedOut() {
  
        if (loginBtn) loginBtn.style.display = 'inline';
        if (document.querySelector('.auth-separator')) document.querySelector('.auth-separator').style.display = 'inline';
        if (registerBtn) registerBtn.style.display = 'inline';
     
        if (userProfile) userProfile.style.display = 'none';
    }

  
    function updateUIAfterLogin(userData) {
      
        if (loginBtn) loginBtn.style.display = 'none';
        if (document.querySelector('.auth-separator')) document.querySelector('.auth-separator').style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        if (userProfile) userProfile.style.display = 'block';
  
        if (userAvatar) userAvatar.textContent = getInitials(userData.username);
        
    
        if (userMenuHeader) {
            userMenuHeader.querySelector('.user-name').textContent = userData.username;
            userMenuHeader.querySelector('.user-email').textContent = userData.email;
        }

     
        localStorage.setItem('user', JSON.stringify(userData));
    }

    function logout() {
        localStorage.removeItem('user');
    
        resetUIToLoggedOut(); 
        window.location.href = 'index.html';
    }

    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            updateUIAfterLogin(parsedUser);
        } catch (error) {
            console.error("Ошибка парсинга сохраненных данных пользователя:", error);
            localStorage.removeItem('user'); 
            resetUIToLoggedOut(); 
        }
    } else {
        resetUIToLoggedOut(); 
    }

  
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
      
            const formData = new FormData(form);
            const userData = {
                username: formData.get('studentId') || formData.get('regStudentId'),
                email: formData.get('regEmail') || 'user@example.com',
                password: formData.get('password') || formData.get('regPassword')
            };
    
            updateUIAfterLogin(userData);
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    userAvatar.addEventListener('click', function(e) {
        const userMenu = this.nextElementSibling;
        userMenu.classList.toggle('active');
        e.stopPropagation();
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu') && !e.target.closest('.user-avatar')) {
            document.querySelector('.user-menu').classList.remove('active');
        }
    });

    if (logoutBtn) { 
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

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

function initializeSwiper() {
    if (typeof Swiper !== 'undefined') {
        const swiperOptions = isMobile ? {
            speed: 800,
            spaceBetween: 20,
            autoplay: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        } : {
            speed: 800,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        const swiper = new Swiper('.swiper', swiperOptions);
    }
} 

