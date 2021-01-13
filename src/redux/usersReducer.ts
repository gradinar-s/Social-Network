import { usersType } from "./../types/types";

import { userAPI } from "../api/api";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE_IS_FOLLOWING_PROGRESS";
const FRIENDS_RECOMENDATIONS = "users/FRIENDS_RECOMENDATIONS";

let initialState = {
  users: [] as Array<usersType>,
  pageSize: 100 as number,
  totalUserCount: 0 as number,
  currentPage: 2 as number,
  isFetching: true as boolean,
  followingInProgress: [] as Array<number>, // Array of users id
  friendsRecomendations: [] as Array<usersType>,
};
type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users.filter((user: usersType) => user.status) };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUserCount: action.totalUsersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    case FRIENDS_RECOMENDATIONS: {
      return {
        ...state,
        friendsRecomendations: action.users,
      };
    }
    default:
      return state;
  }
};

type followType = {
  type: typeof FOLLOW;
  userId: number | null;
};
type unfollowType = {
  type: typeof UNFOLLOW;
  userId: number | null;
};
type setUsersType = {
  type: typeof SET_USERS;
  users: Array<usersType> | null;
};
type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
type setTotalUserCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number | null;
};
type toggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
type toggleIsFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
type friendsRecomendationsType = {
  type: typeof FRIENDS_RECOMENDATIONS;
  users: usersType | null;
};

export const follow = (userId: number): followType => ({ type: FOLLOW, userId });
export const unfollow = (userId: number): unfollowType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<usersType>): setUsersType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUserCount = (totalUsersCount: number): setTotalUserCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleIsFollowingProgress = (
  isFetching: boolean,
  userId: number
): toggleIsFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});
export const friendsRecomendations = (users: usersType): friendsRecomendationsType => ({
  type: FRIENDS_RECOMENDATIONS,
  users,
});

// ==== THUNK =============================================================================
export const getUsersThunkCreator = (pageSize: number, pageNumber: number) => async (
  dispatch: any
) => {
  dispatch(toggleIsFetching(true));
  const data = await userAPI.getUser(pageSize, pageNumber);
  dispatch(setUsers(data.items));
  dispatch(toggleIsFetching(false));
  dispatch(setTotalUserCount(data.totalCount));
};

export const onPageChangedThunkCreator = (pageSize: number, pageNumber: number) => async (
  dispatch: any
) => {
  dispatch(setCurrentPage(pageNumber));
  dispatch(toggleIsFetching(true));
  const data = await userAPI.getUser(pageSize, pageNumber);
  dispatch(setUsers(data.items));
  dispatch(toggleIsFetching(false));
};

export const followThunkCreator = (id: number) => async (dispatch: any) => {
  dispatch(toggleIsFollowingProgress(true, id));
  try {
    const response = await userAPI.follow(id);
    if (response.resultCode === 0) {
      dispatch(unfollow(id));
      dispatch(toggleIsFollowingProgress(false, id));
    }
  } catch (error) {
    console.log(error);
  }
};
export const unfollowThunkCreator = (id: number) => async (dispatch: any) => {
  dispatch(toggleIsFollowingProgress(true, id));
  try {
    const response = await userAPI.unfollow(id);
    if (response.resultCode === 0) {
      dispatch(follow(id));
      dispatch(toggleIsFollowingProgress(false, id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const friendsRecomendationsThunk = (pageSize: number) => async (dispatch: any) => {
  try {
    const response = await userAPI.getUser(pageSize);
    dispatch(friendsRecomendations(response.items));
  } catch (error) {
    console.log(error);
  }
};

export default usersReducer;
