import React from "react";
import styles from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <NavLink to={path} className={styles.senderDialog}>
      {props.name}
    </NavLink>
  );
};

export default DialogItem;
