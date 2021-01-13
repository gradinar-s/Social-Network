import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_AUTH_USER_PROFILE = "auth/SET_AUTH_USER_PROFILE";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  authUserProfile: null,
  captchaUrl: null as string | null,
  isCaptcha: false,
};
type initialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        hello: "gfsdfg",
        ...state,
        ...action.data,
        anchor: "anchor", // !!!
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

type setAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA; // "SET_USER_DATA"
  data: setAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  data: { userId, email, login, isAuth },
});
type setAuthUserProfileType = {
  type: typeof SET_AUTH_USER_PROFILE;
  data: any;
};
export const setAuthUserProfile = (data: any): setAuthUserProfileType => ({
  type: SET_AUTH_USER_PROFILE,
  data,
});
type setCaptchaUrlACType = {
  type: typeof SET_CAPTCHA_URL;
  url: string;
};
export const setCaptchaUrlAC = (url: string): setCaptchaUrlACType => ({
  type: SET_CAPTCHA_URL,
  url,
});

// === THUNK ======================================================================
export const getAuthUserData = () => async (dispatch: any) => {
  try {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
      let { id, email, login } = response.data;
      dispatch(setAuthUserData(id, email, login, true));
      dispatch(setAuthUserProfileThunkCreator(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setAuthUserProfileThunkCreator = (id: number) => async (dispatch: any) => {
  try {
    const response = await profileAPI.setUserProfile(id);
    dispatch(setAuthUserProfile(response));
  } catch (error) {
    console.log(error);
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
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

export const logout = () => async (dispatch: any) => {
  try {
    const response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  try {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrlAC(captchaUrl));
  } catch (error) {
    console.log(error);
  }
};

export default authReducer;
