const mongoose = require('mongoose');


const productSchema = mongoose.Schema({

    productName: {type: "String", required: true},
    category: {type: "String" , required: true},
    productType: {type: "String" , required: true},
    productDescription:{type:"String", require:true},
    productWeight:{type:"String" , default:"0"},
    price:{type:"String" , default:"0"},
    userId:{type:"String" ,require:true},
    countInStock:{type:"String" , default:"0"},
    image1 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
        
    },
    image2 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
    image3 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
    image4 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
    image5 : {
        type: "String",
        require: true,
        default: "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
},
{
    timestapms: true,
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;