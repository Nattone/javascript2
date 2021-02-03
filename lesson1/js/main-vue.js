const Shop = {
    data() {
        return {
            API: 'https://gist.githubusercontent.com/Nattone/49660fa6ce529a0eed7d6c24d339c991/raw/b4f85175d027602d5bd4958e1228975e9aad253a',
            catalogUrl: '/catalog.json',
            products: [],
            cart: [],
            purchases: [],
            isCartOpen: false
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },

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
            this.purchases = []
        },

        // // метод подсчета общего количества
        // getTotalCount() {
        //     let count = 0;
        //     for (let purchase of this.purchases) {
        //         count += purchase.count;
        //     }
        //     return count;
        // }

    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                this.data = data;
                for (let { id_product, product_name, ...dataEl } of this.data) {
                    const product = {
                        id: id_product,
                        title: product_name,
                        ...dataEl
                    };
                    this.products.push(product);
                }
            })

    } // события жизненного цикла
}
Vue.createApp(Shop).mount('#app');