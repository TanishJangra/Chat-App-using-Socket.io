import React from "react";
import "./ChatContainer.css";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ChatInput from "../ChatInput/ChatInput";
import Messages from "../Messages/Messages";

const ChatContainer = ({ currentChat }) => {

    const navigate = useNavigate();

    const handleSendMessage = async (mssg) => {
      alert(mssg);
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
          <Messages/>
          <ChatInput handleSendMessage={handleSendMessage}/>
        </div>
      )}
    </>
  );
};

export default ChatContainer;
