import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const UPDATE_USER_STATUS = "profile/UPDATE_USER_STATUS";
const SET_USER_AVATAR = "profile/SET_USER_AVATAR";
const SET_MESSAGE_ERROR_STATUS = "profile/SET_MESSAGE_ERROR_STATUS";

let initialState = {
  posts: [
    {
      id: 1,
      post:
        "Demo post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      likesCount: 1,
    },
  ],
  profile: null,
  status: "",
  avatar: null,
  messageError: {
    errorStatus: "",
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = { id: 5, post: action.newPostMessage, likesCount: 0 };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status,
        messageError: { ...state.messageError, errorStatus: "" },
      };
    }
    case UPDATE_USER_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_AVATAR: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    case SET_MESSAGE_ERROR_STATUS: {
      return {
        ...state,
        messageError: { ...state.messageError, errorStatus: action.error },
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostMessage) => ({ type: ADD_POST, newPostMessage });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status: status });
export const updateUserStatus = (status) => ({ type: UPDATE_USER_STATUS, status: status });
export const setUserAvatarAC = (photos) => ({ type: SET_USER_AVATAR, photos });
export const setMessageErrorStatusAC = (error) => ({
  type: SET_MESSAGE_ERROR_STATUS,
  error,
});

// Thunk
export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.setUserProfile(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};
export const getUserStatus = (userId) => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then((data) => {
      dispatch(setUserStatus(data));
    });
  };
};
export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateUserStatus(status);
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status));
    } else {
      let messageError = response.messages.length > 0 ? response.messages[0] : "Error";
      dispatch(setMessageErrorStatusAC(messageError));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setUserAvatarTC = (avatar) => {
  return (dispatch) => {
    profileAPI.setUserAvatar(avatar).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserAvatarAC(response.data.data));
      }
    });
  };
};
export const setBasicInfoTC = (profile) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    profileAPI.editBasicInfo(profile).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
      } else {
        let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Error";
        dispatch(stopSubmit("editProfile", { _error: messageError }));
      }
    });
  };
};
export default profileReducer;
