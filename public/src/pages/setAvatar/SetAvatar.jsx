import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SetAvatar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../../utils/APIRoutes";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const fetchData = async () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        data.push(response.data);
      }
      setAvatars(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching avatars:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setProfilePicture = async () => {
    // Implement your set profile picture logic here
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar first", { autoClose: 1000 });
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log("user is :", user);
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log("data is : ", data);
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));

        navigate("/");
      } else {
        toast.error("Error setting avatar, please try again later");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="setAvatarContainer">
      <div className="setAvatarCont">
        <h1>Pick an avatar as your profile picture</h1>
        <div className="avatars">
          {avatars.map((avatar, index) => (
            <div
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
              key={index}
            >
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
                alt={`Avatar ${index + 1}`}
                onClick={() => setSelectedAvatar(index)}
              />
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>
          Set as Profile Picture
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
