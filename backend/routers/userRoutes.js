const router = require("express").Router();
const userController = require("../controllers/userController");
const authM = require("../middlewares/authM");
router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/search/:searchUsername", authM, userController.search);

module.exports = router;
