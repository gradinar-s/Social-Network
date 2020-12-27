import React from "react";
import styles from "./Header.module.css";
import { NavLink, Redirect } from "react-router-dom";
import searchIcon from "../../img/icon/search.png";
import socialNetvorkMainLogo from "../../img/socialNetvorkMainLogo.png";
import photoLarge from "../../img/photo.jpg";

const Header = (props) => {
  let getImage = () => {
    if (props.authUserProfile) {
      // проверка на то есть ли что-то внутри (пустота (null, undefined, false), пустой объект, что-то есть..)
      // проверка а есть ли вообще это поле
      if (props.authUserProfile.photos.small) {
        return props.authUserProfile.photos.small;
      } else {
        return photoLarge;
      }
    } else {
      return photoLarge;
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <h1 className={styles.sectionTitle}>Section title</h1>
        <NavLink to="/profile">
          <div className={styles.logo}>
            <img src={socialNetvorkMainLogo} alt="" />
          </div>
        </NavLink>
        {props.isAuth ? (
          <span className={styles.search}>
            <img src={searchIcon} alt="" />
          </span>
        ) : null}
        {props.isAuth ? (
          // .menu {display: none} -> md 767
          <div className={styles.menu}>
            <NavLink to={`/profile`} className={styles.userName}>
              {props.login}
            </NavLink>
            <div className={styles.avatar}>
              <img src={getImage()} alt="" />
            </div>
            <button className={styles.authBtn} onClick={props.logout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className={styles.auth}>
            <button className={styles.authBtn}>Sign Up</button>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
