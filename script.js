let cart = [];

// Загружаем услуги из JSON
fetch('services.json')
    .then(res => res.json())
    .then(services => {
        const container = document.getElementById('services-list');
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <span>${service.price} VC</span>
                <br><br>
                <button onclick="addToCart(${service.id})">Добавить в корзину</button>
            `;
            container.appendChild(card);
        });
    });

function addToCart(id) {
    // Получаем услугу по id (можно сохранить в массиве)
    fetch('services.json')
        .then(res => res.json())
        .then(services => {
            const service = services.find(s => s.id === id);
            cart.push(service);
            updateCart();
        });
}

function updateCart() {
    const list = document.getElementById('cart-items');
    const total = document.getElementById('total-price');
    list.innerHTML = '';
    let sum = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.price} VC`;
        list.appendChild(li);
        sum += item.price;
    });
    total.textContent = sum;
}

// Кнопка "Купить"
document.getElementById('buy-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    alert('✅ Заказ оформлен! Свяжитесь с администратором.');
    cart = [];
    updateCart();
});
