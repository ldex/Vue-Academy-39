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
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';
import { onMounted, ref } from 'vue'
import ProductService from '@/services/ProductService'

interface Props {
    id: number;
}

const props = defineProps<Props>();

const product = ref<Product>();
const errorMessage = ref<string>();
const isLoading = ref<boolean>(false);

isLoading.value = true;

const loadData = async () => {
    isLoading.value = true;
    try {
        product.value = await ProductService.getProduct(props.id);
    } catch (error) {
        errorMessage.value = 'There was an error getting the product from server, ' + error;
    } finally {
        isLoading.value = false;
    }
}

onMounted(loadData);
</script>

<style scoped></style>