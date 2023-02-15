import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/ProfileSetting";
import { useAuth } from "./hooks";
import WriteBlog from "./pages/WriteBlog";
import { Toaster } from "react-hot-toast";
import ReadBlog from "./pages/ReadBlog";
import FollowList from "./pages/FollowList";
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
            {auth.user ? <WriteBlog /> : <Login />}
          </Route>
          <Route exact path="/readBlog/:id">
            {auth.user ? <ReadBlog /> : <Login />}
          </Route>
          <Route exact path="/profile/:id">
            {auth.user ? <Profile /> : <Login />}
          </Route>
          <Route exact path="/profileSetting">
            {auth.user ? <ProfileSetting /> : <Login />}
          </Route>
          <Route exact path="/followList/:list">
            {auth.user ? <FollowList/> : <Login />}
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
