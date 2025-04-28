document.addEventListener('DOMContentLoaded', function() {
    // Получаем все пункты меню и вкладки
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Функция для переключения вкладок
    function switchTab(tabId) {
        // Скрываем все вкладки
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Убираем активное состояние у всех пунктов меню
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Показываем нужную вкладку
        const activeTab = document.getElementById(tabId);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Делаем активным соответствующий пункт меню
        const activeMenuItem = document.querySelector(`.menu-item[data-tab="${tabId}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
    }
    
    // Обработчик клика по пунктам меню
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            
            // Обновляем хэш в URL для сохранения выбранной вкладки
            window.location.hash = tabId;
        });
    });
    
    // Проверяем хэш при загрузке страницы
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        switchTab(tabId);
    }
}); 