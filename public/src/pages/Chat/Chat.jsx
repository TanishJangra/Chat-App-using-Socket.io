import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../../utils/APIRoutes";
import Contacts from "../../components/Contacts/Contacts";
import "./Chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

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

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setData();
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  return (
    <div className="chatContainer">
      <div className="chatContainerInnerDiv">
      <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Chat;
