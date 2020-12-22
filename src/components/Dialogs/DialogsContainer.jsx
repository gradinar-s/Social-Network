import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { addMessageActionCreator } from "../../redux/dialogsReducer";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (textMessage) => {
      dispatch(addMessageActionCreator(textMessage));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect,
)(Dialogs);
// connect собирает компоненту, и возвращает её с props котрые берёт с функций mstp, mdtp (это то что мы передём в compose вторым вызовом)
