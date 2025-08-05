import React from "react";

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.length === 0 ? (
          <>No posts available</>
        ) : (
          posts.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostList;
