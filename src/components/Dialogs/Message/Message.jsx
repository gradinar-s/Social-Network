import React from "react";
import styles from "./../Dialogs.module.css";

const Message = (props) => {
  return (
      <div className={styles.item}>
        <span className={styles.message}>{props.message}</span>
      </div>
  );
};

export default Message;
