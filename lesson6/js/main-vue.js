import { Products } from './Products.js';
import { Cart } from './Cart.js';

const Shop = {
    components: {
        Products,
        Cart
    },

    data() {
        return {
            API: 'https://gist.githubusercontent.com/Nattone/49660fa6ce529a0eed7d6c24d339c991/raw/b4f85175d027602d5bd4958e1228975e9aad253a',
            search: ''
        }
    },

    methods: {
        onProductClick(product) {
            this.$refs.cart.add(product)
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
    }
}
Vue.createApp(Shop).mount('#app');