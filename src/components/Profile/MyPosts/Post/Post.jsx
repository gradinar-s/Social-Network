import React from "react";
import styles from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={styles.posts__item}>
      <div className={styles.posts__image}></div>
      <div className={styles.postWrapper}>
        <div className={styles.postSender}>{props.name}</div>
        <div className={styles.posts__post}>{props.post}</div>
      </div>
      <div className={styles.likes}>
        <span className={styles.likesCount}>
          LIKE <span className={styles.likesCountNumeral}>{props.likesCount}</span>
        </span>
      </div>
    </div>
  );
};

export default Post;
