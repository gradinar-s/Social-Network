import React from "react";
import { getAuthUserData } from "./authReducer";

const INITIALIZATION_SUCCESS = "app/INITIALIZATION_SUCCESS";

let initialState = {
  initializationSuccess: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION_SUCCESS:
      return {
        ...state,
        initializationSuccess: true,
      };
    default:
      return state;
  }
};

export const initializationSuccess = () => ({ type: INITIALIZATION_SUCCESS });
// Thunk
export const initializeApp = () => (dispatch) => {
  // Каждый dispatch возвращает промис
  let promise = dispatch(getAuthUserData());
  // когда все промисы выполнятся, тогда сделай... (.then)
  Promise.all([promise]).then(() => {
    dispatch(initializationSuccess());
  });
};

export default appReducer;
