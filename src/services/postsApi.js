import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Create axios instance with default config (DRY principle)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic error handler (DRY principle)
const handleApiError = (error, operation) => {
  console.error(`Error during ${operation}:`, error);
  throw error;
};

// GET all posts
export const fetchPosts = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetching posts');
  }
};

// GET post by ID
export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching post with ID ${id}`);
  }
};

// POST create new post
export const createPost = async (postData) => {
  try {
    const response = await api.post('', postData);
    // Since JSONPlaceholder doesn't actually create posts, we simulate it
    return {
      ...response.data,
      id: Date.now(), // Generate a unique ID for demo purposes
    };
  } catch (error) {
    handleApiError(error, 'creating post');
  }
};

// PUT update existing post
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/${id}`, postData);
    return response.data;
  } catch (error) {
    handleApiError(error, `updating post with ID ${id}`);
  }
};

// PATCH partial update (alternative to PUT)
export const patchPost = async (id, partialData) => {
  try {
    const response = await api.patch(`/${id}`, partialData);
    return response.data;
  } catch (error) {
    handleApiError(error, `patching post with ID ${id}`);
  }
};

// DELETE post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `deleting post with ID ${id}`);
  }
};
