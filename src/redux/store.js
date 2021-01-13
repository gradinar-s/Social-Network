import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
  _callSubscribes() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscribes = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscribes(this._state);
  },
};

window.store = store;
export default store;
