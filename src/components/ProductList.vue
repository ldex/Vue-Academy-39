<template>
  <div>
    <h2>{{ title }}</h2>

    <ag-grid-vue
      :rowData="props.products"
      :columnDefs="columnDefs"
      :pagination="true"
      :paginationPageSize="props.pageSize"
      :paginationPageSizeSelector="[props.pageSize, 10, 50]"
      style="height: 310px"
      @row-clicked="onRowClicked"
    />

    <div v-if="userStore.isLoggedIn" style="margin-top: 10px">
          <router-link to="/product/insert">Create new product...</router-link>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types';
import { useRouter } from 'vue-router'
import useList from "@/composables/items-list";
import { useUserStore } from '@/stores/user';
import { AgGridVue } from "ag-grid-vue3";
import type { ColDef, RowClickedEvent } from 'ag-grid-community';
import { ref } from 'vue';

const userStore = useUserStore();

// Define a case-insensitive comparator as the default string comparator is case-sensitive
const caseInsensitiveComparator = (valueA: string, valueB: string) => {
  if (valueA === valueB) return 0;
  if (valueA === null || valueA === undefined) return -1;
  if (valueB === null || valueB === undefined) return 1;

  // localeCompare is the most robust way to compare strings
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

const columnDefs = ref<ColDef<Product>[]>([
  {
    field: "name",
    filter: true,
    comparator: caseInsensitiveComparator
  },
  { field: "description" },
  { field: "price", valueFormatter: (p) => "$" + p.value.toLocaleString() }
]);

function onRowClicked(event: RowClickedEvent<Product>): void {
  if (event.data) {
    onSelect(event.data);
  }
}

const router = useRouter()

function onSelect(product: Product): void {
      router.push({ name: "product", params: { id: product.id } });
}

interface Props {
  products: Product[],
  pageSize?: number
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 5,
  title: 'Products'
});

// composable not used anymore since adding ag-grid, but keeping it for future use if we want to add a non-ag-grid list view
//const { sort, nextPage, prevPage, filterName, pageNumber, pageCount, sortedFilteredPaginatedItems: sortedFilteredPaginatedProducts } = useList<Product>(props.products, props.pageSize, "modifiedDate", "desc")
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