import React from "react";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../common/Preloader/Preloader";
import photoLarge from "../../img/photo.jpg";
import { Redirect } from "react-router-dom";
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const Profile = (props) => {
  
  if (!props.profile) {
    return <Preloader />;
  }
  if (!props.isAuth && !props.match.params) {
    return <Redirect to="/login" />;
  } else
    return (
      <div>
        <div className={styles.content__header}>
          <div className={styles.content__image}>
            <div className={styles.content__background}>
              <img
                src="https://coremission.net/wp-content/uploads/2019/10/bezshovnaya-tekstura-6.jpg"
                alt=""
              />
            </div>
            <div className={styles.content__userPhoto}>
              <img
                // Если фото НЕ равно null (true) -> отрисуй то что сидит в props -> иначе...
                src={props.profile.photos.large != null ? props.profile.photos.large : photoLarge}
                alt=""
              />
            </div>
          </div>
          <div className={styles.content__info}>
            <h1 className={styles.content__name}>{props.profile.fullName}</h1>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
          </div>
        </div>
        <MyPostsContainer />
      </div>
    );
};

export default Profile;
