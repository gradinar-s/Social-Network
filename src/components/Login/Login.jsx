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
  const onSubmit = ({ email, password, rememberMe, captcha, ...formData }) => {
    props.login(email, password, rememberMe, captcha);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <span className={styles.info}>Please log in to the social network</span>
      <LoginFormContainer {...props} onSubmit={onSubmit} />
    </section>
  );
};

const Input = Element("input");

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      {props.error && (
        <div className={stylesForm.generalFormError}>
          <p className={stylesForm.errorDescription}>{props.error}</p>
        </div>
      )}
      <div>
        <Field component={Input} name={"email"} validate={[required]} />
        <Field component={Input} name={"password"} type="password" validate={[required]} />
      </div>
      <div className={styles.rememberMe}>
        <Field component={Input} type={"checkbox"} label="Remember me" name={"rememberMe"} />
      </div>
      {props.isCaptcha && (
        <div className={styles.captcha}>
          <img src={props.captchaUrl} alt="" />
          <Field component={Input} name={"captcha"} validate={[required]} />
        </div>
      )}
      <div className={styles.testAccount}>
        Login and password for full-fledged work with the social network, I will provide personally
      </div>
      <div>
        <button className={styles.btn}>Login</button>
      </div>
    </form>
  );
};

const LoginFormContainer = reduxForm({ form: "login" })(LoginForm);

const mapStateToProps = (state) => {
  // debugger;
  return {
    isAuth: state.auth.isAuth,
    isCaptcha: state.auth.isCaptcha,
    captchaUrl: state.auth.captchaUrl,
  };
};
export default connect(mapStateToProps, { login })(Login);
