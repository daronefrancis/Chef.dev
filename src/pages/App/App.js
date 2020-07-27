import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import profileService from "../../utils/profileService";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import HomePage from '../../pages/HomePage/HomePage';
import DetailPage from '../../pages/DetailPage/DetailPage';
import ProfilePage from '../../pages/ProfilePage/Profile';
import NewPostPage from "../NewPostPage/NewPostPage";
import { makeStyles } from '@material-ui/core/styles';
class App extends Component {
  constructor() {
    super();
    this.state = {
      profile: profileService.getProfile(),
    };
  }

  handleLogout = () => {
    profileService.logout();
    this.setState({ profile: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ profile: profileService.getProfile() });
  };

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
    
         <Route 
         exact path="/"
         render={() => (
           <HomePage />
         )}
         />

         <Route
         exact path="/post"
         render={() => (
             <DetailPage />
         )}
         />

        <Route
          exact path="/post/new"
          render={() => (
              <NewPostPage />
          )}
        />

        <Route
         exact path="/profile"
         render={() => (
             <ProfilePage />
         )}
         />

          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />

          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
