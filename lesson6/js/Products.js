import { Product } from "./Product.js";

export const Products = {
    components: {
        Product
    },
    data() {
        return {
            catalogUrl: '/catalog.json',
            products: []
        }
    },
    // computed: {
    //     filtered() {
    //         return this.products.filter(item => new RegExp(this.search, 'i').test(item.title));
    //     }
    // },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
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

    },
    template: `<div class="products">
                    <Product v-for="el of products"  
                        :key="el.id"
                        :product="el"
                        :add="this.$root.onProductClick"
                    />
                </div>`
}