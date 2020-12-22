import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength, minLength } from "../../../utils/validators";
import { Element } from "../../common/FormsControls/FormsControls";
import styles from "./MyPosts.module.css";

const maxLength_50 = maxLength(50);
const minLength_3 = minLength(3);

const Textarea = Element("textarea");

const MyPostsForm = (props) => {
  return (
    <form className={styles.myPostForm} onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="newPostMessage" validate={[maxLength_50, minLength_3]} />
      <button>Send</button> 
    </form>
  );
};

export const MyPostFormHOC = reduxForm({ form: "newPostMessage" })(MyPostsForm);
