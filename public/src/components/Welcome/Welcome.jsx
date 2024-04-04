import React from "react";
import "./Welcome.css";
const Welcome = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  return (
    <div className="WelcomePageContainer">
      <div className="WelcomeCont">
        <h1>
          Welcome,{" "}
          <span>{currentUser ? currentUser.username:""}</span>
        </h1>
        <h3>Select a chat to Start Messaging.</h3>
      </div>
    </div>
  );
};

export default Welcome;
