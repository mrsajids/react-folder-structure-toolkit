import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { getPosts, clearError } from '../../redux-toolkit/slices/postsSlice';
import PostList from '../../components/post/PostList';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Only fetch posts if we don't have any yet
    if (posts.length === 0) {
      dispatch(getPosts());
    }
  }, [dispatch, posts.length]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-column align-items-center justify-content-center"
           style={{ minHeight: '60vh' }}>
        <ProgressSpinner style={{ width: '50px', height: '50px' }} />
        <p className="mt-3 text-600">Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4">
        <Message
          severity="error"
          text={`Error loading posts: ${error}`}
          className="mb-4"
        />
        <div className="text-center">
          <Button
            icon="pi pi-refresh"
            label="Retry"
            onClick={() => {
              dispatch(clearError());
              dispatch(getPosts());
            }}
            className="p-button-outlined"
          />
        </div>
      </div>
    );
  }

  // Success state - render posts
  return <PostList posts={posts} />;
};

export default PostsPage;
