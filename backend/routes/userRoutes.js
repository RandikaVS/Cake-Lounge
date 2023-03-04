const express = require('express');
const {registerUser,authUser,allUsers,updateUser,updateUserPassword} = require("../controllers/userControllers");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

router.route("/").post(registerUser).get(protect,allUsers);

router.post("/login",authUser);
router.put("/updateUser",updateUser);
router.put("/updateUserPassword",updateUserPassword);

module.exports = router;

