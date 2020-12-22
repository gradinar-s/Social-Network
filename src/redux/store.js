import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
  _callSubscribes() {
    console.log("State changed");
  },

  getState() {
    // синтаксис определения метода
    // обращаемся к свойству, методу через this.
    // владелец метода. объект где мы сейчас находимся

    return this._state;
  },

  subscribe(observer) {
    this._callSubscribes = observer; // паттерн observer
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscribes(this._state);
  },
};

window.store = store;
export default store;
