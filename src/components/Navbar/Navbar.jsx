import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import profile from "../../img/icon/profile.png";
import friends from "../../img/icon/friends.png";
import settings from "../../img/icon/settings.png";
import messages from "../../img/icon/messages.png";
import { connect } from "react-redux";
import { friendsRecomendationsThunk } from "../../redux/usersReducer";
import photoLarge from "../../img/photo.jpg";
import { compose } from "redux";

const Navbar = (props) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <NavLink to="/profile">
            <span className={styles.nameLink}>Profile</span>{" "}
            <img className={styles.icon} src={profile} alt="" />
          </NavLink>
          <NavLink to="/dialogs">
            <span className={styles.nameLink}>Messages</span>{" "}
            <img className={styles.icon} src={messages} alt="" />
          </NavLink>
          <NavLink to="/users">
            <span className={styles.nameLink}>Friends</span>
            <div
              className={
                props.isAuth ? styles.friendsRecomendations : styles.friendsRecomendationsNone
              }
            >
              {props.friendsRecomendations.map((u) => (
                <NavLink key={u.id} to={`/profile/${u.id}`}>
                  <img title={u.name} src={u.photos.small ? u.photos.small : photoLarge} alt="" />
                </NavLink>
              ))}
            </div>
            <img className={styles.icon} src={friends} alt="" />
          </NavLink>
          <NavLink to="/settings">
            <span className={styles.nameLink}>Settings</span>{" "}
            <img className={styles.icon} src={settings} alt="" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export class NavbarContainer extends React.Component {
  componentDidMount() {
    this.props.friendsRecomendationsThunk(3);
  }

  render() {
    return <Navbar {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    friendsRecomendations: state.usersPage.friendsRecomendations,
    isAuth: state.auth.isAuth,
  };
};

export default compose(connect(mapStateToProps, { friendsRecomendationsThunk }))(NavbarContainer);
