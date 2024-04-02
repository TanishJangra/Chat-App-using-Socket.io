import React, { useState } from "react";
import "./Contacts.css";
const Contacts = ({ contacts, currentUser }) => {
  console.log("contacts details are: ", contacts);
  return (
    <div className="contactsContainer">
      {contacts.map((item, ind) => (
        <div key={ind} className="contactsDiv">
          <p className="contactItemAvatarImg">{item.avatarImage}</p>
          <p className="contactItemUsername">{item.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
