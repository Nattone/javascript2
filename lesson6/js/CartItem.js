export const CartItem = {
    props: ['purchase'],
    template: `<div class="cart-item">
                    <h3 class="cart-title">{{purchase.title}}</h3>
                    <p class="cart-price">Цена за шт: {{purchase.price}} ₽</p> <!-- цена этого товара -->
                    <p class="cart-count">Количество: {{purchase.count}} шт</p> <!-- количество этого товара -->
                    <p class="cart-cost">Общая стоимость: {{purchase.price * purchase.count}} ₽</p>
                    <!-- стоимость этого товара -->
                    <button class="btn btn-remove" @click="remove(purchase)">Удалить</button>
                </div>`
}