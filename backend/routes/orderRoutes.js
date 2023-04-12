const express = require('express');
const router = express.Router();
const {buyProduct,fetchOrders} =  require("../controllers/orderControllers");

router.route("/buy").post(buyProduct);
router.route("/").post(fetchOrders);

module.exports = router;