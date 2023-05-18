// import React, { useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="Greetings">
        <h1>Welcome {user.username}</h1>
        <h2>
          Go to your <Link to="/myprofile">profile</Link>
        </h2>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
