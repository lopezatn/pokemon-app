import React, { useState } from "react";
import "./Login.css";
import { getUserByUsername } from "../../database/lowdb";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { useHistory } from "react-router-dom/";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = getUserByUsername(username);
    if (user === undefined) {
      setErrorMessage("User not found");
    } else if (password !== user.password) {
      setErrorMessage("Password is incorrect");
    } else {
      dispatch(login(user));
      history.push("/");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Welcome to your Pokemon Wiki</h1>
        <p>Log-in to continue</p>
        <form className="login-form">
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" onChange={handleChangeUser} />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="upass" onChange={handleChangePass} />
          </div>
          <div className="button-container">
            <input type="submit" onClick={handleSubmit} />
          </div>
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
