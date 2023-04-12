const express = require('express');
const router = express.Router();

const {createShop,deleteShop,updateShop,fetchShop} = require('../controllers/shopController')

router.route("/createShop").post(createShop);
router.route('/deleteShop').post(deleteShop);
router.route('/UpdateShop').post(updateShop);
router.route('/fetchShop').post(fetchShop);

module.exports = router;