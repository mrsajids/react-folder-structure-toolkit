import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';

const PostCard = ({
  post,
  onEdit,
  onDelete,
  onView,
  isDeleting = false
}) => {
  // Truncate text helper function (DRY principle)
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Get user avatar color based on userId
  const getUserColor = (userId) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    return colors[userId % colors.length];
  };

  return (
    <div className="post-card-container">
      <Card className="post-card h-full">
        {/* Header Section */}
        <div className="post-header mb-3">
          <div className="flex align-items-center justify-content-between mb-3">
            <div className="flex align-items-center gap-3">
              <Avatar
                label={`${post.userId}`}
                size="normal"
                style={{
                  backgroundColor: getUserColor(post.userId),
                  color: '#ffffff',
                  fontWeight: 'bold'
                }}
              />
              <div>
                <div className="font-semibold text-900 text-sm">User {post.userId}</div>
                <Chip
                  label={`#${post.id}`}
                  className="text-xs"
                  style={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.5rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="post-title text-900 font-semibold line-height-3 m-0 mb-3">
            {truncateText(post.title, 50)}
          </h3>
        </div>

        {/* Content Section */}
        <div className="post-content mb-4">
          <p className="text-700 line-height-3 m-0 text-sm">
            {truncateText(post.body, 100)}
          </p>

          {post.body && post.body.length > 100 && (
            <Button
              label="Read more"
              link
              className="p-0 mt-2 text-xs"
              onClick={() => onView?.(post)}
              style={{ fontSize: '0.75rem' }}
            />
          )}
        </div>

        {/* Actions Section */}
        <div className="post-actions flex justify-content-between align-items-center pt-3 border-top-1 surface-border">
          <div className="flex gap-1">
            <Button
              icon="pi pi-eye"
              size="small"
              text
              rounded
              onClick={() => onView?.(post)}
              tooltip="View"
              tooltipOptions={{ position: 'top' }}
              className="p-button-sm"
              style={{ width: '2rem', height: '2rem' }}
            />
            <Button
              icon="pi pi-pencil"
              size="small"
              text
              rounded
              severity="warning"
              onClick={() => onEdit?.(post)}
              tooltip="Edit"
              tooltipOptions={{ position: 'top' }}
              className="p-button-sm"
              style={{ width: '2rem', height: '2rem' }}
            />
          </div>
          <Button
            icon="pi pi-trash"
            size="small"
            text
            rounded
            severity="danger"
            onClick={() => onDelete?.(post)}
            loading={isDeleting}
            disabled={isDeleting}
            tooltip="Delete"
            tooltipOptions={{ position: 'top' }}
            className="p-button-sm"
            style={{ width: '2rem', height: '2rem' }}
          />
        </div>
      </Card>

      <style jsx>{`
        .post-card-container {
          height: 100%;
        }

        .post-card {
          height: 100%;
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          overflow: hidden;
        }

        .post-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #007bff;
        }

        .post-header {
          padding: 0;
        }

        .post-title {
          font-size: 1.1rem;
          color: #2c3e50;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-content {
          flex: 1;
        }

        .post-actions {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
};

export default PostCard;
