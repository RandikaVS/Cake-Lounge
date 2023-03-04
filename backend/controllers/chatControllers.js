const asyncHandler = require("express-async-handler")
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async(req,res)=>{

    const {userId} = req.body;

    if(!userId){
        
        console.log("User id param not send with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        //isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
})
  .populate("users","-password")
  .populate("latestMessage");

  isChat = await User.populate(isChat, {
      path:"latestMessage.sender",
      select: "name pic email",
  }); 

  if(isChat.length > 0){

      res.send(isChat[0]);

  }else{

    var chatData ={
        chatName: "sender",
        users: [req.user._id, userId],
    };

    try {

        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat._id}).populate("users","-password").populate("status");
        console.log(fullChat);
        res.status(200).send(fullChat);

    } catch (error) {

        res.send(400);

        throw new Error (error.message);
    }
  }

});

const fetchChats = asyncHandler(async(req,res)=>{

    try {

        Chat.find({ users: { $elemMatch: { $eq: req.user._id}}})
        .populate ("users","-password")
        .populate("latestMessage")

        .sort( {updateAt: -1 } )

        .then(async(results)=>{

            results=await User.populate (results,{

                path: "latestMessage.sender",
                select: "name pic email"
            });

            res.status(200).send(results);
            //console.log(results);
            console.log("success load the chats".green.bold);
        });

    } catch (error) {
        console.log("fail to load the chats".red.bold);
        res.status(400);
        throw new Error (error.message);
        
    }

});

const deleteChat= asyncHandler(async(req,res)=>{

    const {_id,userId}=req.body;
    if(!_id || !userId){
        console.log('Invalid data passes into request');
        return res.sendStatus(400);
    }

    const chat = await Chat.findOneAndDelete({_id:_id});

    try {
        const chats = await Chat.find({ users: userId })
        .populate ("users","-password")
        .populate("latestMessage")

        .sort( {updateAt: -1 } )

        .then(async(results)=>{

            results=await User.populate (results,{

                path: "latestMessage.sender",
                select: "name pic "
            });
            console.log(results)
            res.status(200).send(results);
        });

    } catch (error) {
        res.status(400);
        throw new Error (error.message);
    }
});

const achiveChat =asyncHandler(async(req,res)=>{
    
})

module.exports = {accessChat, fetchChats,deleteChat};