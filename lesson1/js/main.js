const products = [
    { id: 1, title: 'Notenook', price: 2000 },
    { id: 2, title: 'Keyboard', price: 200 },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
];


const renderProduct = (product, img = '../lesson1/img/placeholder.png" alt="placeholder') => {
    return `<div class="product-item">
                <img src="${img}" alt="${product.title}">
                <h3 class="product-title">${product.title}</h3>
                <p  class="product-price">${product.price}</p>
                <button class="btn btn-buy">В корзину</button>
            </div>`
};

const render = productsList => {
    document.querySelector('.products').innerHTML = productsElements.join('');
};

render(products);