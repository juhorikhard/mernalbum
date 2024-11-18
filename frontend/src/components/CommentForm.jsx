import { useState, useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";

const CommentForm = ({ addComment }) => {
 // Get user from auth context
 const { user } = useContext(AuthContext);
 const [newComment, setNewComment] = useState(""); // Store comment text
 const [newRating, setNewRating] = useState("");   // Store rating value
 const [error, setError] = useState(null);         // Store error messages

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!user) {
     setError("You must be logged in to add a comment");
     return;
   }

   if (!newRating) {
     setError("Please select a rating before submitting your review.");
     return;
   }

   if (!newComment) {
     setError("Please leave a comment before submitting your review.");
     return;
   }

   try {
       const commentData = {
       comment: newComment,
       rating: parseInt(newRating),
       userEmail: user.email
     };

     // Send POST request to add comment
     // Send POST request to add comment
      const response = await fetch("https://mernalbum-backend.onrender.com/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(commentData)
      });


     const json = await response.json();

     if (!response.ok) {
       // Handle error response
       setError(json.error);
       console.error('Error response:', json);
     } else {
       setError(null);
       setNewComment("");
       setNewRating("");
       addComment(json);
     }
   } catch (error) {
     console.error('Submit error:', error);
     setError("Failed to add comment. Please try again.");
   }
 };

 return (
   <form onSubmit={handleSubmit} className="comment-form">
     <label htmlFor="comment">Your Review:</label>
     <textarea
       name="comment"
       id="comment"
       placeholder="Write your review here..."
       onChange={(e) => setNewComment(e.target.value)}
       value={newComment}
     ></textarea>

     <label htmlFor="rating">Rating:</label>
     <select
       name="rating"
       id="rating"
       onChange={(e) => setNewRating(e.target.value)}
       value={newRating}
       className="rating-select"
     >
       <option value="">Select Rating</option>
       {[0,1,2,3,4,5].map(num => (
         <option key={num} value={num}>{num}</option>
       ))}
     </select>

     <button type="submit">Add Comment</button>
     
     {error && <p className="error">{error}</p>}
   </form>
 );
};

export default CommentForm;