import React, { Component, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Home from "./pages/Home";
import ManagePosts from "./pages/ManagePosts";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import { getUserInfo } from "./helper";
import UserContext from './context/userContext';

const user = getUserInfo();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: user,
    };
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div className="App">
        <Router>
        <UserContext.Provider value={{userInfo:userInfo}}>
          <Header
            setUserInfo={() => this.setState({ userInfo: getUserInfo() })}
          />
          <Suspense
            fallback={
              <CircularProgress color="secondary" className="loading" />
            }
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home/>}
              />
              <Route
                exact
                path="/register"
                render={() => <Register />}
              />
              <Route
                exact
                path="/login"
                render={() => (
                  <Login
                    setUserInfo={() =>
                      this.setState({ userInfo: getUserInfo() })
                    }
                  />
                )}
              />
              <Route
                exact
                path="/create-post"
                render={() => <CreatePost />}
              />
              <Route
                exact
                path="/edit-post"
                render={() => <EditPost/>}
              />
              <Route
                exact
                path="/posts"
                render={() => <Posts/>}
              />
              <Route
                exact
                path="/manage-posts"
                render={() => <ManagePosts/>}
              />
              <Route
                exact
                path="/post/:id"
                render={() => <Post/>}
              />
            </Switch>
          </Suspense>
          <Footer />
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
