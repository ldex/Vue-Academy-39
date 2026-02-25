<template>
<section v-if="errorMessage" class="errorMessage">
      {{errorMessage}}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <product-list v-else :products="products" :page-size="5">
      </product-list>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onErrorCaptured } from 'vue'
import ProductList from '@/components/ProductList.vue';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();

const { products, isLoading, errorMessage } = storeToRefs(productStore);

const loadData = async () => {
  await productStore.fetchProducts()
}

onMounted(loadData);

onErrorCaptured((error) => {
  console.error('Error in component: ', error.message);
  return true;
});
</script>

<style scoped>

</style>