import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux-toolkit/slices/postsSlice';
import PostList from '../../components/post/PostList';

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <PostList posts={posts} />;
};

export default PostsPage;
