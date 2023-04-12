const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({

    shopName: {type: "String", required: true},
    shopAddress: {type: "String" , required: true},
    shopDescription: {type: "String" },
    shopProvince: {type: "String" , required: true},
    rank:{type:"String",default:"0"},
    userId : {type:"String",require:true},
    blockedStatus : {type:"String",default:"false"},
    shopLogo : {
        type: "String",
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1650736112/shop/icons8-shop-30_tfimvg.png",
    },
},
{
    timestapms: true,
});


const Shop = mongoose.model("Shop",shopSchema);

module.exports = Shop;