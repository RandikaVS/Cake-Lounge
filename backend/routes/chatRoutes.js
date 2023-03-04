const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const {accessChat, fetchChats,deleteChat} = require("../controllers/chatControllers")

const router = express.Router();

 router.route('/').post(protect,accessChat)
 router.route('/').get(protect,fetchChats);
 router.route('/deleteChat').post(deleteChat);

module.exports = router