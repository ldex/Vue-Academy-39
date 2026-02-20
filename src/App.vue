<script setup lang="ts">
import ProductList from '@/components/ProductList.vue';
import type { Product } from './types';
import { ref, onMounted } from 'vue'
import ProductService from './services/ProductService';

const errorMessage = ref<string>();
const isLoading = ref<boolean>(false);
const products = ref<Product[]>([]);

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

<template>
  <section v-if="errorMessage" class="errorMessage">
    {{ errorMessage }}
  </section>
  <section v-else>
    <div v-if="isLoading">
      <div class="loader">Loading products...</div>
    </div>
    <product-list v-else :products="products"></product-list>
  </section>
</template>

<style scoped></style>
