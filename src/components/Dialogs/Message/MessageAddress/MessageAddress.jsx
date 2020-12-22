import React from "react";
import styles from "./MessageAddress.module.css";

const MessageAddress = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.avatar}>
        <img src={props.avatar} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Name Surname</div>
        <div className={styles.status}>Online/Offline</div>
      </div>

    </div>
  );
}

export default MessageAddress;

