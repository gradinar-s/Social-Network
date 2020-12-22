import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import edit from "../../img/icon/edit.png";

const ProfileStatusWithHooks = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Когда компонент отрисуется, выполнится код...
    setStatus(props.status);
  }, [props.status]);

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
    <div>
      <div>
        {!editMode && (
          <div className={styles.editStatus}>
            <span onClick={onEditMode} className={styles.editStatusText}>
              {props.status || "Добавить статус"}
            </span>
            <img src={edit} alt="" />
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

export default ProfileStatusWithHooks;
