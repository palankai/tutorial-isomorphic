const initialState = {
  content: 'Hello from Redux, really ;)'
};


export default function rootReducer(state=initialState, action) {
  switch(action.type) {
    case "INIT":
      return state;
    default:
      return state;
  }
};
