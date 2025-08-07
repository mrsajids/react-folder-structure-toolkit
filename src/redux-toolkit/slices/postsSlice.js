import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost
} from "../../services/postsApi";

// Async thunks for CRUD operations
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPostById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      const response = await updatePost(id, postData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (id, { rejectWithValue }) => {
    try {
      await deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    operationLoading: {
      create: false,
      update: false,
      delete: false,
      fetchById: false
    }
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Helper function to handle pending states (DRY principle)
    const handlePending = (state, _action, operationType = null) => {
      if (operationType) {
        state.operationLoading[operationType] = true;
      } else {
        state.loading = true;
      }
      state.error = null;
    };

    // Helper function to handle rejected states (DRY principle)
    const handleRejected = (state, action, operationType = null) => {
      if (operationType) {
        state.operationLoading[operationType] = false;
      } else {
        state.loading = false;
      }
      state.error = action.payload;
    };

    builder
      // Get all posts
      .addCase(getPosts.pending, (state) => handlePending(state))
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => handleRejected(state, action))

      // Get post by ID
      .addCase(getPostById.pending, (state) => handlePending(state, null, 'fetchById'))
      .addCase(getPostById.fulfilled, (state, action) => {
        state.operationLoading.fetchById = false;
        state.currentPost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => handleRejected(state, action, 'fetchById'))

      // Add post
      .addCase(addPost.pending, (state) => handlePending(state, null, 'create'))
      .addCase(addPost.fulfilled, (state, action) => {
        state.operationLoading.create = false;
        state.posts.unshift(action.payload); // Add to beginning of array
      })
      .addCase(addPost.rejected, (state, action) => handleRejected(state, action, 'create'))

      // Update post
      .addCase(editPost.pending, (state) => handlePending(state, null, 'update'))
      .addCase(editPost.fulfilled, (state, action) => {
        state.operationLoading.update = false;
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(editPost.rejected, (state, action) => handleRejected(state, action, 'update'))

      // Delete post
      .addCase(removePost.pending, (state) => handlePending(state, null, 'delete'))
      .addCase(removePost.fulfilled, (state, action) => {
        state.operationLoading.delete = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(removePost.rejected, (state, action) => handleRejected(state, action, 'delete'));
  },
});

export const { clearError, clearCurrentPost, setCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
