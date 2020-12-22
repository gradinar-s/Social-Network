import React from "react";
import { messageInputRedux } from "./SendMessageForm";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageText: state.dialogsPage.newMessageText,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {};
};

const InputPanelContainer = connect(mapStateToProps, mapDispatchToProps)(messageInputRedux);

export default InputPanelContainer;
