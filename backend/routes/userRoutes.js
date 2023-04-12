const express = require('express');
const {registerUser,authUser,allUsers,updateUser,updateUserPassword,deleteUser,fetchAllProducts} = require("../controllers/userControllers");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

router.route("/").post(registerUser).get(protect,allUsers);

router.post("/login",authUser);
router.put("/updateUser",updateUser);
router.put("/updateUserPassword",updateUserPassword);
router.route('/deleteUser').post(deleteUser);
router.get("/fetch/shops", (request, response, next) => {
  fetchAllProducts()
    .then((result) => {
      response.json({ products: result, fetched: true });
    })
    .catch((error) => {
      response.json({ error: error, fetched: false });
    });
});

module.exports = router;

