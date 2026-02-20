<template>
    <div v-if="product">
        <h2>{{ product.name }}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200"
            style="float:right" />
        <h3>{{ product.description }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Fixed price? {{ product.fixedPrice }}</p>
        <p>Discontinued? {{ product.discontinued }}</p>
        <p>Modified date: {{ product.modifiedDate }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';

interface Props {
    product: Product | undefined;
}

const props = defineProps<Props>();
</script>

<style scoped></style>