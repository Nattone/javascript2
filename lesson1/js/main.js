class Product {
    constructor(product, img = '../lesson1/img/placeholder.png" alt="placeholder') {
        let { title, price = 0, id } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="${this.title}">
                <h3 class="product-title">${this.title}</h3>
                <p  class="product-price">${this.price}</p>
                <button class="btn btn-buy">В корзину</button>
            </div>`;
    }
}

class ProductsList {
    constructor(container = '.products') {
        this.data = []; //хранит в себе все данные, полученные от сервера. необработанные
        this.products = []; //массив созданных на основе данных экземпляров класса Product
        this.container = document.querySelector(container); //контейнер на стр, куда отрендеренный товар добавляется
        this._fetchData();
        this._render();
    }

    _fetchData() { //пока захардкожено, без сервера
        this.data = [
            { id: 1, title: 'Notenook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Gamepad' },
        ];

    }

    _render() { //рендерит товары
        for (let dataEl of this.data) { //проитерировать все данные, полученные от сервера
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

const list = new ProductsList();

class CartItem extends Product {
    constructor(product, count = 1) {
        super(product);
        this.count = count;
    }

    incCount() { } // метод увеличения количества товара
    decCount() { } // метод уменьшения количества товара

    render() {
        return `<div class="cart-item">
                <h3 class="cart-title">${this.title}</h3>
                <p class="cart-price">${this.price}</p>
                <button class="btn btn-remove">Удалить</button>
            </div>`;
    }
}

class Cart {
    constructor(container = '.cart') {
        this.purchases = [];
        this.container = document.querySelector(container);

    }

    add() { } // метод добавления товара в корзину
    remove() { } // метод удаления товара из корзины
    clear() { } // метод очистки корзины

    getCount() { } // метод подсчета количества
    getCost() { } // метод посчета стоимости

    render() { } // метод для рендера списка покупок
}

// const products = [
//     { id: 1, title: 'Notenook', price: 2000 },
//     { id: 2, title: 'Keyboard', price: 200 },
//     { id: 3, title: 'Mouse', price: 100 },
//     { id: 4, title: 'Gamepad', price: 87 },
// ];


// const renderProduct = (product, img = '../lesson1/img/placeholder.png" alt="placeholder') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="${product.title}">
//                 <h3 class="product-title">${product.title}</h3>
//                 <p  class="product-price">${product.price}</p>
//                 <button class="btn btn-buy">В корзину</button>
//             </div>`
// };

// const render = productsList => {
//     document.querySelector('.products').innerHTML = productsElements.join('');
// };

// render(products);