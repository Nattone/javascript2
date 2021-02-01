const API = 'https://gist.githubusercontent.com/Nattone/49660fa6ce529a0eed7d6c24d339c991/raw/b4f85175d027602d5bd4958e1228975e9aad253a';

// Item - любой элемент абстрактной структуры, хранящий набор элементов
class Item {
    constructor(product) {
        const {
            title,
            price = 0,
            id,
            img = '../lesson1/img/placeholder.png" alt="placeholder'
        } = product;

        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="${this.title}">
                    <h3 class="product-title">${this.title}</h3>
                    <p class="product-price">${this.price} ₽</p>
                    <button
                        class="btn btn-buy"
                        data-id="${this.id}"
                    >Купить</button>
                </div>`;
    }
}


// класс Product полностью наследует класс Item. Семанически они разные.
class Product extends Item { }

class ProductsList {
    constructor(containerSelector = '.products', cart) {
        this.data = []; // хранит в себе все данные, полученные от сервера. необработанные
        this.products = []; // массив созданных на основе данных экземпляров класса Product
        this.container = document.querySelector(containerSelector); // контейнер на стр, куда отрендеренный товар добавляется
        this.cart = cart; // ссылка на объект корзины

        this._fetchData()
            .then(() => this._render());
    }

    _fetchData() {
        return fetch(`${API}/catalog.json`)
            .then(result => result.json())
            .then(data => {
                this.data = data;
                for (let { id_product, product_name, ...dataEl } of this.data) { //проитерировать все данные, полученные от сервера
                    const product = new Product({
                        id: id_product,
                        title: product_name,
                        ...dataEl
                    }); // происходит создание товара, передаем кусочек данных 
                    this.products.push(product);
                }
            })
    }

    // рендерит товары
    _render() {
        this.container.innerHTML = '';
        for (let product of this.products) { // проитерировать все данные, полученные от сервера
            this.container.insertAdjacentHTML('beforeend', product.render());

            const block = this.container.querySelector(`.product-item[data-id="${product.id}"]`);
            const button = block.querySelector('.btn-buy');
            button.addEventListener('click', () => this.cart.add(product));
        }
    }
}


// Товар в Корзине
class CartItem extends Item {
    constructor(item) {
        super(item);
        this.count = 1;
    }

    // метод увеличения количества товара
    incCount() {
        this.count++;
    }

    // метод уменьшения количества товара
    decCount() {
        this.count--;
    }

    // метод посчета стоимости
    getCost() {
        const cost = this.price * this.count;
        return cost;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <h3 class="cart-title">${this.title}</h3>
                    <p class="cart-price">Цена за шт: ${this.price} ₽</p> <!-- цена этого товара -->
                    <p class="cart-count">Количество: ${this.count} шт</p> <!-- количество этого товара -->
                    <p class="cart-cost">Общая стоимость: ${this.getCost()} ₽</p> <!-- стоимость этого товара -->
                    <button class="btn btn-remove">Удалить</button>
                </div>`;
    }
}

// Корзина
class Cart {
    constructor(containerSelector = '.cart-items') {
        this.purchases = [];
        this.container = document.querySelector(containerSelector);

        this._render();
    }

    // метод добавления товара в корзину
    add(product) {
        const item = this.purchases.find((item) => item.id === product.id);

        if (item) {
            item.incCount();
        } else {
            this.purchases.push(new CartItem(product));
        }

        this._render();
    }

    // метод удаления товара из корзины
    remove(product) {
        const item = this.purchases.find((item) => item.id === product.id);

        if (item.count > 1) {
            item.decCount();
        } else {
            this.purchases.splice(this.purchases.indexOf(item), 1);
        }

        this._render();
    }

    // очистка корзины
    clean() {
        this.purchases = []
        this._render();
    }

    // метод подсчета общего количества
    getTotalCount() {
        let count = 0;
        for (let purchase of this.purchases) {
            count = count + purchase.count;
        }
        return count;
    }

    // метод посчета общей стоимости
    getTotalCost() {
        let cost = 0;
        for (let purchase of this.purchases) {
            cost = cost + purchase.getCost();
        }
        return cost;
    }

    _render() {
        this.container.innerHTML = '';

        for (let purchase of this.purchases) {
            this.container.insertAdjacentHTML('beforeend', purchase.render());

            const block = this.container.querySelector(`.cart-item[data-id="${purchase.id}"]`);
            const button = block.querySelector('.btn-remove');
            button.addEventListener('click', () => this.remove(purchase));
        }

        if (this.purchases.length > 0) {
            const cleanButton = document.createElement("button");
            cleanButton.classList.add('cart-clean', 'btn');
            cleanButton.innerText = 'Очистить корзину';
            cleanButton.addEventListener('click', () => this.clean());

            document.querySelector('.cart-wrapper').insertAdjacentElement('beforeend', cleanButton);

            const emptyText = document.querySelector('.cart-empty');
            if (emptyText) {
                emptyText.remove();
            }
        } else {
            const emptyText = document.createElement("span");
            emptyText.classList.add('cart-empty');
            emptyText.innerText = 'Корзина пуста.';

            document.querySelector('.cart-wrapper').insertAdjacentElement('beforeend', emptyText);

            const cleanButton = document.querySelector('.cart-clean');
            if (cleanButton) {
                cleanButton.remove();
            }

        }

    } // метод для рендера списка покупок
}

const cart = new Cart('.cart-items');
const list = new ProductsList('.products', cart);



const cartBtn = document.querySelector('.cart-btn');
const addClass = document.querySelector('.cart-wrapper');
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addClass.classList.toggle('open');
});
