const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    buyerId: {type: "String", required: true},
    productId: {type: "String" , required: true},
    sellerId: {type: "String" , required: true},
    qty:{type:"String" , default:"0"},
    address:{type:"String" ,require:true},
    total:{type:"String" ,require:true},
    productimage1 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
        
    },
},
{
    timestapms: true,
});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;