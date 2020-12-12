import {applyMiddleware, compose, createStore} from 'redux';

import rootReducer from './reducers'
import thunk from 'redux-thunk';

const middlewares = [thunk];

const REDUX_TOOLS =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = process.env.NODE_ENV !== 'production'?
 createStore(rootReducer,compose(applyMiddleware(...middlewares),REDUX_TOOLS))
 :
 createStore(rootReducer,compose(applyMiddleware(...middlewares)));

export default store;