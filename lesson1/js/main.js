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

    // getCost() {
    //     let sum = 0;
    //     for (let product of this.products) {
    //         sum += product.price;
    //     }
    //     return sum;
    // }
    //в CartItem будет использоваться метод для подсчета стоимости одного вида товара (товар * количество)
    //а в Cart  метод для подсчета общей суммы всех товаров

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


// Товар в Корзине
class CartItem extends Product {
    constructor(product, count = 1) {
        super(product);
        this.count = count;
    }

    incCount() {
        this.count++;
    } // метод увеличения количества товара
    decCount() {
        this.count--;
    } // метод уменьшения количества товара

    getCost() {
        let cost = this.price * this.count;
        return cost;
    } // метод посчета стоимости

    render() {
        return `<div class="cart-item">
                <h3 class="cart-title">${this.title}</h3>
                <p class="cart-price">${this.price}</p>
                <button class="btn btn-remove">Удалить</button>
            </div>`;
    }
}


// Корзина
class Cart {
    constructor(container = '.cart') {
        this.purchases = [];
        this.container = document.querySelector(container);
    }

    add(product) {
        const item = new CartItem(product);
        this.purchases.push(item);

        this.render();
    } // метод добавления товара в корзину

    remove() {

        this.render();
    } // метод удаления товара из корзины
    clear() {
        this.purchases = [];

        this.render();
    } // метод очистки корзины

    // getCount() { } // метод подсчета количества
    getCost() {
        let cost = 0;
        for (let purchasesEl of this.purchases) {
            cost = cost + purchasesEl;
        }
        return cost;
    } // метод посчета стоимости

    render() {
        for (let purchasesEl of this.purchases) {
            this.container.insertAdjacentHTML('beforeend', purchasesEl.render());
        }
    } // метод для рендера списка покупок

}


//старый код

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