
const asyncHandler = require('express-async-handler');
const Product = require("../models/productModel");

const addProduct = asyncHandler( async(req,res)=>{

    const{productName,category,productType,productDescription,productWeight,price,countInStock,userId,image1,image2,image3,image4,image5}=req.body

    if(!productName || !category || !productType || !productDescription || !productWeight || !price || !countInStock || !userId){
        res.status(400);
        throw new error("Please fill all the fields!!!");
    }

    const product = await Product.create({

        productName,
        category,
        productType,
        productDescription,
        productWeight,
        price,
        countInStock,
        userId,
        image1,
        image2,
        image3,
        image4,
        image5,
    });

    if(product){
        res.status(201).json({
            _id : product._id,
            productName:product.productName,
            category:product.category,
            productType:product.productType,
            productDescription:product.productDescription,
            productWeight:product.productWeight,
            price:product.price,
            countInStock:product.countInStock,
            userId:product.userId,
            image1:product.image1,
            image2:product.image2,
            image3:product.image3,
            image4:product.image4,
            image5:product.image5,

        })
    }else{
        res.status(400);
        throw new error("Product not found!!!");
    }



});

const fetchProduct = asyncHandler( async(req,res)=>{

    const {userId} = req.body;
    console.log(userId+" User ID");
    const product = await Product.find({userId:{$in:userId}})

    if(product){
        res.send(product);
        console.log(product);
    }else{
        console.log("Invalid userId for fetch product".red.bold);
        res.status(401);
        throw new error("Invalid userId for fetch product");
    }

});

const updateProduct = asyncHandler( async(req,res)=>{

    const{productId,productName,category,productType,productDescription,productWeight,price,countInStock,image1,image2,image3,image4,image5}=req.body;

    if(!productId || !productName || !category || !productType || !productDescription || !productWeight || !price || !countInStock){
        res.status(400);
        throw new error("Invalid data passes into backend request!!!");

    }else{
        const updateProduct = await Product.findByIdAndUpdate(productId,{
            productName:productName,
            category:category,
            productType:productType,
            productDescription:productDescription,
            productWeight:productWeight,
            price:price,
            countInStock:countInStock,
            image1:image1,
            image2:image2,
            image3:image3,
            image4:image4,
            image5:image5,
        },
        {
            new:true,
        });
        if(updateProduct){
            res.status(201).json({
                _id:productId,
                productName:updateProduct.productName,
                category:updateProduct.category,
                productType:updateProduct.productType,
                productDescription:updateProduct.productDescription,
                productWeight:updateProduct.productWeight,
                price:updateProduct.price,
                countInStock:updateProduct.countInStock,
                image1:updateProduct.image1,
                image2:updateProduct.image2,
                image3:updateProduct.image3,
                image4:updateProduct.image4,
                image5:updateProduct.image5,
            })
            console.log(updateUser);
        }else{
        res.status(400);
        throw new error("User not updated !!!");
    }
    }

})

const deleteProduct = asyncHandler( async(req,res)=>{

    const{productId}= req.body;

    if(!productId){
         res.status(400);
        throw new error("Required data not received into backend request!!!");
    }else{
        const deleteProduct = await Product.findOneAndDelete({_id:productId});

        if(deleteProduct){
            res.status(201).json({
                _id:deleteProduct._id,
                productName:deleteProduct.productName

            })
        }else{
            res.status(400);
        throw new error("Product not deleted !!!");
        }
    }
})

const searchProduct = asyncHandler(async (req, res) => {
  const keyword = req.query.search? 
  {
        $or: [
          { productName: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const products = await Product.find(keyword);
  console.log(products);
  res.send(products);
});
module.exports = {addProduct,fetchProduct,updateProduct,deleteProduct,searchProduct}