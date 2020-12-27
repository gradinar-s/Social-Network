import styles from "./Profile.module.css";

import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import edit from "../../img/icon/edit.png";

const ProfileStatus = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  // useRef

  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div className={styles.wrapperBodyStatus}>
      <div>
        {!editMode && (
          <div className={styles.wrapperTextStatus}>
            <span
              onClick={props.isAuth && props.isOwner && onEditMode}
              className={styles.textStatus}
            >
              {props.status || ""}
              {(props.isAuth && props.isOwner && !!status && <img src={edit} alt="" />) ||
                (props.isOwner && "Добавить статус")}
              {props.errorStatus && <span className={styles.errorStatus}>{props.errorStatus}</span>}
            </span>
          </div>
        )}
      </div>
      {editMode && (
        <div>
          <input autoFocus onBlur={offEditMode} onChange={onStatusChange} value={status} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    authUserProfile: state.auth.authUserProfile,
    errorStatus: state.profilePage.messageError.errorStatus,
  };
};
export default compose(connect(mapStateToProps, {}), withRouter)(ProfileStatus);
