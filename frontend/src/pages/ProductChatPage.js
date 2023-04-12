import React from 'react'
import { useEffect } from 'react';
import SingleChat from '../components/Chat/SingleChat';
import { ChatState } from './../Context/ChatProvider';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'
import Messages from './../components/User/messages';

const ProductChatPage = ({fetchAgain}) => {

    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const {product,chats,setChats,setSelectedChat,selectedChat,user} = ChatState();
    const[userId,setUserId] = useState(userData._id)


    const accessChat = async (userId) => {
        console.log(userData);

        try {
        
        const config = {
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userData.token}`,
            },
        };
        const { data } = await axios.post(`/api/chat`, { userId }, config);

        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        //window.alert(data)
        setSelectedChat(data);
        } catch (error) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error to access chat!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
        }
    };

    useEffect(() => {
        accessChat(userId);
    }, [fetchAgain])
    


  return (
    <div>
<Messages/>
       
    </div>
  )
}
export default ProductChatPage;
