import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { addPost, editPost, clearError } from '../../redux-toolkit/slices/postsSlice';

const PostForm = ({ 
  visible, 
  onHide, 
  post = null, 
  toast 
}) => {
  const dispatch = useDispatch();
  const { operationLoading, error } = useSelector((state) => state.posts);
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1 // Default user ID
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  const isEditMode = Boolean(post);
  const isLoading = isEditMode ? operationLoading.update : operationLoading.create;

  // Initialize form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        body: post.body || '',
        userId: post.userId || 1
      });
    } else {
      setFormData({
        title: '',
        body: '',
        userId: 1
      });
    }
    setFormErrors({});
  }, [post]);

  // Clear error when component unmounts or dialog closes
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, error]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.body.trim()) {
      errors.body = 'Body is required';
    } else if (formData.body.trim().length < 10) {
      errors.body = 'Body must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const postData = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: formData.userId
      };

      if (isEditMode) {
        await dispatch(editPost({ id: post.id, postData })).unwrap();
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Post updated successfully',
          life: 3000
        });
      } else {
        await dispatch(addPost(postData)).unwrap();
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Post created successfully',
          life: 3000
        });
      }
      
      onHide();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: error || 'An error occurred',
        life: 5000
      });
    }
  };

  // Handle dialog close
  const handleClose = () => {
    if (!isLoading) {
      setFormData({ title: '', body: '', userId: 1 });
      setFormErrors({});
      onHide();
    }
  };

  const dialogHeader = isEditMode ? 'Edit Post' : 'Create New Post';

  return (
    <Dialog
      header={dialogHeader}
      visible={visible}
      onHide={handleClose}
      style={{
        width: '50vw',
        minWidth: '400px',
        maxWidth: '600px'
      }}
      modal
      closable={!isLoading}
      draggable={false}
      resizable={false}
      className="post-form-dialog"
    >
      <div className="p-6">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="title" className="block text-900 font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <InputText
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter an engaging title for your post..."
              disabled={isLoading}
              className={`w-full ${formErrors.title ? 'p-invalid' : ''}`}
              style={{
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '1rem'
              }}
            />
            {formErrors.title && (
              <small className="p-error block mt-1">{formErrors.title}</small>
            )}
          </div>

          <div className="field mb-4">
            <label htmlFor="body" className="block text-900 font-semibold mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <InputTextarea
              id="body"
              value={formData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="Write your post content here..."
              rows={8}
              disabled={isLoading}
              className={`w-full ${formErrors.body ? 'p-invalid' : ''}`}
              style={{
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '1rem',
                lineHeight: '1.5',
                resize: 'vertical'
              }}
            />
            {formErrors.body && (
              <small className="p-error block mt-1">{formErrors.body}</small>
            )}
          </div>

          <div className="field mb-6">
            <label htmlFor="userId" className="block text-900 font-semibold mb-2">
              User ID
            </label>
            <InputText
              id="userId"
              type="number"
              value={formData.userId}
              onChange={(e) => handleInputChange('userId', parseInt(e.target.value) || 1)}
              placeholder="Enter user ID (1-10)"
              disabled={isLoading}
              min="1"
              max="10"
              className="w-full"
              style={{
                borderRadius: '8px',
                padding: '0.75rem'
              }}
            />
          </div>

          <div className="flex justify-content-end gap-3 pt-4 border-top-1 surface-border">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              outlined
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 py-2"
              style={{ borderRadius: '8px' }}
            />
            <Button
              type="submit"
              label={isEditMode ? 'Update Post' : 'Create Post'}
              loading={isLoading}
              disabled={isLoading}
              className="px-4 py-2"
              style={{
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none'
              }}
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default PostForm;
