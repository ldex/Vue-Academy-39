<template>
    <section v-if="errorMessage" class="errorMessage">
        {{ errorMessage }}
    </section>
    <section v-else>
        <div v-if="isLoading">
            <div class="loader">Loading products...</div>
        </div>
        <product-list v-else :products="products" :page-size="5"></product-list>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductList from '@/components/ProductList.vue';
import ProductService from '@/services/ProductService';
import type { Product } from '@/types';

const products = ref<Product[]>([]);
const errorMessage = ref<string>();
const isLoading = ref<boolean>(false);

const loadData = async () => {
    isLoading.value = true;
    try {
        products.value = await ProductService.getProducts();
    } catch (error) {
        errorMessage.value = 'There was an error getting products from server, ' + error;
    } finally {
        isLoading.value = false;
    }
}

onMounted(loadData);
</script>

<style scoped></style>