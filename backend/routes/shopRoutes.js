const express = require('express');
const router = express.Router();

const {createShop,deleteShop,updateShop,fetchShop} = require('../controllers/shopController')

router.route("/CreateShop").post(createShop);
router.route('/DeleteShop').post(deleteShop);
router.route('/UpdateShop').put(updateShop);
router.route('/fetchShop').post(fetchShop);

module.exports = router;