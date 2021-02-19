import { CartItem } from "./CartItem.js";

export const Cart = {
    components: {
        CartItem
    },
    data() {
        return {
            purchases: [],
            isCartOpen: false
        }
    },
    methods: {
        toggleCart() {
            if (this.isCartOpen) {
                this.isCartOpen = false;
            } else {
                this.isCartOpen = true;
            }
        },

        // метод добавления товара в корзину
        add(product) {
            const item = this.purchases.find((item) => item.id === product.id);

            if (item) {
                item.count++;
            } else {
                this.purchases.push({
                    ...product,
                    count: 1
                });
            }
        },

        // метод удаления товара из корзины
        remove(product) {
            const item = this.purchases.find((item) => item.id === product.id);

            if (item.count > 1) {
                item.count--;
            } else {
                this.purchases.splice(this.purchases.indexOf(item), 1);
            }
        },

        // очистка корзины
        clean() {
            this.purchases = [];
        },

        // подсчёт общей стоимости корзины
        getTotalCost() {
            let sum = 0;
            for (let { price, count } of this.purchases) {
                sum += (price * count);
            }
            return sum;
        }
    },
    template: `
                <div class="cart">
                <button class="btn cart-btn" type="button" @click="toggleCart()">Корзина</button>
                <div class="cart-wrapper" v-bind:class="{ open: isCartOpen }">
                    <div class="cart-items">
                        <CartItem v-for="el of purchases"  
                            :key="el.id"
                            :purchase="el"
                        />
                    </div>
                    <div class="cart-sum" v-if="purchases.length > 0">
                        <div class="cart-total-cost">Сумма покупок: {{getTotalCost()}} ₽</div>
                        <button class="btn cart-clean" type="button" @click="clean()">
                            Очистить корзину
                        </button>
                    </div>
                    <span class="cart-empty" v-else>Корзина пуста</span>
                </div>
            </div>`
}