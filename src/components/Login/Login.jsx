import React from "react";
import styles from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators";
import { Element } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import stylesForm from "../common/FormsControls/FormsControls.module.css";

const Login = (props) => {
  const onSubmit = ({ email, password, rememberMe, ...formData }) => {
    props.login(email, password, rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <span className={styles.info}>Please log in to the social network</span>
      <LoginFormContainer onSubmit={onSubmit} />
    </section>
  );
};

const LoginForm = (props) => {
  const Input = Element("input");
  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      {props.error && (
        <div className={stylesForm.generalFormError}>
          <span className={stylesForm.errorTitle}>Title</span>
          <p className={stylesForm.errorDescription}>{props.error}</p>
        </div>
      )}
      <div>
        <Field component={Input} name={"email"} validate={[required]} />
        <Field component={Input} name={"password"} type="password" validate={[required]} />
      </div>
      <div className={styles.rememberMe}>
        <Field component={Input} type={"checkbox"} name={"rememberMe"} />
        <span>Rememder me</span>
      </div>
      <div>
        <button className={styles.btn}>Login</button>
      </div>
    </form>
  );
};

const LoginFormContainer = reduxForm({ form: "login" })(LoginForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps, { login })(Login);
