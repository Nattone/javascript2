export const Product = {
    props: ['product', 'add'],
    template: `<div class="product-item">
                    <img :src="product.img" :alt="product.title">
                    <h3 class="product-title">{{product.title}}</h3>
                    <p class="product-price">{{product.price}} ₽</p>
                    <button class="btn btn-buy" @click="add(product)">Купить</button>
                </div>`
}