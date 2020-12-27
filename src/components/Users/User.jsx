import React from "react";
import styles from "./Users.module.css";
import photoLarge from "../../img/photo.jpg";
import { NavLink } from "react-router-dom";
import ButtonFollowed from "./commonUser/ButtonFollowed";

export const User = (props) => {
  const user = props.user;
  return (
    <div key={user.id} className={styles.item}>
      <div className={styles.verticalBlock}>
        <NavLink to={`/profile/${user.id}`} className={styles.avatar}>
          <img src={user.photos.large != null ? user.photos.large : photoLarge} alt="" />
        </NavLink>
        <ButtonFollowed
          isAuth={props.isAuth}
          followingInProgress={props.followingInProgress}
          followThunkCreator={props.followThunkCreator}
          unfollowThunkCreator={props.unfollowThunkCreator}
          user={props.user}
        />
      </div>
      <div className={styles.navItem}>
        <NavLink to={`/profile/${user.id}`}>
          <div className={styles.name}>{user.name}</div>
        </NavLink>
        <span className={styles.status}>{user.status}</span>
      </div>
    </div>
  );
};

export default User;
