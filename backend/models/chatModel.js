const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {

        chatName : {type: String, trim:true}, //Chat name
        //isGroupChat: { type: Boolean, default: false },
        users: [{
            type: mongoose.Schema.Types.ObjectId, //users array
            ref: "User"
        }],

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId, //latest message
            ref: "Message",
        },
        status:{type:String ,default:"active"}
    

}
    ,{
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat",chatModel);
module.exports = Chat;