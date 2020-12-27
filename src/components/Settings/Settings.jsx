import React from "react";
import { connect } from "react-redux";
import style from "./Settings.module.css";
import { logout } from "../../redux/authReducer";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";

const Settings = (props) => {
  return (
    <div>
      <h1 className={style.title}>Settings</h1>
      <button className={style.importantly} onClick={props.logout}>
        Sign out account
      </button>
    </div>
  );
};

export default compose(connect(null, { logout }), WithAuthRedirect)(Settings);
