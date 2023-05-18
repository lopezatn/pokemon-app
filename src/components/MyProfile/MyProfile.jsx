import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/";

const MyProfile = () => {
    
    const user = useSelector((state) => state.user);
    const history = useHistory();


    const handleClick = () => {
        history.push("/changepassword");
    }

    return (
        <>
        <h1>Welcome back {user.username}!</h1>
        <p>Your registered email is: <b>{user.email}</b></p>
        <p>Your current password is: <b>{user.password}</b></p>
        <br/>
        <p>If you would like to change your current password <button onClick={handleClick}>click here</button></p>
        </>
    )
}

export default MyProfile;