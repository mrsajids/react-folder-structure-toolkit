import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Message } from 'primereact/message';
import PostCard from './PostCard';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import { removePost, clearError } from '../../redux-toolkit/slices/postsSlice';
import './PostList.css';

const PostList = ({ posts }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.posts);
  const toast = useRef(null);

  // State for modals and forms
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deletingPostId, setDeletingPostId] = useState(null);

  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterByUser, setFilterByUser] = useState('all');

  // Sort options
  const sortOptions = [
    { label: 'ID (Newest First)', value: 'id' },
    { label: 'Title (A-Z)', value: 'title' },
    { label: 'User ID', value: 'userId' }
  ];

  // Get unique user IDs for filter
  const userOptions = [
    { label: 'All Users', value: 'all' },
    ...Array.from(new Set(posts.map(post => post.userId)))
      .sort((a, b) => a - b)
      .map(userId => ({ label: `User ${userId}`, value: userId }))
  ];

  // Filter and sort posts (DRY principle)
  const getFilteredAndSortedPosts = () => {
    // Create a copy of the posts array to avoid mutating the original
    let filteredPosts = [...posts];

    // Apply search filter
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply user filter
    if (filterByUser !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.userId === filterByUser);
    }

    // Apply sorting
    filteredPosts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filteredPosts;
  };

  // Handle create new post
  const handleCreatePost = () => {
    setSelectedPost(null);
    setShowForm(true);
  };

  // Handle edit post
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowForm(true);
  };

  // Handle view post
  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
  };

  // Handle delete post with confirmation
  const handleDeletePost = (post) => {
    confirmDialog({
      message: `Are you sure you want to delete "${post.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          setDeletingPostId(post.id);
          await dispatch(removePost(post.id)).unwrap();

          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Post deleted successfully',
            life: 3000
          });

          // Close detail dialog if the deleted post was being viewed
          if (selectedPost?.id === post.id) {
            setShowDetail(false);
            setSelectedPost(null);
          }
        } catch (error) {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: error || 'Failed to delete post',
            life: 5000
          });
        } finally {
          setDeletingPostId(null);
        }
      }
    });
  };

  // Clear search and filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterByUser('all');
    setSortBy('id');
    setSortOrder('desc');
  };

  const filteredPosts = getFilteredAndSortedPosts();

  return (
    <div className="posts-page" style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '1.5rem'
    }}>
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Header Section */}
      <div className="posts-header mb-4 p-4 bg-white border-round shadow-1">
        <div className="flex justify-content-between align-items-center ">
          <div>
            <h1 className="text-4xl font-bold text-900 m-0 mb-2">Posts</h1>
            <p className="text-600 m-0 text-lg">
              Create, manage, and organize your posts
            </p>
          </div>
          <Button
            icon="pi pi-plus"
            label="New Post"
            onClick={handleCreatePost}
            className="p-button float-end"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              marginTop:'-2rem',
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Message
          severity="error"
          text={error}
          className="mb-4"
          onRemove={() => dispatch(clearError())}
        />
      )}

      {/* Filters and Search Section */}
      <div className="filters-section mb-4 p-4 bg-white border-round shadow-1">
        <div className="grid">
          <div className="col-12 md:col-5">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-search"></i>
              </span>
              <InputText
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts by title or content..."
                className="w-full"
                style={{ borderRadius: '0 6px 6px 0' }}
              />
            </div>
          </div>

          <div className="col-12 md:col-2">
            <Dropdown
              value={filterByUser}
              options={userOptions}
              onChange={(e) => setFilterByUser(e.value)}
              placeholder="All Users"
              className="w-full"
              style={{ borderRadius: '6px' }}
            />
          </div>

          <div className="col-12 md:col-3">
            <Dropdown
              value={sortBy}
              options={sortOptions}
              onChange={(e) => setSortBy(e.value)}
              className="w-full"
              style={{ borderRadius: '6px' }}
            />
          </div>

          <div className="col-12 md:col-2">
            <div className="flex gap-2">
              <Button
                icon={sortOrder === 'asc' ? 'pi pi-sort-amount-up' : 'pi pi-sort-amount-down'}
                severity="secondary"
                outlined
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                tooltip={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                className="flex-1"
                style={{ borderRadius: '6px' }}
              />
              <Button
                icon="pi pi-filter-slash"
                severity="secondary"
                outlined
                onClick={handleClearFilters}
                tooltip="Clear Filters"
                style={{ borderRadius: '6px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Count */}
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center gap-3">
          <span className="text-900 font-semibold">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
          </span>
          {filteredPosts.length !== posts.length && (
            <span className="text-600 text-sm">
              (filtered from {posts.length} total)
            </span>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="empty-state text-center py-8 px-4">
          <div className="bg-white border-round shadow-1 p-6 inline-block">
            <i className="pi pi-inbox text-6xl text-400 mb-4 block"></i>
            <h3 className="text-900 font-semibold mb-3 text-2xl">
              {posts.length === 0 ? 'No posts yet' : 'No posts found'}
            </h3>
            <p className="text-600 mb-4 text-lg line-height-3">
              {posts.length === 0
                ? "Start creating amazing content by adding your first post!"
                : "Try adjusting your search terms or filter criteria to find what you're looking for."
              }
            </p>
            {posts.length === 0 && (
              <Button
                icon="pi pi-plus"
                label="Create Your First Post"
                onClick={handleCreatePost}
                className="p-button-lg"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="posts-grid">
          <div className="grid">
            {filteredPosts.map((post) => (
              <div key={post.id} className="col-12 sm:col-6 lg:col-4 xl:col-3">
                <PostCard
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onView={handleViewPost}
                  isDeleting={deletingPostId === post.id}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Form Dialog */}
      <PostForm
        visible={showForm}
        onHide={() => {
          setShowForm(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        toast={toast}
      />

      {/* Post Detail Dialog */}
      <PostDetail
        visible={showDetail}
        onHide={() => {
          setShowDetail(false);
          setSelectedPost(null);
        }}
        post={selectedPost}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        isDeleting={deletingPostId === selectedPost?.id}
      />
    </div>
  );
};

export default PostList;
