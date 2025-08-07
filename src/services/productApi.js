// GET all products
export const fetchProducts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching products");
  }
};
