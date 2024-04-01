import React, { useState, useEffect } from "react";
import './Register.css';
import { useNavigate, NavLink } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from "../../utils/APIRoutes";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
        console.log("Submitted:", { username, email, password, confirmPassword });
        const registerData = await axios.post(registerRoute, {username, email, password});
        console.log("registerData is : ", registerData);
        if(registerData.data.status===false){
            toast.error(registerData.data.msg);
        }
        else if(registerData.data.status===true){
            localStorage.setItem('chat-app-user',JSON.stringify(registerData.data.user))
            navigate('/');
        }
    }
  };

  const handleValidation = () => {
    if(password!==confirmPassword){
        toast.error("password and confirm password should be same", {autoClose: 1000});
        return false;
    }
    else if(username.length<4){
        toast.error("Username should be greater than 4 letters")
        return false;
    }
    else if(password.length<8){
        toast.error("Password should be more than or equal to 8 characteres")
        return false;
    }
    else if(email === ""){
        toast.error("email is required");
        return false;
    }
    return true;
  }

  const handleClick = () => {
    navigate("/login");
  }

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="RegisterCont">
      <div className="RegisterFormContainer">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="RegisterFormFields">
          <div className="registerFormInpFields">
            <input
              type="text"
              value={username}
              placeholder="username..."
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="registerFormInpFields">
            <input
              type="email"
              value={email}
              placeholder="Enter email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="registerFormInpFields">
            <input
              type="password"
              value={password}
              placeholder="Enter Password..."
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="registerFormInpFields">
            <input
              type="password"
              value={confirmPassword}
              placeholder="confirm Password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="RegisterBtn"><button type="submit">Register</button></div>
        </form>
        <div className="redirectToLogin">
            <p>Already have an Account?</p>
            <button onClick={handleClick}>Login</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
