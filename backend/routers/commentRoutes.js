const router = require("express").Router();
const commentController = require("../controllers/commentController");

//    comments
router.get("/:postId", commentController.getComments);
router.post("/:postId", commentController.postComment);

module.exports = router;
