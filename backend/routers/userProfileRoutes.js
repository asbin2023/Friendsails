const router = require("express").Router();
const userProfileController = require("../controllers/userProfileController");
//   user/profile

router.get("/", userProfileController.getProfile);
router.post("/", userProfileController.postProfile);
router.put("/", userProfileController.updateProfile);

module.exports = router;
