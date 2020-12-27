import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_AUTH_USER_PROFILE = "auth/SET_AUTH_USER_PROFILE";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  authUserProfile: null,
  captchaUrl: "",
  isCaptcha: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_AUTH_USER_PROFILE: {
      return {
        ...state,
        authUserProfile: { ...action.data },
      };
    }
    case SET_CAPTCHA_URL: {
      return {
        ...state,
        isCaptcha: true,
        captchaUrl: action.url,
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});
export const setAuthUserProfile = (data) => ({
  type: SET_AUTH_USER_PROFILE,
  data,
});
export const setCaptchaUrlAC = (url) => ({
  type: SET_CAPTCHA_URL,
  url,
});

// ThunkCreator
export const getAuthUserData = () => (dispatch) => {
  return authAPI.me().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data; // Деструктуризация объекта
      dispatch(setAuthUserData(id, email, login, true));
      dispatch(setAuthUserProfileThunkCreator(id));
    }
  });
};

export const setAuthUserProfileThunkCreator = (id) => (dispatch) => {
  profileAPI.setUserProfile(id).then((data) => {
    dispatch(setAuthUserProfile(data));
  });
};

export const login = (email, password, rememberMe = false, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Error";
    dispatch(stopSubmit("login", { _error: messageError }));
  }
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptcha();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrlAC(captchaUrl));
};

export default authReducer;
