import React from "react";
import styles from "./Users.module.css";
import photoLarge from "../../img/photo.jpg";
import { NavLink } from "react-router-dom";

export const User = (props) => {
  const user = props.user;
  return (
    <div key={user.id} className={styles.item}>
      <NavLink to={`/profile/${user.id}`} className={styles.avatar}>
        <img src={user.photos.large != null ? user.photos.large : photoLarge} alt="" />
      </NavLink>
      <NavLink to={`/profile/${user.id}`}>
        <div className={styles.name}>{user.name}</div>
      </NavLink>
      <div className={styles.followed}>
        {user.followed ? (
          <button
            // если id (каждый элемент) === id нажатого чувака, то true
            disabled={props.followingInProgress.some((id) => id === user.id)}
            onClick={() => props.followThunkCreator(user.id)}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={props.followingInProgress.some((id) => id === user.id)}
            onClick={() => props.unfollowThunkCreator(user.id)}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
