<template>
  <div>
    <section v-if="errorMessage" class="errorMessage">
      {{ errorMessage }}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <div v-else-if="product">
        <h2>{{ product.name }}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200"
          style="float:right" />
        <h3>{{ product.description }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Fixed price? {{ product.fixedPrice }}</p>
        <p>Discontinued? {{ product.discontinued }}</p>
        <p>Modified date: {{ product.modifiedDate }}</p>
        <p>
          <button @click="deleteWithConfirm(product)" v-if="userStore.isLoggedIn">
            Delete
          </button>
        </p>
      </div>
      <div v-else>
        No product to display!
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const productStore = useProductStore();
const userStore = useUserStore();
const router = useRouter()

const { product, isLoading, errorMessage } = storeToRefs(productStore);

interface Props {
  id: number;
}

const props = defineProps<Props>();

async function deleteWithConfirm(product: Product) {
  if (window.confirm('Are you sure ??')) {
    await productStore.deleteProduct(product);
    if (!errorMessage.value) {
      router.push({ name: "products" });
    }
  }
}

const loadData = async () => {
  isLoading.value = true;
  try {
    await productStore.fetchProduct(props.id);
  } catch (error) {
    errorMessage.value = 'There was an error getting the product from server, ' + error;
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadData);
</script>

<style scoped></style>