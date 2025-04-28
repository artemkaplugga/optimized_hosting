document.addEventListener('DOMContentLoaded', function() {
    // Получаем все пункты меню и вкладки
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');

    // Функция для переключения вкладок
    function switchTab(tabId) {
        // Убираем активный класс у всех пунктов меню и вкладок
        menuItems.forEach(item => item.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        // Добавляем активный класс выбранному пункту меню и вкладке
        const selectedMenuItem = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedTab = document.getElementById(tabId);

        if (selectedMenuItem && selectedTab) {
            selectedMenuItem.classList.add('active');
            selectedTab.classList.add('active');
        }
    }

    // Обработчик клика по пунктам меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);

            // Обновляем URL с хэшем
            window.location.hash = tabId;
        });
    });

    // Проверяем хэш в URL при загрузке страницы
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        switchTab(tabId);
    }
}); 