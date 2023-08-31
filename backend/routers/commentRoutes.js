const router = require("express").Router();
const commentController = require("../controllers/commentController");

// user/posts/comments
router.get("/:postId", commentController.getComments);
router.post("/:postId", commentController.postComment);
router.delete("/:postId/:commentId", commentController.deleteComment);

module.exports = router;