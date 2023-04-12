const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {addProduct,fetchProduct,updateProduct,deleteProduct,searchProduct} =  require("../controllers/productControllers");

router.route("/").post(fetchProduct);
router.route("/add").post(addProduct);
router.route('/update').post(updateProduct);
router.route('/delete').post(deleteProduct);
router.route("/searches").get(searchProduct);


module.exports = router;