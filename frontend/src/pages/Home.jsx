import { useEffect, useState, useContext } from "react";
import CommentDetails from "../components/CommentDetails";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../hooks/AuthContext";

const Home = () => {
 const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

 // Fetch comments when component mounts or user changes
 useEffect(() => {
   const fetchComments = async () => {
     try {
       // Get comments from API
       const response = await fetch("https://mernalbum-backend.onrender.com/api/comments", {
         headers: {
           'Authorization': `Bearer ${user.token}`
         }
       });
       const json = await response.json();
       
       if (response.ok) {
         setComments(json);
       }
     } catch (error) {
       console.error('Error fetching comments:', error);
     }
   };

   // Fetch if user is logged in
   if (user) {
     fetchComments();
   }
 }, [user]);

 const handleDeleteComment = async (commentId) => {
   if (!user) return;

   try {
     // Send DELETE request to API
     const response = await fetch(`https://mernalbum-backend.onrender.com/api/comments/${commentId}`, {
       method: 'DELETE',
       headers: {
         'Authorization': `Bearer ${user.token}`,
         'Content-Type': 'application/json'
       }
     });

     const json = await response.json();

     if (response.ok) {
       // Remove deleted comment from state
       setComments(prevComments => 
         prevComments.filter(comment => comment._id !== commentId)
       );
     } else {
       console.error('Failed to delete comment:', json.error);
     }
   } catch (error) {
     console.error('Error deleting comment:', error);
   }
 };

 return (
   <div className="container">
     <CommentForm 
       addComment={(newComment) => setComments([newComment, ...comments])}
     />

     {/* List of all comments */}
     <div className="comments-list">
       {comments.map((comment) => (
         <CommentDetails
           key={comment._id}
           comment={comment}
           deleteComment={handleDeleteComment}
         />
       ))}
     </div>
   </div>
 );
};

export default Home;