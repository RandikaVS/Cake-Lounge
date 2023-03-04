const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const shopSchema = mongoose.Schema({

    shopName: {type: "String", required: true},
    shopAddress: {type: "String" , required: true},
    shopDescription: {type: "String" },
    province: {type: "String" , required: true},
    postalCode: {type: "String" , required: true},
    idNumber: {type: "String" , required: true},
    contactNumber: {type:"String",require:true},
    rank:{type:Number,default:0},
    userId : {type:"String",require:true},
    shopLogo : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1650736112/shop/icons8-shop-30_tfimvg.png",
    },
},
{
    timestapms: true,
});


const Shop = mongoose.model("Shop",shopSchema);

module.exports = Shop;