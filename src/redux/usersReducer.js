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
  users: [], // Массив пользователей
  filterUsers: [],
  pageSize: 100, // Кол-во отображаемых пользователей на странице
  totalUserCount: 0, // Общее кол-во пользователей
  currentPage: 1, // Текущая страница
  isFetching: true, // загрузка проиcходит???
  followingInProgress: [], // сидит id пользователя которого мы follow/unfollow
  friendsRecomendations: [],
};

const usersReducer = (state = initialState, action) => {
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
      return { ...state, users: action.users.filter((u) => u.status) };
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
          ? [...state.followingInProgress, action.userId] // если в условии сидит true
          : state.followingInProgress.filter((id) => id !== action.userId), // если в условии сидит false
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unfollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount: totalCount,
});
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});
export const friendsRecomendations = (users) => ({ type: FRIENDS_RECOMENDATIONS, users });

// ==== THUNK =============================================================================
export const getUsersThunkCreator = (pageSize, pageNumber) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const data = await userAPI.getUser(pageSize, pageNumber);
  dispatch(setUsers(data.items));
  dispatch(toggleIsFetching(false));
  dispatch(setTotalUserCount(data.totalCount));
};

export const onPageChangedThunkCreator = (pageSize, pageNumber) => async (dispatch) => {
  dispatch(setCurrentPage(pageNumber));
  dispatch(toggleIsFetching(true));
  const data = userAPI.getUser(pageSize, pageNumber);
  dispatch(setUsers(data.items));
  dispatch(toggleIsFetching(false));
};

export const followThunkCreator = (id) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, id));
    userAPI.follow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(unfollow(id));
        dispatch(toggleIsFollowingProgress(false, id));
      }
    });
  };
};
export const unfollowThunkCreator = (id) => {
  return (dispatch) => {
    dispatch(toggleIsFollowingProgress(true, id));
    userAPI.unfollow(id).then((data) => {
      if (data.resultCode === 0) {
        dispatch(follow(id));
        dispatch(toggleIsFollowingProgress(false, id));
      }
    });
  };
};

export const friendsRecomendationsThunk = (pageSize) => (dispatch) => {
  return userAPI.getUser(pageSize).then((data) => {
    dispatch(friendsRecomendations(data.items));
  });
};

export default usersReducer;
