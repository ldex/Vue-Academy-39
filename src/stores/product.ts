import { defineStore } from "pinia";
import ProductService from "@/services/ProductService";
import type { Product } from "@/types";

interface ProductState {
  errorMessage: string | null;
  isLoading: boolean;
  products: Product[];
  product: Product;
}

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    errorMessage: null,
    isLoading: false,
    products: [],
    product: {} as Product,
  }),
  getters: {
    getProductById:
      (state) =>
      (id: number): Product | undefined => {
        return state.products.find((product) => product.id === id);
      },
  },
  actions: {
    async fetchProducts(): Promise<void> {
      this.errorMessage = null;
      this.isLoading = true;
      try {
        this.products = await ProductService.getProducts();
      } catch (error) {
        this.errorMessage =
          "There was an error getting products from server, " + error;
      } finally {
        this.isLoading = false;
      }
    },
    async createProduct(newProduct: Product): Promise<void> {
      this.errorMessage = null;
      this.isLoading = true;
      try {
        const productCreated: Product = await ProductService.insertProduct(
          newProduct
        );
        this.products.push(productCreated);
      } catch (error) {
        this.errorMessage = "There was an error creating product, " + error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProduct(id: number): Promise<void> {
      this.errorMessage = null;
      let p = this.getProductById(id);
      if (p == null) {
        this.isLoading = true;
        try {
          this.product = await ProductService.getProduct(id);
        } catch (error) {
          this.errorMessage = "There was an error getting the product from server, " + error;
        } finally {
          this.isLoading = false;
        }
      } else {
        this.product = p;
      }
    },
    async deleteProduct(product: Product): Promise<void> {
      this.errorMessage = null;
      this.isLoading = true;
      try {
         await ProductService.deleteProduct(product);
         this.products = this.products.filter((p) => p.id !== product.id);
      } catch (error) {
          this.errorMessage = "There was an error deleting the product on the server, " + error;
      } finally {
          this.isLoading = false;
      }
    },
  },
});
