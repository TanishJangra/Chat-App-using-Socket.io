import React, { useEffect, useRef, useState } from "react";
import "./ChatContainer.css";
import { useNavigate } from "react-router-dom";
import ChatInput from "../ChatInput/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMssgRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import MenuIcon from "@mui/icons-material/Menu";
import Contacts from "../Contacts/Contacts";

const ChatContainer = ({ currentChat, currentUser, socket, isMobileScreen }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [showContacts, setShowContacts] = useState(false);
  
  const scrollRef = useRef();

  const fetchData = async () => {
    if (currentChat) {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log("response of messages are:", response);
      setMessages(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentChat]);

  const handleSendMessage = async (mssg) => {
    // alert(mssg);
    await axios.post(sendMssgRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: mssg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: mssg,
    });

    const mssgs = [...messages];
    mssgs.push({ fromSelf: true, message: mssg });
    setMessages(mssgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleMenuIconClick = () => {
    showContacts(true);
  };

  return (
    <>
      {currentChat && (
        <div className="chatContainerSelected">
        {
          showContacts && <Contacts/>
        }
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
            {!isMobileScreen && <div className="username">
              {currentChat ? currentChat.username : ""}
            </div>}
            <div className="logoutBtn" onClick={handleLogout}>
              Logout
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
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
          <ChatInput handleSendMessage={handleSendMessage} isMobileScreen={isMobileScreen}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
