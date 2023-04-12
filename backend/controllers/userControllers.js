const asyncHandler = require('express-async-handler');
const { terminal } = require("terminal-kit");
const User = require("../models/userModel");
const genarateToken = require("../db/genarateToken");
const bcrypt = require('bcryptjs');
const { green } = require('colors');
const Product = require('../models/productModel');

const registerUser = asyncHandler( async(req,res) =>{

    const{name,email,password,address,pic,againNewPassword}=req.body;

    if(!name || !password || !email){
        res.status(400);
        throw new error("Please fill all the fields!!!");
    }

    const userExist = await User.findOne({email});

    if(userExist == true){
        console.log("User already exist!!!".red.bold);
        res.status(400);
        throw new error("User already exist!!!");
    }


    const user = await User.create({

        name,
        email,
        password,
        address,
        pic,
    });

    if(user){
        res.status(201).json({

            _id: user._id,
            email:user.email,
            name:user.name,
            pic:user.pic,
            password:user.password,
            shopAvailability:"0",
            address:user.address,
            token:genarateToken(user._id),
        });
    }else{
        res.status(400);
        throw new error("User not found!!!");
    }

});

const updateUser = asyncHandler(async(req,res)=>{

     const{userId,name,address,email,password,pic,token,shopAvailability}=req.body;

     if(!name || !address){
        res.status(400);
        throw new error("Invalid data passes into backend request!!!");

    }else{
        
        const updateUser = await User.findByIdAndUpdate(userId,{
            name:name,
            email:email,
            password:password,
            pic:pic,
            address:address,
        },
        {
      new: true,
        });

        if(updateUser){
            res.status(201).json({
            _id: userId,
            email:updateUser.email,
            name:updateUser.name,
            pic:updateUser.pic,
            password:updateUser.password,
            shopAvailability:updateUser.shopAvailability,
            address:updateUser.address,
            token:token,
            })

            console.log(updateUser);
        }else{
        res.status(400);
        throw new error("User not updated !!!");
    }
    
    }
})

const authUser = asyncHandler(async(req,res)=>{

    

    const{ email, password }= req.body;

    const user = await User.findOne({email});


    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            email:user.email,
            name:user.name,
            pic:user.pic,
            password:user.password,
            shopAvailability:user.shopAvailability,
            address:user.address,
            token:genarateToken(user._id),
        });
    }else{
        console.log("Invalid email or Password".red.bold);
        res.status(401);
        throw new error("Invalid email or Password!!!");
    }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search? 
  {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //console.log(users);
  res.send(users);
});

const updateUserPassword = asyncHandler(async(req,res)=>{
    const{name,email,address,pic,userId,againNewPassword,cuPassword,password,token}=req.body;

    let newPassword='';
    if(!name || !email || !address|| !pic|| !userId|| !againNewPassword){
        res.status(400);
        throw new error("Error send data to backend request!!!").red.bold;
    }
    const userExist = await User.findOne({email});
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(againNewPassword,salt);

    if(!bcrypt.compare(cuPassword, password) && !(newPassword.length)>1){
        console.log("Current password does not match".red.bold);
        res.status(400);
        throw new error(error.message);
    }else{
       
        
         const updateUser = await User.findByIdAndUpdate(userId,{
            name:name,
            email:email,
            password:newPassword,
            pic:pic,
            address:address,
        },
        {
      new: true,
        });

        if(updateUser){
            res.status(201).json({
            _id: userId,
            email:updateUser.email,
            name:updateUser.name,
            pic:updateUser.pic,
            password:updateUser.password,
            shopAvailability:updateUser.shopAvailability,
            address:updateUser.address,
            token:token,
            })

            console.log(updateUser);
        }else{
        res.status(400);
        throw new error("Password not updated !!!").red.bold;
    }
    }
})

const deleteUser = asyncHandler( async(req,res)=>{

    const {userId}=req.body;
    console.log(userId);
     if(!userId){
        console.log('Invalid data passes into backend request');
        return res.sendStatus(400);
    }else{
        try {

            const user = await User.findOneAndDelete({_id:userId});

            if(user){
            res.status(201).json({
                userId:user._id
            })
            console.log('User deleted');
        }
            
        } catch (error) {
            res.status(400);
        throw new error("Error while deleting user !!!"+error.message);
            
        }
    }


})

const fetchAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.find({}).then((result) => {
        resolve(result);
      });
    } catch (error) {
      terminal.red.bold("[Cake Lounge Backend] ", error);
      reject(error);
    }
  });
};
module.exports = {registerUser,authUser,allUsers,updateUser,updateUserPassword,deleteUser,fetchAllProducts}