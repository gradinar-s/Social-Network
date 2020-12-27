const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogsData: [
    { id: 1, name: "Sasha" },
    { id: 2, name: "Alina" },
  ],
  messagesData: [
    { id: 1, message: "Demo message 1" },
    { id: 2, message: "Demo message 2" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 3, message: action.textMessage }], // [...элементы старого массива, { Аналогия .push() }]
      };
    default:
      return state;
  }
};

export const addMessageActionCreator = (textMessage) => ({ type: SEND_MESSAGE, textMessage });

export default dialogsReducer;
