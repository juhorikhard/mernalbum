const express = require("express");
const { createComment, getComments, getComment, deleteComment } = require("../controllers/commentController");
const requireAuth = require("../middleware/requireAuth")
const router = express.Router();

//Require auth for all comment routes
router.use(requireAuth)


//GET all comments
router.get("/", getComments)

//GET a single comment
router.get("/:id", getComment)

//POST a new comment
router.post("/", createComment)

//DELETE a comment
router.delete("/:id", deleteComment)

module.exports = router;