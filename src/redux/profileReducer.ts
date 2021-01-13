import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { photosType } from "../types/types";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_USER_STATUS = "profile/SET_USER_STATUS";
const UPDATE_USER_STATUS = "profile/UPDATE_USER_STATUS";
const SET_USER_AVATAR = "profile/SET_USER_AVATAR";
const SET_MESSAGE_ERROR_STATUS = "profile/SET_MESSAGE_ERROR_STATUS";

type contactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
type profileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: contactsType;
  photos: photosType;
};
type postType = {
  id: number;
  post: string;
  likesCount: number;
};
type messageErrorType = {
  errorStatus: string;
};

let initialState = {
  posts: [
    {
      id: 1,
      post:
        "Demo post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      likesCount: 1,
    },
  ] as Array<postType>,
  profile: null as profileType | null,
  status: "",
  avatar: null as string | null,
  messageError: {
    errorStatus: "",
  } as messageErrorType,
};

type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
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
        profile: { ...state.profile, photos: action.photos } as profileType,
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

type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostMessage: string;
};
type setUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: profileType;
};
type setUserStatusType = {
  type: typeof SET_USER_STATUS;
  status: string;
};
type updateUserStatusType = {
  type: typeof UPDATE_USER_STATUS;
  status: string;
};
type setUserAvatarACType = {
  type: typeof SET_USER_AVATAR;
  photos: photosType;
};
type setMessageErrorStatusACType = {
  type: typeof SET_MESSAGE_ERROR_STATUS;
  error: string;
};
export const addPostActionCreator = (newPostMessage: string): addPostActionCreatorType => ({
  type: ADD_POST,
  newPostMessage,
});
export const setUserProfile = (profile: profileType): setUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status: string): setUserStatusType => ({
  type: SET_USER_STATUS,
  status: status,
});
export const updateUserStatus = (status: string): updateUserStatusType => ({
  type: UPDATE_USER_STATUS,
  status: status,
});
export const setUserAvatarAC = (photos: photosType): setUserAvatarACType => ({
  type: SET_USER_AVATAR,
  photos,
});
export const setMessageErrorStatusAC = (error: string): setMessageErrorStatusACType => ({
  type: SET_MESSAGE_ERROR_STATUS,
  error,
});

// === THUNK =================================================================
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  try {
    const response = await profileAPI.setUserProfile(userId);
    dispatch(setUserProfile(response));
  } catch (error) {
    console.log(error);
  }
};

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  try {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response));
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateUserStatus(status);
    if (response.resultCode === 0) {
      dispatch(setUserStatus(status));
    } else {
      const messageError = response.messages.length > 0 ? response.messages[0] : "Error";
      dispatch(setMessageErrorStatusAC(messageError));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setUserAvatarTC = (avatar: any) => async (dispatch: any) => {
  try {
    const response = await profileAPI.setUserAvatar(avatar);
    if (response.data.resultCode === 0) {
      dispatch(setUserAvatarAC(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setBasicInfoTC = (profile: profileType) => async (dispatch: any, getState: any) => {
  try {
    const userId = getState().auth.userId;
    const response = await profileAPI.editBasicInfo(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      let messageError = response.data.messages.length > 0 ? response.data.messages[0] : "Error";
      dispatch(stopSubmit("editProfile", { _error: messageError }));
    }
  } catch (error) {
    console.log(error);
  }
};

export default profileReducer;
