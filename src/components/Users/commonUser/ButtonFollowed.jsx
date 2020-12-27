import React from "react";
import { connect } from "react-redux";
import styles from "../Users.module.css";

const ButtonFollowed = (props) => {
  const user = props.user;
  return (
    <>
      {props.isAuth && (
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, {})(ButtonFollowed);
