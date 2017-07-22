const initialState = {};

export default function rootReducer(state=initialState, action) {
  switch(action.type) {
    case "INIT":
      return state;
    case "SUBMIT_FORM":
      return {...state, submitForm: action.formData};
    case "UNMOUNT":
    return {...state, listScene: { items: [] }};
    case "REQUEST":
    return {...state, listScene: { status: 'loading', items: [] }};
    case "RESPONSE":
    return {...state, listScene: { status: 'loaded', items: action.items }};
    default:
      return state;
  }
};
