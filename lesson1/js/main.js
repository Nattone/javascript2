const products = [
    { id: 1, title: undefined, price: 2000 },
    { id: 2, title: 'Keyboard', price: undefined },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
];


const renderProduct = (title = 'Товар', price = 0) => (
    `<div class="product-item">
                <h3 class="product-title">${title}</h3>
                <img src="../lesson1/img/placeholder.png" alt="placeholder">
                <p  class="product-price">${price}</p>
                <button class="btn btn-buy">В корзину</button>
            </div>`
);

const render = productsList => {
    const productsElements = productsList.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productsElements.join('');
};

render(products);