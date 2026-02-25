import { reactive, toRefs, watch, computed, type ComputedRef } from "vue";

interface Item {
  name: string;
  [key: string]: any;
}

interface State<T> {
  selectedItem: T | undefined;
  filterName: string;
  sortName: string;
  sortDir: 'asc' | 'desc';
  pageNumber: number;
}

export default function useList<T extends Item>(
  items: T[],
  pageSize: number,
  defaultSortName: string,
  defaultSortDir: 'asc' | 'desc'
) {
  const state = reactive<State<T>>({
    selectedItem: undefined,
    filterName: "",
    sortName: defaultSortName,
    sortDir: defaultSortDir,
    pageNumber: 1,
  });

  watch([() => state.filterName, () => state.sortName, () => state.sortDir], () => {
    state.pageNumber = 1;
  })

  const sort = (s: string): void => {
    if (s === state.sortName) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    }
    state.sortName = s;
  };

  const nextPage = (): void => {
    state.pageNumber++;
    state.selectedItem = undefined;
  };

  const prevPage = (): void => {
    state.pageNumber--;
    state.selectedItem = undefined;
  };

const pageCount: ComputedRef<number> = computed(() => {
  const l: number = filteredItems.value.length
  const s: number = pageSize;
  return Math.floor(l / s);
})

  const filteredItems: ComputedRef<T[]> = computed(() => {
    const filter: RegExp = new RegExp(state.filterName, "i");
    return items.filter((el) => el.name?.match(filter));
  });

  const sortedFilteredItems: ComputedRef<T[]> = computed(() => {
      const modifier = state.sortDir === 'desc' ? -1 : 1;
      const key = state.sortName as keyof T;

      return [...filteredItems.value].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (key === 'name') {
        return a.name.localeCompare(b.name) * modifier;
        }

        if (valA === undefined) return 1;
        if (valB === undefined) return -1;

        if (valA < valB) return -1 * modifier;
        if (valA > valB) return 1 * modifier;

        return 0;
    });
  });

  const sortedFilteredPaginatedItems: ComputedRef<T[]> = computed(() => {
    const start: number = (state.pageNumber - 1) * pageSize
    const end: number = start + pageSize;

    return sortedFilteredItems.value.slice(start, end);
  });

  const itemsNumber: ComputedRef<number> = computed(() => {
    return sortedFilteredItems.value.length;
  });

  return {
    sort,
    nextPage,
    prevPage,
    pageCount,
    itemsNumber,
    sortedFilteredPaginatedItems,
    ...toRefs(state),
  };
}