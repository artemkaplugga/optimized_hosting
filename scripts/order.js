document.addEventListener('DOMContentLoaded', function() {
    let selectedCountry = 'paris'; // по умолчанию Париж
    let lastOpenedPlan = null; // для отслеживания выбранного тарифа

    // --- Переключение ценников по странам ---
    const locationItems = document.querySelectorAll('.locations-list .location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            // Снять выделение со всех
            locationItems.forEach(i => i.classList.remove('active'));
            // Выделить выбранную
            this.classList.add('active');
            // Получить страну
            selectedCountry = this.querySelector('span').textContent.trim().toLowerCase();
            // Привести к нужному формату
            if (selectedCountry === 'франкфурт') selectedCountry = 'frankfurt';
            if (selectedCountry === 'париж') selectedCountry = 'paris';
            if (selectedCountry === 'амстердам') selectedCountry = 'amsterdam';
            if (selectedCountry === 'лондон') selectedCountry = 'london';
            if (selectedCountry === 'денвер') selectedCountry = 'denver';
            if (selectedCountry === 'вена') selectedCountry = 'vienna';
            if (selectedCountry === 'стокгольм') selectedCountry = 'stockholm';
            if (selectedCountry === 'хельсинки') selectedCountry = 'helsinki';
            if (selectedCountry === 'москва') selectedCountry = 'moscow';
            if (selectedCountry === 'санкт-петербург') selectedCountry = 'spb';
            // Перебрать тарифы и поменять цену
            document.querySelectorAll('.plan').forEach(plan => {
                const price = plan.getAttribute('data-price-' + selectedCountry);
                const month = plan.getAttribute('data-month-' + selectedCountry);
                const pricePerHour = plan.querySelector('.price-per-hour');
                const pricePerMonth = plan.querySelector('.price-per-month');
                const pricePerMonth2 = plan.querySelector('.price-per-month2');
                if (price && pricePerHour) {
                    pricePerHour.innerHTML = `€${parseFloat(price).toFixed(2)}<span>/час</span>`;
                }
                if (month && pricePerMonth) {
                    pricePerMonth.innerHTML = `€${parseFloat(month).toFixed(2)}<span>/месяц</span>`;
                }
                if (month && pricePerMonth2) {
                    pricePerMonth2.innerHTML = `€${parseFloat(month).toFixed(2)}<span>/месяц</span>`;
                }
            });
            // --- Обновить цену в модальном окне, если оно открыто ---
            if (document.getElementById('orderModal').classList.contains('active') && lastOpenedPlan) {
                updateOrderModalPrice(lastOpenedPlan);
            }
        });
    });

    // --- Модальное окно заказа ---
    const orderModal = document.getElementById('orderModal');
    const orderModalClose = orderModal.querySelector('.order-modal-close');
    const orderForm = document.getElementById('orderForm');
    const billingPeriod = document.getElementById('billingPeriod');
    const selectedPlanName = document.getElementById('selectedPlanName');
    const orderPrice = document.getElementById('orderPrice');
    const orderDiscount = document.getElementById('orderDiscount');
    const orderTotal = document.getElementById('orderTotal');
    const locationSelect = document.getElementById('location');

    // Обработчик смены локации в модальном окне заказа
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            let loc = this.value.toLowerCase();
            // Привести к нужному формату
            if (loc === 'франкфурт') loc = 'frankfurt';
            if (loc === 'париж') loc = 'paris';
            if (loc === 'амстердам') loc = 'amsterdam';
            if (loc === 'лондон') loc = 'london';
            if (loc === 'денвер') loc = 'denver';
            if (loc === 'вена') loc = 'vienna';
            if (loc === 'стокгольм') loc = 'stockholm';
            if (loc === 'хельсинки') loc = 'helsinki';
            if (loc === 'москва') loc = 'moscow';
            if (loc === 'санкт-петербург') loc = 'spb';
            selectedCountry = loc;
            if (lastOpenedPlan) {
                updateOrderModalPrice(lastOpenedPlan);
            }
        });
    }

    // Обработчик клика по тарифу (универсально для всех страниц)
    document.querySelectorAll('.plan').forEach(plan => {
        plan.addEventListener('click', function() {
            lastOpenedPlan = this;
            // Для обычных тарифов
            let planName = this.querySelector('.plan-name')?.textContent;
            let hourlyPrice = this.querySelector('.price-per-hour')?.textContent;
            let monthlyPrice = this.querySelector('.price-per-month')?.textContent;

            // Для dedicated-servers.html
            if (!planName) planName = this.querySelector('.plan-name2')?.textContent;
            if (!hourlyPrice) hourlyPrice = null;
            if (!monthlyPrice) monthlyPrice = this.querySelector('.price-per-month2')?.textContent;

            selectedPlanName.textContent = planName || '';
            // Если есть только месячная цена — показываем её и в orderPrice, и в orderTotal
            if (monthlyPrice && !hourlyPrice) {
                // Для dedicated-servers.html — брать месячную цену из data-атрибута выбранной страны
                if (this.hasAttribute('data-month-' + selectedCountry)) {
                    const month = this.getAttribute('data-month-' + selectedCountry);
                    orderPrice.textContent = `€${parseFloat(month).toFixed(2)}/месяц`;
                    orderTotal.textContent = `€${parseFloat(month).toFixed(2)}/месяц`;
                } else {
                    orderPrice.textContent = monthlyPrice;
                    orderTotal.textContent = monthlyPrice;
                }
                if (billingPeriod) billingPeriod.value = 'monthly';
            } else {
                // Для high_cpu.html — брать цену из data-атрибута выбранной страны
                if (this.hasAttribute('data-price-' + selectedCountry)) {
                    const price = this.getAttribute('data-price-' + selectedCountry);
                    orderPrice.textContent = `€${parseFloat(price).toFixed(2)}/час`;
                    orderTotal.textContent = `€${parseFloat(price).toFixed(2)}/час`;
                } else {
                    orderPrice.textContent = hourlyPrice;
                    orderTotal.textContent = hourlyPrice;
                }
            }
            orderModal.classList.add('active');
        });
    });

    // Закрытие модального окна
    orderModalClose.addEventListener('click', function() {
        orderModal.classList.remove('active');
        lastOpenedPlan = null;
    });

    // Обновление цены при изменении периода оплаты
    if (billingPeriod) {
        billingPeriod.addEventListener('change', function() {
            // Находим активный тариф
            let plan = lastOpenedPlan;
            if (!plan) {
                document.querySelectorAll('.plan').forEach(p => {
                    const name = p.querySelector('.plan-name')?.textContent || p.querySelector('.plan-name2')?.textContent;
                    if (name === selectedPlanName.textContent) plan = p;
                });
            }
            if (this.value === 'monthly') {
                // Для high_cpu.html — брать месячную цену из data-атрибута выбранной страны
                if (plan && plan.hasAttribute('data-month-' + selectedCountry)) {
                    const month = plan.getAttribute('data-month-' + selectedCountry);
                    orderPrice.textContent = `€${parseFloat(month).toFixed(2)}/месяц`;
                    updateTotal(`€${parseFloat(month).toFixed(2)}`);
                } else {
                    let price = plan?.querySelector('.price-per-month')?.textContent || plan?.querySelector('.price-per-month2')?.textContent;
                    if (price) {
                        orderPrice.textContent = price;
                        updateTotal(price);
                    }
                }
            } else if (this.value === 'hourly') {
                if (plan && plan.hasAttribute('data-price-' + selectedCountry)) {
                    const price = plan.getAttribute('data-price-' + selectedCountry);
                    orderPrice.textContent = `€${parseFloat(price).toFixed(2)}/час`;
                    updateTotal(`€${parseFloat(price).toFixed(2)}`);
                } else {
                    let price = plan?.querySelector('.price-per-hour')?.textContent;
                    if (price) {
                        orderPrice.textContent = price;
                        updateTotal(price);
                    }
                }
            }
        });
    }

    // Функция для обновления цены в модальном окне заказа при смене страны
    function updateOrderModalPrice(plan) {
        if (!plan) return;
        if (!billingPeriod) return;
        if (billingPeriod.value === 'monthly') {
            if (plan.hasAttribute('data-month-' + selectedCountry)) {
                const month = plan.getAttribute('data-month-' + selectedCountry);
                orderPrice.textContent = `€${parseFloat(month).toFixed(2)}/месяц`;
                updateTotal(`€${parseFloat(month).toFixed(2)}`);
            }
        } else {
            if (plan.hasAttribute('data-price-' + selectedCountry)) {
                const price = plan.getAttribute('data-price-' + selectedCountry);
                orderPrice.textContent = `€${parseFloat(price).toFixed(2)}/час`;
                updateTotal(`€${parseFloat(price).toFixed(2)}`);
            }
        }
    }

    // Обновление итоговой суммы с учетом скидки
    function updateTotal(price) {
        const discount = parseInt(orderDiscount.textContent);
        const priceValue = parseFloat((price || '').replace('€', ''));
        const total = priceValue * (1 - discount / 100);
        orderTotal.textContent = `€${total.toFixed(2)}`;
    }

    // Обработка отправки формы
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить логику отправки данных на сервер
        const formData = {
            plan: selectedPlanName.textContent,
            billingPeriod: billingPeriod?.value,
            location: document.getElementById('location').value,
            os: document.getElementById('os').value,
            price: orderPrice.textContent,
            total: orderTotal.textContent,
            country: selectedCountry
        };

        console.log('Order submitted:', formData);
        
        // Закрываем модальное окно после отправки
        orderModal.classList.remove('active');
        lastOpenedPlan = null;
        
        // Можно добавить уведомление об успешном заказе
        alert('Заказ успешно оформлен!');
    });

    // --- Кастомные выпадающие списки ---
    function setupCustomSelect(selectId, inputId, onChange) {
        const custom = document.getElementById(selectId);
        if (!custom) return;
        const selected = custom.querySelector('.selected-option');
        const options = custom.querySelector('.options-list');
        const optionItems = custom.querySelectorAll('.option-item');
        const hiddenInput = document.getElementById(inputId);

        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.custom-select').forEach(cs => {
                if (cs !== custom) cs.classList.remove('open');
            });
            custom.classList.toggle('open');
        });

        optionItems.forEach(option => {
            option.addEventListener('click', function() {
                const icon = option.querySelector('.option-icon').src;
                const label = option.querySelector('span').textContent;
                selected.querySelector('.option-icon').src = icon;
                selected.querySelector('.option-label').textContent = label;
                hiddenInput.value = option.dataset.value;
                custom.classList.remove('open');
                if (typeof onChange === 'function') onChange(option.dataset.value);
            });
        });

        document.addEventListener('click', function(e) {
            if (!custom.contains(e.target)) {
                custom.classList.remove('open');
            }
        });
    }

    // --- Инициализация кастомных select ---
    setupCustomSelect('customBillingPeriod', 'billingPeriod', function(val) {
        // Триггерим смену периода оплаты (обновление цены)
        if (typeof billingPeriod !== 'undefined') billingPeriod.value = val;
        if (typeof billingPeriod !== 'undefined' && billingPeriod.dispatchEvent) {
            billingPeriod.dispatchEvent(new Event('change'));
        }
    });
    setupCustomSelect('customLocationSelect', 'location', function(val) {
        // Триггерим смену локации (обновление цены)
        if (typeof locationSelect !== 'undefined') locationSelect.value = val;
        if (typeof locationSelect !== 'undefined' && locationSelect.dispatchEvent) {
            locationSelect.dispatchEvent(new Event('change'));
        }
    });
    setupCustomSelect('customOsSelect', 'os', function(val) {
        // Можно добавить обработку смены ОС, если нужно
    });

    // --- Удаляю обработчики для обычных select (location, billingPeriod, os) ---
    // (Они теперь не нужны, всё через кастомные select)
}); 