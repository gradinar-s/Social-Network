const SEND_MESSAGE = "SEND-MESSAGE";

type dialogsType = {
  id: number,
  name: string
}
type messagesType = {
  id: number,
  message: string
}
let initialState = {
  dialogsData: [
    { id: 1, name: "Sasha" },
    { id: 2, name: "Alina" },
  ] as Array<dialogsType>,
  messagesData: [
    { id: 1, message: "Demo message 1" },
    { id: 2, message: "Demo message 2" },
  ] as Array<messagesType>,
};
export type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 3, message: action.textMessage }],
      };
    default:
      return state;
  }
};

type addMessageActionCreatorType = {
  type: typeof SEND_MESSAGE, 
  textMessage: string 
}
export const addMessageActionCreator = (textMessage: string): addMessageActionCreatorType => ({ type: SEND_MESSAGE, textMessage });

export default dialogsReducer;
