import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/ProfileSetting";
import { useAuth } from "./hooks";
import WriteBlog from "./pages/WriteBlog";

function App() {
  const auth = useAuth();
  const PageNotFound = () => {
    return <h1>404</h1>;
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Login />
          </Route>
          <Route exact path="/writeBlog">
            <WriteBlog />
          </Route>
          <Route exact path="/profile">
          {/* <Profile />  */}
            {auth.user ? <Profile /> : <Login />}
          </Route>
          <Route path="/profile/setting">
          {/* <ProfileSetting /> */}
            {auth.user ? <ProfileSetting /> : <Login />}
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
