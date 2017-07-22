const initialState = {
  content: 'Hello from Redux'
};


export default function rootReducer(state=initialState, action) {
  console.log(action.type, action);
  switch(action.type) {
    case "INIT":
      return state;
    case "SUBMIT_FORM":
      return {...state, submitForm: action.formData};
    default:
      return state;
  }
};
