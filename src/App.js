import React, { Suspense } from "react";
import "./App.css";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { compose } from "redux";
import NavbarContainer from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Preloader from "./components/common/Preloader/Preloader";
import Login from "./components/Login/Login";
// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

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
            <Suspense fallback={<Preloader />}>
              {/* : указывает что дальше будут параметры */}
              {/* ? указывает что параметр не обязательный */}
              <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
              <Route path="/dialogs" render={() => <DialogsContainer />} />
            </Suspense>
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <Login />} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initializationSuccess: state.app.initializationSuccess,
});
export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
