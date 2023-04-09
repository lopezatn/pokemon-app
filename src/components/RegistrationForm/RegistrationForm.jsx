import React, { useState } from "react";
import "./components/RegistrationForm/RegistrationForm.css";
import { createUser, getUsers } from "../database/lowdb";

const RegistrationForm = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleUserName = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const handleUserPassword = (e) => {
    const userPwd = e.target.value;
    setUserPassword(userPwd);
  };

  const handleUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const handleSubmitBttn = (e) => {
    e.preventDefault();
    if (userName && userPassword && userEmail !== "") {
      createUser(userName, userPassword, userEmail);
      console.log("Is it working?", getUsers());
    } else {
      alert("One of the fields is missing!");
    }
  };

  return (
    <div className="form-container">
      <form className="form-styling">
        <label className="label">Name</label>
        <input className="input" onChange={handleUserName} type="text" />

        <label className="label">Password</label>
        <input className="input" onChange={handleUserPassword} type="text" />

        <label className="label">Email</label>
        <input className="input" onChange={handleUserEmail} type="text" />

        <button onClick={handleSubmitBttn} className="bttn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
