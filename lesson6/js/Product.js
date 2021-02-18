export const Product = {
    props: ['product'],
    template: `<div class="product">
                    <img :src="product.img" :alt="product.title">
                    <h3 class="product-title">{{product.title}}</h3>
                    <p class="product-price">{{product.price}} ₽</p>
                    <button class="btn btn-buy" @click="$root.add(product)">Купить</button>
                </div>`
}