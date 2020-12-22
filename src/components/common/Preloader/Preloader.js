import React from "react";
import preloader from "../../../img/preloader.svg";
import styles from "./Preloader.module.css";

let Preloader = (props) => {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt="" className={styles.gif} />
    </div>
  );
};

export default Preloader;
