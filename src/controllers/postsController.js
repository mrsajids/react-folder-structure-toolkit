// This controller can be expanded for more complex logic or error handling
import { fetchPosts } from '../services/postsApi';

export const getAllPosts = async () => {
  try {
    const posts = await fetchPosts();
    return posts;
  } catch (error) {
    throw error;
  }
};
