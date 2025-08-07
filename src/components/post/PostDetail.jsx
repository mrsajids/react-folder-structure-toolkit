import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';

const PostDetail = ({ 
  visible, 
  onHide, 
  post, 
  onEdit, 
  onDelete,
  isDeleting = false 
}) => {
  if (!post) return null;

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Dialog header with post info
  const dialogHeader = (
    <div className="flex align-items-center gap-3">
      <i className="pi pi-file-edit text-2xl text-primary"></i>
      <div>
        <h3 className="m-0">Post Details</h3>
        <small className="text-600">ID: {post.id}</small>
      </div>
    </div>
  );

  // Dialog footer with action buttons
  const dialogFooter = (
    <div className="flex justify-content-between align-items-center">
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          label="Edit"
          severity="warning"
          outlined
          onClick={() => {
            onHide();
            onEdit?.(post);
          }}
        />
        <Button
          icon="pi pi-trash"
          label="Delete"
          severity="danger"
          outlined
          onClick={() => onDelete?.(post)}
          loading={isDeleting}
          disabled={isDeleting}
        />
      </div>
      <Button
        icon="pi pi-times"
        label="Close"
        severity="secondary"
        onClick={onHide}
      />
    </div>
  );

  return (
    <Dialog
      header={dialogHeader}
      visible={visible}
      onHide={onHide}
      style={{ width: '70vw', minWidth: '400px', maxWidth: '800px' }}
      modal
      draggable={false}
      resizable={false}
      footer={dialogFooter}
    >
      <div className="p-4">
        {/* User Information */}
        <div className="flex align-items-center gap-3 mb-4 p-3 surface-100 border-round">
          <Avatar 
            label={`U${post.userId}`} 
            size="large" 
            style={{ backgroundColor: '#2196F3', color: '#ffffff' }}
          />
          <div>
            <div className="font-semibold text-900 text-lg">User {post.userId}</div>
            <div className="text-600">
              Post ID: <Badge value={post.id} severity="info" />
            </div>
          </div>
        </div>

        <Divider />

        {/* Post Title */}
        <div className="mb-4">
          <h2 className="text-900 font-semibold line-height-3 m-0">
            {post.title}
          </h2>
        </div>

        <Divider />

        {/* Post Body */}
        <div className="mb-4">
          <h4 className="text-700 font-medium mb-3">Content:</h4>
          <div className="text-700 line-height-3 text-justify">
            {post.body}
          </div>
        </div>

        {/* Post Metadata */}
        <div className="surface-50 p-3 border-round">
          <h4 className="text-700 font-medium mb-3">Post Information:</h4>
          <div className="grid">
            <div className="col-12 md:col-6">
              <div className="flex align-items-center gap-2 mb-2">
                <i className="pi pi-hashtag text-600"></i>
                <span className="font-medium">Post ID:</span>
                <Badge value={post.id} severity="info" />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <div className="flex align-items-center gap-2 mb-2">
                <i className="pi pi-user text-600"></i>
                <span className="font-medium">User ID:</span>
                <Badge value={post.userId} severity="success" />
              </div>
            </div>
            <div className="col-12">
              <div className="flex align-items-center gap-2 mb-2">
                <i className="pi pi-align-left text-600"></i>
                <span className="font-medium">Content Length:</span>
                <Badge value={`${post.body?.length || 0} characters`} severity="warning" />
              </div>
            </div>
            <div className="col-12">
              <div className="flex align-items-center gap-2">
                <i className="pi pi-tag text-600"></i>
                <span className="font-medium">Title Length:</span>
                <Badge value={`${post.title?.length || 0} characters`} severity="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PostDetail;
