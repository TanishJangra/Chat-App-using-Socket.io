import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import Contacts from "../../components/Contacts/Contacts";
import "./Chat.css";
import Welcome from "./../../components/Welcome/Welcome";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import {io} from "socket.io-client";


const Chat = () => {

  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setData();
      setIsLoaded(true);
    }
  }, []);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  },[currentUser]);

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const fetchData = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log("data is ", data.data);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  };
  const setData = async () => {
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  };


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log("current User is: >>>>>>", currentUser);
  return (
    <div className="chatContainer">
      <div className="chatContainerInnerDiv">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        { isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </div>
  );
};

export default Chat;
