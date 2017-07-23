import { combineReducers } from 'redux';


function listSceneReducer(state={}, action) {
  switch(action.type) {
  case "UNMOUNT":
    return {  items: [] };
  case "REQUEST":
    return { status: 'loading', items: [] };
  case "RESPONSE":
    return { status: 'loaded', items: action.items };
  default:
    return state;
  }
}

function submitFormReducer(state={}, action) {
  switch(action.type) {
  case "SUBMIT_FORM":
    return action.formData;
  default:
    return state;
  }
}

export default combineReducers({
  listScene: listSceneReducer,
  submitForm: submitFormReducer
});
