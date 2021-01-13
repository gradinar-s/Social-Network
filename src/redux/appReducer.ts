import { getAuthUserData } from "./authReducer";

const INITIALIZATION_SUCCESS = "app/INITIALIZATION_SUCCESS";

type initialStateType = {
  initializationSuccess: boolean;
};
const initialState: initialStateType = {
  initializationSuccess: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
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

type initializationSuccessType = {
  type: typeof INITIALIZATION_SUCCESS; // "INITIALIZATION_SUCCESS"
};
export const initializationSuccess = (): initializationSuccessType => ({
  type: INITIALIZATION_SUCCESS,
});

// === THUNK ========================================================================
export const initializeApp = () => async (dispatch: any) => {
  const promise = dispatch(getAuthUserData());
  await Promise.all([promise]);
  dispatch(initializationSuccess());
};

export default appReducer;
