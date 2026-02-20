import type { Product } from "@/types";

const baseURL = import.meta.env.VITE_API_SERVER_URL
const resourceName = 'products';

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
      console.error("API Error while loading products:", error); // log technical details in the service
      throw error; // return the error to the component for a user facing message
    }
  },

}