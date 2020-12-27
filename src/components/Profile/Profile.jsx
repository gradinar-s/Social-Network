import React from "react";
import styles from "./Profile.module.css";
import Preloader from "../common/Preloader/Preloader";
import photoLarge from "../../img/photo.jpg";
import { Redirect } from "react-router-dom";
import edit from "../../img/icon/edit.png";
import MyPosts from "./MyPosts/MyPosts";
import BasicUserInfo from "./BasicUserInfo/BasicUserInfo";
import BasicUserInfoEditReduxForm from "./BasicUserInfo/BasicUserInfoEdit";

const Profile = (props) => {
  const [editMode, setEditMode] = React.useState(false);
  if (!props.profile) {
    return <Preloader />;
  }
  if (!props.isAuth && !props.match.params) {
    return <Redirect to="/login" />;
  }
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.setUserAvatar(e.target.files[0]);
    }
  };  
  const onSubmit = (formData) => {
    props.setBasicInfo(formData);
    setEditMode(false);
  };
  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
  };
  return (
    <section className={styles.profile}>
      <div className={styles.topSectionProfile}>
        <div className={styles.wrapperMainAvatar}>
          <img
            className={styles.mainAvatar}
            src={props.profile.photos.large || photoLarge}
            alt=""
          />
          {props.isOwner && editMode ? (
            <div className={styles.decision}>
              <button form="userInfo" className={styles.buttonSaveEditBasicUserInfo}>
                Save
              </button>
              <button className={styles.buttonCancelEditBasicUserInfo} onClick={offEditMode}>
                Cancel
              </button>
            </div>
          ) : (
            props.isOwner && (
              <button className={styles.buttonEditBasicUserInfo} onClick={onEditMode}>
                Edit profile
              </button>
            )
          )}
          {props.isOwner && editMode && (
            <div className={styles.buttonEditMainAvatar}>
              <input type="file" id="file" onChange={onMainPhotoSelected} className={styles.file} />
              <label htmlFor="file">
                <img src={edit} alt="" />
              </label>
            </div>
          )}
        </div>

        {editMode ? (
          <BasicUserInfoEditReduxForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
            setEditMode={setEditMode}
          />
        ) : (
          <BasicUserInfo
            setEditMode={setEditMode}
            isOwner={props.isOwner}
            status={props.status}
            updateStatus={props.updateStatus}
            profile={props.profile}
          />
        )}
      </div>
      <MyPosts isOwner={props.isOwner} />
    </section>
  );
};

export default Profile;
