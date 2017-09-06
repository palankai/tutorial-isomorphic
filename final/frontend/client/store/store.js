import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


function initStore(stateFromServer = undefined, extra = undefined) {
  return createStore(
    rootReducer,
    stateFromServer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(extra)))
  );
}


export default initStore;
