const Shop = require("../models/shopModel");
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler');
const genarateToken = require("../db/genarateToken");
const { green } = require('colors');


const createShop = asyncHandler(async(req,res)=>{

    const{shopName,shopAddress,shopDescription,province,postalCode,idNumber,contactNumber,userId,shopLogo}=req.body;

    if(!shopName || !shopAddress || !shopDescription || !province || !postalCode || !idNumber || !contactNumber || !userId){
        res.status(400);
        throw new error("Please fill all the fields!!!");
    }
    const shopExist = await Shop.findOne({userId});

    if(shopExist){
        console.log("Shop already exist !!!".red.bold);
        res.status(400);
        throw new error(error.message);
    }else{
    const shop = await Shop.create({

        shopName,
        shopAddress,
        shopDescription,
        province,
        postalCode,
        idNumber,
        contactNumber,
        userId,
        shopLogo,
    });
    const updateUser = await User.findByIdAndUpdate(userId,{
        shopAvailability:1
    },
    {
        new: true,
    })
    if(shop && updateUser){
        res.status(201).json({

            _id:shop._id,
            shopName:shop.shopName,
            shopAddress:shop.shopAddress,
            shopDescription:shop.shopDescription,
            province:shop.province,
            postalCode:shop.postalCode,
            idNumber:shop.idNumber,
            contactNumber:shop.contactNumber,
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

})

const deleteShop = asyncHandler(async(req,res)=>{

    const {_id,shopName}=req.body;
    if(!_id){
        console.log('Invalid data passes into backend request');
        return res.sendStatus(400);
    }

    try {

        const shop = await Shop.findOneAndDelete({_id:_id});

        if(shop){
            res.status(201).json({
                _id:_id,
                shopName:shopName,

             });
        }
        
    } catch (error) {
        res.status(400);
        throw new error("Error while deleting shop !!!"+error.message);
    }

})

const updateShop = asyncHandler(async(req,res)=>{

    const{shopId,shopName,shopAddress,shopDescription,province,postalCode,idNumber,contactNumber,shopLogo}=req.body;

    if(!shopName || !shopAddress || !shopDescription || !province || !postalCode || !contactNumber || !shopLogo){
         res.status(400);
        throw new error("Invalid data passes into backend request!!!");
    }else{
        const updateShop = await Shop.findByIdAndUpdate(shopId,{
            shopName:shopName,
            shopAddress:shopAddress,
            shopDescription:shopDescription,
            postalCode:postalCode,
            idNumber:idNumber,
            contactNumber:contactNumber,
            shopLogo:shopLogo,
        },
        {
      new: true,
        });

        if(updateShop){
            res.status(201).json({
            shopId: shopId,
            shopName:updateShop.shopName,
            shopAddress:updateShop.shopAddress,
            shopDescription:updateShop.shopDescription,
            province:updateShop.province,
            postalCode:updateShop.postalCode,
            idNumber:updateShop.idNumber,
            contactNumber:updateShop.contactNumber,
            userId:updateShop.userId,
            shopLogo:updateShop.shopLogo
            })

            //console.log(updateShop);
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
            postalCode:shop.postalCode,
            idNumber:shop.idNumber,
            contactNumber:shop.contactNumber,
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
module.exports = {createShop, deleteShop, updateShop, fetchShop}