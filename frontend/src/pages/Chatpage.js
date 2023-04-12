// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {Card, Button} from 'react-bootstrap'

// const Chatpage = () => {

//     const [chats,setChats] = useState([])

//     const fetchChats = async() => {
//         const {data} = await axios.get("/api/chat");
//         setChats(data);
//         console.log(data);
//         ;
//     };

//     useEffect(() => {
//         fetchChats();
//     },[]);
    
// return(
  
//   <div>
//         {chats.map((chat)=> {
//           return(
//             <div  key={chat._id}>
//               {chat.chatName}
//               </div>
//           )
//     })}
//     <div><Card style={{ width: '18rem' }}>
//   <Card.Img variant="top" src="http://res.cloudinary.com/cake-lounge/image/upload/v1650128735/kfhocoqby0qjhjuwkybl.jpg" />
//   <Card.Body>
//     <Card.Title>Welcome to chat page</Card.Title>
//     <Card.Text>
//       Some quick example text to build on the card title and make up the bulk of
//       the card's content.
//     </Card.Text>
//     <Button variant="primary">Go somewhere</Button>
//   </Card.Body>
// </Card></div>
//     </div>
    

// )

// };
// export default Chatpage;
