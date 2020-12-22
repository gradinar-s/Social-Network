import React from "react";
import styles from "./Dialogs.module.css";
import MessageAddress from "./Message/MessageAddress/MessageAddress";
import InputPanelContainer from "./SendMessageForm/SendMessageFormContainer";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogs = state.dialogsData.map((dialog) => (
    <DialogItem key={dialog.id} id={dialog.id} name={dialog.name} />
  ));
  let messages = state.messagesData.map((message) => (
    <Message key={message.id} id={message.id} message={message.message} />
  ));
  let addNewMessage = (values) => {
    console.log(values.textMessage);
    props.addMessage(values.textMessage);
  };
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogItem}>{dialogs}</div>
      <div className={styles.messageItem}>
        <MessageAddress />
        <div className={styles.messageWrapper}>
          <div className={styles.messageBody}>{messages}</div>
        </div>
        <InputPanelContainer onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
