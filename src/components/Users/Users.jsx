import React from "react";
import styles from "./Users.module.css";
import Pagination from "../common/Pagination/Pagination";
import User from "./User";

export const Users = (props) => {
  const PORTION_SIZE = 10;
  return (
    <div className={styles.users}>
      <Pagination
        onPageChanged={props.onPageChanged}
        totalItemsCount={props.totalUserCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        portionSize={PORTION_SIZE}
      />
      {props.users.map((u) => (
        <User
          user={u}
          key={u.id}
          isAuth={props.isAuth}
          followingInProgress={props.followingInProgress}
          followThunkCreator={props.followThunkCreator}
          unfollowThunkCreator={props.unfollowThunkCreator}
        />
      ))}
    </div>
  );
};

export default Users;
