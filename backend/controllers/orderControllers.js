const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');


const buyProduct = asyncHandler( async(req,res)=>{

    const{buyerId,productId,sellerId,productimage1,qty,address,total}=req.body

    if(!buyerId || !productId || !sellerId || !productimage1 || !qty || !address || !total){
        res.status(400);
        throw new error("Please fill all the fields!!!");
    }

    const order = await Order.create({

        buyerId,
        productId,
        sellerId,
        productimage1,
        qty,
        address,
        total,
    
    });

    if(order){
        res.status(201).json({
            _id : order._id,
            buyerId:order.buyerId,
            sellerId:order.sellerId,
            productimage1:order.productimage1,
            qty:order.qty,
            address:order.address,
            total:order.total,

        })
    }else{
        res.status(400);
        throw new error("order not found!!!");
    }



});

const fetchOrders = asyncHandler( async(req,res)=>{

    const{userId}=req.body;

     if(!userId){
        res.status(400);
        throw new error("userID undefined !!!");
    }else{

        try {
            const order = await Order.find({sellerId:{$in:userId}})

            if(order){
                res.send(order);
                console.log(order);
            }else{
                console.log("Invalid userId for fetch product".red.bold);
                res.status(401);
                throw new error("Invalid userId for fetch product");
            }
            
        } catch (error) {
             res.status(401);
                throw new error("Invalid userId for orders");
        }
    }
})

module.exports = {buyProduct,fetchOrders}