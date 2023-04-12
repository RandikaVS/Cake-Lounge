const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const {chats} = require("./data/data");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const colors = require("colors")
require("dotenv").config({ path: "./config.env" });
const {notFound,errorHandler} = require("./middleware/errorMiddleware");


//const dbo = require("./db/conn");
const connectDB = require("./db/db");
const {Socket} = require('socket.io')
dotenv.config();
connectDB();


const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res)=>{

    res.send("API is Running");
});

// app.listen(port, () => {

//   dbo.connectToServer(function (err) {
//     if (err) console.log(`Error : ${error.message}`.red.bold);
 
//   });
//   console.log(`Server is running on port: ${port}`.yellow.bold);
// });

const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`.yellow.bold)
);
if(server){
  console.log("Success".green.bold);
}

const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
      origin:"http://localhost:3000",   
  },
})

io.on("connection",(Socket) =>{
  console.log('Connected to socket.io');

  Socket.on("setup",(userData) =>{
    Socket.join(userData._id);
    //console.log(userData._id);
    Socket.emit('connected');
  });

  Socket.on('join chat',(room)=>{
      Socket.join(room);
      console.log("user jointed room "+room);
  });

  Socket.on('typing',(room)=>Socket.in(room).emit("typing"));
  Socket.on('stop typing',(room)=>Socket.in(room).emit("stop typing"));

  Socket.on("new message",(newMessageReceived)=>{
    var chat = newMessageReceived.chat;

    if(!chat.users) return console.log('chat.users not defined');

    chat.users.forEach(user => {

      if(user._id == newMessageReceived.sender._id) return;

      Socket.in(user._id).emit("message received", newMessageReceived)
    });
    
  });

  Socket.off("setup",()=>{
    console.log("USER DISCONNECTED").red.bold;
    Socket.leave(userData._id)
  })
});
//app.use(require("./routes/record"));

app.use("/api/user",userRoutes);
app.use("/api/shop",shopRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes); 
app.use("/api/product",productRoutes);
app.use("/api/order",orderRoutes);

app.use(notFound);
app.use(errorHandler);






    