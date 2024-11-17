const Comment = require("../models/commentModel");
const mongoose = require("mongoose");

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    console.log('All comments in database:', comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single comment
const getComment = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such comment" });
  }
  
  const comment = await Comment.findById(id);
  
  if (!comment) {
    return res.status(404).json({ error: "No such comment" });
  }
  
  res.status(200).json(comment);
};

// Create a new comment
const createComment = async (req, res) => {
  const { comment, rating } = req.body;

  try {
    
    const newComment = await Comment.create({
      comment,
      rating,
      user: req.user._id,
      userEmail: req.user.email
    });


    res.status(200).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    // Check for valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid comment ID" });
    }

    // First find the comment
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ error: "No such comment" });
    }

    // Check if the user is authorized to delete this comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    // If authorized, delete the comment
    const deletedComment = await Comment.findOneAndDelete({ 
      _id: id,
      user: req.user._id // Additional check to ensure user owns the comment
    });

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(deletedComment);
  } catch (error) {
    console.error('Error in deleteComment:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such comment" });
  }

  try {
    // First find the comment
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ error: "No such comment" });
    }

    // Check if the user is authorized to update this comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to update this comment" });
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getComments,
  getComment,
  createComment,
  deleteComment,
  updateComment
};