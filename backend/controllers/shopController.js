const Shop = require("../models/shopModel");
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler');
const genarateToken = require("../db/genarateToken");
const { green } = require('colors');


const createShop = asyncHandler( async(req,res)=>{

    const{userId,shopName,shopAddress,shopDescription,shopProvince,shopLogo}=req.body;

    if(!shopName || !shopAddress || !shopDescription || !shopProvince || !userId){

        console.log("All data not received".red.bold);
        res.status(400);
        throw new error("Please fill all the fields!!!");

    }

    const shopExist = await Shop.findOne({userId:{$in:userId}});

    if(shopExist){
        console.log("Shop already exist !!!".red.bold);
        res.status(400);
        throw new error(error.message);
    }else{
    const shop = await Shop.create({

        shopName,
        shopAddress,
        shopDescription,
        shopProvince,
        userId,
        shopLogo,
    });

    const updateUser = await User.findByIdAndUpdate(userId,{
        shopAvailability:1
    },
    {
        new: true,
    });

    if(shop){
        res.status(201).json({

            _id:shop._id,
            shopName:shop.shopName,
            shopAddress:shop.shopAddress,
            shopDescription:shop.shopDescription,
            shopProvince:shop.shopProvince,
            shopLogo:shop.shopLogo,
            rank:shop.rank,
            userId:shop.userId,
            token:genarateToken(shop._id),
        });
    }else{
        res.status(400);
        throw new error("User not found!!!");
    }
            
    }

});

const deleteShop = asyncHandler(async(req,res)=>{

    const {shopId}=req.body;
    console.log(shopId);
    if(!shopId){
        console.log('Invalid data passes into backend request');
        return res.sendStatus(400);
    }else{

    try {

        const shop = await Shop.findOneAndDelete({_id:shopId});

        if(shop){
            res.status(201).json({
                shopId:shopId
            })
            console.log('Shop deleted');
        }
        
    } catch (error) {
        res.status(400);
        throw new error("Error while deleting shop !!!"+error.message);
    }
}

})

const updateShop = asyncHandler(async(req,res)=>{

    const{shopId,shopName,shopAddress,shopDescription,shopProvince,shopLogo}=req.body;
    console.log(shopId+shopName+shopAddress+shopDescription+shopProvince);

    if(!shopName ||!shopAddress || !shopDescription || !shopProvince || !shopId){
         res.status(400);
        throw new error("Invalid data passes into backend request!!!");
    }else{
        const updateShop = await Shop.findByIdAndUpdate(shopId,{
            shopName:shopName,
            shopAddress:shopAddress,
            shopDescription:shopDescription,
            shopProvince:shopProvince,
            shopLogo:shopLogo,
        },
        {
            new: true,
        });

        if(updateShop){
            res.status(201).json({
             _id:updateShop._id,
            shopName:updateShop.shopName,
            shopAddress:updateShop.shopAddress,
            shopDescription:updateShop.shopDescription,
            shopProvince:updateShop.shopProvince,
            shopLogo:updateShop.shopLogo,
            rank:updateShop.rank,
            userId:updateShop.userId,
            token:genarateToken(updateShop._id),
            })

            console.log(updateShop);
        }else{
        res.status(400);
        throw new error("Shop not updated !!!");
    }
    }

})

const fetchShop = asyncHandler(async(req,res)=>{
console.log("Fetch shop".red.bold);
    const{ userId }= req.body;
    console.log(userId);
    const shop = await Shop.findOne({userId:userId});


    if(shop){
        res.json({
            _id: shop._id,
            shopName:shop.shopName,
            shopAddress:shop.shopAddress,
            shopDescription:shop.shopDescription,
            province:shop.province,
            rank:shop.rank,
            blockedStatus:shop.blockedStatus,
            userId:shop.userId,
            shopLogo:shop.shopLogo,
        });
        console.log(shop);
    }else{
        console.log("Error fetching shop".red.bold);
        res.status(401);
        throw new error("Error fetching shop");
    }
})
module.exports = {createShop, deleteShop, updateShop,fetchShop}