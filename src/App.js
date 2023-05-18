import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { Route, Switch as Routes } from "react-router-dom";
import MyProfile from "./components/MyProfile/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Pokemon from "./components/PokemonTable/Pokemon";
import NotFound from "./components/NotFound/NotFound";
import ChangePassword from "./components/ChangePassword/ChangePassword";

function App() {
  const user = useSelector((state) => state.user);

  const isLogged = user ? true : false;

  return (
    <Routes>
      <Route exact path="/login">
        <Login />
      </Route>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isLogged}
      />
      <ProtectedRoute
        exact
        path="/myprofile"
        component={MyProfile}
        isAuthenticated={isLogged}
      />
      <ProtectedRoute
        exact
        path="/changepassword"
        component={ChangePassword}
        isAuthenticated={isLogged}
      />
      <ProtectedRoute
        exact
        path="/pokemon"
        component={Pokemon}
        isAuthenticated={isLogged}
      />
      <Route path="*">
        <NotFound />
      </Route>
    </Routes>
  );
}

export default App;
