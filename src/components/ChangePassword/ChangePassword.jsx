import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../database/lowdb";
import "./ChangePassword.css";
import { login } from "../../features/userSlice";

const ChangePassword = () => {
  // utilizar el metodo creado en lowdb para updatear la password.
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleChangePass = (e) => {
    setMessage("");
    setMessageColor("");
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = updateUserPassword(user.username, password);

    if (success) {
      setMessage("password updated sucessfully");
      setMessageColor("successMessage");
      dispatch(
        login({
          ...user,
          password: password,
        })
      );
    } else {
      setMessage("user not found :'(");
      setMessageColor("errorMessage");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h1>Change your password</h1>
        <form>
          <div>
            <label>New Password </label>
            <input type="password" name="upass" onChange={handleChangePass} />
          </div>
          <div>
            <input type="submit" onClick={handleSubmit} />
          </div>
          <br />
          <p className={messageColor}>
            {message}{" "}
            {messageColor === "successMessage" ? (
              <Link to="/myprofile">Go to my profile</Link>
            ) : (
              ""
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
