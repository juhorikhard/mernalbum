import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";

// Component that displays details of a comment, takes comment object and deleteComment function as props
const CommentDetails = ({ comment, deleteComment }) => {
  // Get user information from AuthContext
  const { user } = useContext(AuthContext);

  // Only deletes if user is logged in
  const handleClick = () => {
    if (!user) return;
    deleteComment(comment._id);
  };

  // JWT token handling to verify user ownership
  const token = user?.token;
  let userId = null;
  if (token) {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      userId = decodedPayload._id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // Check if current user owns this comment
  const isOwner = userId && comment.user === userId;

  return (
    <div className="comment-details">
      {/* Display the comment text */}
      <p><strong>{comment.comment}</strong></p>
      
      <p>Rating: {comment.rating}</p>
      
      <p>
        {new Date(comment.createdAt).toLocaleDateString('en-GB')} at{" "}
        {new Date(comment.createdAt).toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>

      {/* Show delete button only if user is the owner */}
      {isOwner && (
        <button
          className="deleteBtn"
          onClick={handleClick}
          title="Delete comment"
          style={{
            backgroundColor: '#499bc8',
            padding: '6px 7px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '13px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Delete <i className="fa fa-trash-o"></i>
        </button>
      )}

      {/* Show email of the commenter */}
      {comment.userEmail && (
        <p className="comment-author">Posted by: {comment.userEmail}</p>
      )}
    </div>
  );
};

export default CommentDetails;