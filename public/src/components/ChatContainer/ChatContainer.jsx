import React, { useEffect, useState } from "react";
import "./ChatContainer.css";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";
import axios from 'axios';
import { getAllMessagesRoute, sendMssgRoute } from "../../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);


    const fetchData = async () => {
      const response = await axios.post(getAllMessagesRoute,{
        from: currentUser._id,
        to: currentChat._id
      })
      console.log("response of messages are:", response);
      setMessages(response.data);
    }

    useEffect(()=>{
      fetchData();
    },[currentChat])

    const handleSendMessage = async (mssg) => {
      // alert(mssg);
      await axios.post(sendMssgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: mssg
      })
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <>
      {currentChat && (
        <div className="chatContainerSelected">
          <div className="Header">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  currentChat.avatarImage
                )}`}
                alt="img"
                className="usersImg"
              />
            </div>
            <div className="username">
              {currentChat ? currentChat.username : ""}
            </div>
            <div className="logoutBtn" onClick={handleLogout}>Logout</div>
          </div>
          <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div >
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
          <ChatInput handleSendMessage={handleSendMessage}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
