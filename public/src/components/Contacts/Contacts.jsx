import React, { useEffect, useState } from "react";
import "./Contacts.css";
import img from "./../../assets/meetme.png";

const Contacts = ({ contacts, currentUser }) => {
  console.log("contacts details are: ", contacts);

  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);
  console.log("avatarImage is:::::::::::", currentUserImage);
  const changeCurrentChat = (ind, contact) => {};

  return (
    <>
      {currentUserImage && currentUsername && (
        <div className="contactsContainer">
          <div className="contactHeader">
            <img src={img} alt="img" className="logoImg" />
            <h1>ChatBot</h1>
          </div>
          <div className="chatsContact">
            {contacts.map((item, ind) => (
              <div
                key={ind}
                className={`contactsDiv ${
                  ind === currentSelected ? "selected" : ""
                }`}
              >
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    item.avatarImage
                  )}`}
                  alt="img"
                  className="usersImg"
                />
                <p className="contactItemUsername">{item.username}</p>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  currentUserImage
                )}`}
                alt="img"
                className="usersImg"
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
