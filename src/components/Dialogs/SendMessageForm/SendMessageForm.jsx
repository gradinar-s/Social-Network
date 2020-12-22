import React from "react";
import styles from "./SendMessageForm.module.css";
import { Field, reduxForm } from "redux-form";
import { RemoveButtonWhenEmptyLine } from "../../common/FormsControls/FormsControls";
import { required } from "../../../utils/validators";

let RemoveBlankLineButtonMessage = RemoveButtonWhenEmptyLine(styles.buttonSend, "Send");

let messageInput = (props) => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <Field component={RemoveBlankLineButtonMessage} name={"textMessage"} validate={[required]} />
    </form>
  );
};
export const messageInputRedux = reduxForm({
  form: "message",
})(messageInput);
