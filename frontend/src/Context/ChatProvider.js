import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [userI, setUserI] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [chatLen, setChatLen] = React.useState(0);
  const [trashLen, setTrashLen] = React.useState(0);
  const [archiveLen, setArchiveLen] = React.useState(0);
  const[pdfMessage,setPdfMessage] = useState([]);
  const[selectedProduct,setSelectedProduct] = useState();
  const [product,setProduct] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userInfoI = JSON.parse(sessionStorage.getItem('userInfoI'));
    setUser(userInfo);
    setUserI(userInfoI);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        userI,
        setUserI,
        chatLen,
        setChatLen,
        trashLen,
        setTrashLen,
        archiveLen,
        setArchiveLen,
        pdfMessage,
        setPdfMessage,
        selectedProduct,
        setSelectedProduct,
        product,
        setProduct
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;