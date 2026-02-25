import type { Product } from "@/types";

const baseURL = import.meta.env.VITE_API_SERVER_URL;
const resourceName = "products";

export default {
  async getProducts(): Promise<Product[]> {
    const sortParams = `?sortBy=modifiedDate&order=desc`;
    const url = `${baseURL}/${resourceName}${sortParams}`;

    try {
      const response = await fetch(url); // fetch() returns a promise containing a response object
      const data: Product[] = await response.json(); // json() will parse the content and return a promise with the data as an object, here an array

      // Artificial delay, slowing down the response for testing purpose...
      await new Promise((resolve) => setTimeout(resolve, 800));

      return data;
    } catch (error) {
      console.error("API Error while loading products: ", error); // log technical details in the service
      throw error; // return the error to the component for a user facing message
    }
  },

  async getProduct(id: number): Promise<Product> {
    const url = `${baseURL}/${resourceName}/${id}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("API Error while loading product: ", error);
      throw error;
    }
  },

  async insertProduct(product: Product): Promise<Product> {
    product.modifiedDate = new Date();
    const url = `${baseURL}/${resourceName}`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      console.error("API Error while creating new product: ", error);
      throw error;
    }
  },

   async deleteProduct(product: Product): Promise<void> {
    const url = `${baseURL}/${resourceName}/${product.id}`;
    const options: RequestInit = {
      method: "DELETE",
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("API Error while deleting product: ", error);
      throw error;
    }
  },
};
