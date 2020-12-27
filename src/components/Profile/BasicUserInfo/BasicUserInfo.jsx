import React from "react";
import style from "./BasicUserInfo.module.css";
import ProfileStatus from "../ProfileStatus";

const BasicUserInfo = (props) => {
  return (
    <div className={style.userInfo}>
      <div className={style.userName}>{props.profile.fullName}</div>
      <ProfileStatus
        isOwner={props.isOwner}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <hr />
      <div className={style.wrapperBasicUserInfo}>
        <div className={style.basicUserInfo}>
          <div className={style.aboutMe}>About me</div>
          <p className={style.aboutMeDescription}>{props.profile.aboutMe}</p>
          <div
            className={props.profile.lookingForAJob ? style.lookingForAJob : style.noLookingForAJob}
          >
            Looking for a job
          </div>
          <div className={style.lookingForAJobDescription}>
            Proffesionas skills
            <p>{props.profile.lookingForAJobDescription}</p>
          </div>
        </div>
        {/* <div className={style.wrapperContacts}>
          <div className={style.contacts}>Contacts</div>
          <div className={style.contactItem}>
            {Object.keys(props.profile.contacts)
              .map((key) => (
                <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
              ))
              .filter((obj) => obj.props.contactValue)}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export const Contacts = ({ contactTitle, contactValue, ...props }) => {
  return (
    <div>
      <a href={contactValue}>{contactTitle}</a>
    </div>
  );
};

export default BasicUserInfo;
