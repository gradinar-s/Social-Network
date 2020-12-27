import React from "react";
import style from "./BasicUserInfo.module.css";
import { Element } from "../../common/FormsControls/FormsControls";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../utils/validators";
// import { Contacts } from "./BasicUserInfo";

const Input = Element("input");
const Textarea = Element("textarea");

export const BasicUserInfoEdit = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={style.userInfo_mEdit} id="userInfo">
      <div className={style.wrapperBasicUserInfo_mEdit}>
        <div className={style.generalInfoAboutMe_mEdit}>
          <div className={style.userName_mEdit}>
            <label htmlFor="fullName">Full Name</label>
            <Field component={Input} name={"fullName"} validate={[required]} />
          </div>
          <div className={style.aboutMe_mEdit}>
            <label htmlFor="aboutMe">About me</label>
            <Field component={Textarea} name={"aboutMe"} validate={[required]} />
          </div>
          <div className={style.lookingForAJob_mEdit}>
            <Field
              component={Input}
              type="checkbox"
              label="Looking for a job"
              name={"lookingForAJob"}
            />
          </div>
          <div className={style.lookingForAJobDescription_mEdit}>
            <label htmlFor="skills">Proffesionas skills</label>
            <Field
              component={Textarea}
              type="text"
              name={"lookingForAJobDescription"}
              validate={[required]}
            />
          </div>
        </div>
        {/* <div className={style.contacts_mEdit}>
          <span>Contacts</span>
          <div className={style.contactItem_mEdit}>
            {Object.keys(props.profile.contacts).map((key) => (
              <Field component={Input} placeholder={key} name={`contacts.${key}`} />
            ))}
          </div>
        </div> */}
      </div>
    </form>
  );
};

const BasicUserInfoEditReduxForm = reduxForm({ form: "editProfile" })(BasicUserInfoEdit);

export default BasicUserInfoEditReduxForm;
