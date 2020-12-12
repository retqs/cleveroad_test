import authReducer from './authReducer'
import {combineReducers} from 'redux';
import productsReducer from './productsReducer'

const rootReducer = combineReducers({
    productsReducer,
    authReducer
});

export default rootReducer;