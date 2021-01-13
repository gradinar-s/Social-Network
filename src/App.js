import "./App.css";

import React, { Suspense } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { initializeApp } from "./redux/appReducer";
import NavbarContainer from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initializationSuccess) {
      return <Preloader />;
    }
    return (
      <div className="main-wrapper">
        <HeaderContainer />
        <div className="wrapper">
          <NavbarContainer />
          <div className="wrapper-content">
            <Route
              exact
              path="/"
              render={() =>
                this.props.isAuth ? <Redirect to="/profile" /> : <Redirect to="/login" />
              }
            />
            <Suspense fallback={<Preloader />}>
              {/* : указывает что дальше будут параметры */}
              {/* ? указывает что параметр не обязательный */}
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
            </Suspense>
            {/* <Route exact (что-бы что-то отрисовалось, patch должен совпасть точь в точь) patch='/patch /> */}
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initializationSuccess: state.app.initializationSuccess,
  isAuth: state.auth.isAuth,
});
export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
