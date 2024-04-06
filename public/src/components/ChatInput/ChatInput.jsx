import React, {useState} from "react";
import "./ChatInput.css";
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

const ChatInput = ({handleSendMessage}) => {
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const [mssg, setMssg] = useState("");

    const handleEmoji = () => {
        setIsEmojiPicker(!isEmojiPicker)
    }

    const handleEmojiClick = (e) => {
      console.log("clicked", e);
        let message = mssg;
        message+=e.emoji;
        setMssg(message);
    }

    const sendMsg = (e) => {
      e.preventDefault();
      if(mssg.length>0){
        handleSendMessage(mssg);
        setMssg("")
      }
    }

  return (
    <div className="chatInput">
        <div className="emoji">
        <BsEmojiSmileFill onClick={handleEmoji}/>
        {
            isEmojiPicker && <Picker className="EmojiPicker" onEmojiClick={handleEmojiClick}/>
        }
        </div>
      <form className="inputForm" onSubmit={(e)=>sendMsg(e)}>
      <input
        type="text"
        placeholder="Type a Message"
        className="inputMessageBox"
        value={mssg}
        onChange={(e)=>setMssg(e.target.value)}
      />
      <button type="submit" className="formBtn"><SendIcon className="sendMssgIcon" onClick={sendMsg}/></button>
      </form>
    </div>
  );
};

export default ChatInput;
