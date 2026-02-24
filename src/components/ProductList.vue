<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
            Sort by:
            <button @click="sort('name')">Name</button>
            <button @click="sort('price')">Price</button>
            <button @click="sort('modifiedDate')">Date</button>
            <span> Filter by name: <input v-model="filterName" /></span>
        </fieldset>
        <ul class="products">
            <li v-for="product in sortedFilteredPaginatedProducts" v-bind:key="product.id"
                :class='{ discontinued: product.discontinued, selected: selectedProduct?.id === product.id }'
                @click="onSelect(product)"
                :title="JSON.stringify(product)">
                <span class="name">{{ product.name }}</span>
                <span class="description">{{ product.description }}</span>
                <span class="price">{{ product.price }}</span>
            </li>
        </ul>

        <button @click="prevPage" :disabled="pageNumber === 1">
            &lt; Previous
        </button>
        Page {{ pageNumber }}
        <button @click="nextPage" :disabled="pageNumber >= pageCount">
            Next &gt;
        </button>

    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type ComputedRef } from 'vue'
import type { Product } from '@/types';
import { useRouter } from 'vue-router'

const router = useRouter()

function onSelect(product: Product): void {
      router.push({ name: "product", params: { id: product.id } });
}

interface Props {
    products: Product[],
    pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
    pageSize: 5
});
const selectedProduct = ref<Product>();
const filterName = ref<string>('');
const sortName = ref<string>('modifiedDate');
const sortDir = ref<string>('desc');
const pageNumber = ref<number>(1);

let title: string = 'Products';

function nextPage(): void {
    pageNumber.value++;
    selectedProduct.value = undefined;
    throw new Error("testing error...");
}

function prevPage(): void {
    pageNumber.value--;
    selectedProduct.value = undefined;
}

function sort(s: string): void {
    //if s == current sort, reverse order
    if (s === sortName.value) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    }
    sortName.value = s;
}

watch([filterName, sortName, sortDir], () => {
    pageNumber.value = 1;
})

const filteredProducts: ComputedRef<Product[]> = computed(() => {
    let filter: RegExp = new RegExp(filterName.value, 'i')
    return props.products.filter(el => el.name?.match(filter))
})

const sortedFilteredProducts: ComputedRef<Product[]> = computed(() => {
    const modifier = sortDir.value === 'desc' ? -1 : 1;
    const key = sortName.value as keyof Product; // By using keyof Product, TypeScript knows that sortName.value is guaranteed to be a valid key like id, name, price, modifiedDate or discontinued...

    return [...filteredProducts.value].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        // 1. Handle "name" specifically for proper string sorting
        if (key === 'name') {
            return a.name.localeCompare(b.name) * modifier;
        }

        // 2. Handle potential undefined/null values (Optional fields)
        // This moves undefined items to the bottom regardless of sort order
        if (valA === undefined) return 1;
        if (valB === undefined) return -1;

        // 3. Generic Comparison for numbers, booleans, or dates
        if (valA < valB) return -1 * modifier;
        if (valA > valB) return 1 * modifier;

        return 0;
    });
});

const sortedFilteredPaginatedProducts: ComputedRef<Product[]> = computed(() => {
    const start: number = (pageNumber.value - 1) * props.pageSize
    const end: number = start + props.pageSize;

    return sortedFilteredProducts.value.slice(start, end);
})

const pageCount: ComputedRef<number> = computed(() => {
    const l: number = filteredProducts.value.length
    const s: number = props.pageSize;
    return Math.floor(l / s);
})
</script>

<style scoped>
.filters {
    padding: 10px
}

.filters button {
    margin-right: 4px
}

.products {
    margin: 0;
    list-style-type: none;
    padding: 0;
}

.products li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.8em;
    border-radius: 4px;
}

.products li:hover {
    color: #607D8B;
    background-color: yellow;
    left: .1em;
}

.products li:hover .name,
.products li:hover .price {
    color: #607D8B;
    background-color: #FFD800;
    left: .1em;
}

.products li.selected {
    background-color: #0094FF;
    color: white;
}

.products li.selected:hover {
    color: white;
}

.products li.selected .name,
.products li.selected .price {
    background-color: #0026FF;
    color: white;
}

.products .text {
    padding: 0.5em 0.7em 0em 0.7em;
    line-height: 1em;
    left: -1px;
    top: -4px;
    height: 1.8em;
}

.products .name {
    display: inline-block;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .price {
    float: right;
    width: 15%;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-left: .8em;
    border-radius: 0px 4px 4px 0px;
}

.products .description {
    height: 1.8em;
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .discontinued,
.products .discontinued * {
    color: red !important;
}
</style>