import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Text, Spinner, FormControl } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/chatLogics";
import ProfileModal from "../miscellaneous/ProfileModal";
import { useState } from "react";
import axios from "axios";
import Messages from "../User/messages";
import { useEffect } from "react";
import "./SingleChat.css";
import ScrollableChat from "./ScrollableChat";
import ScrollableFeed from "react-scrollable-feed";
import animationData from "../../animations/typing.json";
import { Avatar } from "@chakra-ui/react";
import io from "socket.io-client";
import { Skeleton, TextField, Input } from "@mui/material";
import { MDBInputGroup, MDBBtn } from "mdbreact";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { PureComponent } from "react";
import PDFFile from "./ChatPdfDownload";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

//const userData = JSON.parse(localStorage.getItem('userInfo'));

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    setPdfMessage,
    pdfMessage,
  } = ChatState();

  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedChat(null);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setPdfMessage(data);
      console.log("messages", pdfMessage);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      window.alert("Failed to Load the Messages");
    }
  };

  useEffect(() => {
    const userI = JSON.parse(localStorage.getItem("userInfo"));
    socket = io(ENDPOINT);
    socket.emit("setup", userI);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    if (selectedChat) {
      handleOpen();
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //nortification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        //console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        window.alert("fail to send message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!istyping) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {loading ? (
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <Skeleton variant="text" />
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    {/* <Skeleton variant="circular" width={40} height={40} /> */}
                    <Skeleton variant="rectangular" width={730} height={118} />
                  </Typography>
                </Box>
              </Modal>
            </div>
          ) : (
            <div className="messages">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {getSender(user._id, selectedChat.users).toUpperCase()}
                    <PDFFile />
                  </Typography>

                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <ScrollableChat messages={messages} />

                    <FormControl
                      onKeyDown={sendMessage}
                      id="first-name"
                      //isRequired
                      mt={3}
                      style={{ width: "500px", alignItems: "end" }}
                    >
                      {istyping ? <div>Typing...</div> : <></>}
                      <Input
                        id="standard-basic"
                        placeholder="Enter Message"
                        variant="standard"
                        value={newMessage}
                        onChange={typingHandler}
                        sx={{
                          width: 356,
                        }}
                      />
                      <span>
                        <Button
                          variant="contained"
                          endIcon={<SendIcon />}
                          type="submit"
                          sx={{
                            marginLeft: "50px",
                          }}
                          onClick={sendMessage}
                        >
                          Send
                        </Button>
                      </span>
                    </FormControl>
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}
        </>
      ) : (
        // to get socket.io on same page
        <p></p>
        // <Text fontSize="3xl" pb={3} fontFamily="Work sans">
        //   Click on a user to start chatting
        // </Text>
      )}
    </>
  );
};
export default SingleChat;
