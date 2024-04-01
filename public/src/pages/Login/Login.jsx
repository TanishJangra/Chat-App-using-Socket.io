import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("Submitted:", { username, password });
      const loginData = await axios.post(loginRoute, {
        username,
        password,
      });
      console.log("logindata is :", loginData);
      if (loginData.data.status === false) {
        toast.error(loginData.data.msg);
      } else if (loginData.data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(loginData.data.user)
        );
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    if (password === "") {
      toast.error("username and password are required", {
        autoClose: 1000,
      });
      return false;
    } else if (username.length === "") {
      toast.error("username and password are required");
      return false;
    }
    return true;
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="loginCont">
      <div className="loginFormContainer">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="loginFormFields">
          <div className="loginFormInpFields">
            <input
              type="text"
              value={username}
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
              required
              min={3}
            />
          </div>
          <div className="loginFormInpFields">
            <input
              type="password"
              value={password}
              placeholder="Enter Password..."
              onChange={(e) => setPassword(e.target.value)}
              required
              min={8}
            />
          </div>
          <div className="loginBtn">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="redirectToRegister">
          <p>Not Registered yet?</p>
          <button onClick={handleClick}>Register</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
