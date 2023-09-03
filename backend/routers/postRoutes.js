const router = require("express").Router();
const postController = require("../controllers/postController");

//   user/posts

router.get("/", postController.getPosts);
router.get("/:postId", postController.getSinglePost);
router.post("/", postController.createPost);
router.put("/:postId", postController.updatePost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
