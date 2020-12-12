import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem("token"),
    error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {

        case actionTypes.SET_USER_LOADING_DONE:
            return {
                ...state,
                isLoading: false,
            }

        case actionTypes.REQUEST_TOKEN:
            return {
                ...state,
                token: payload,
                isLoading: true
            }

        case actionTypes.REQUEST_AUTH_REMOVE_ERRORS:
            return {
                ...state,
                error: null
            }

        case actionTypes.REQUEST_SET_AUTH_ERROR:
            return {
                ...state,
                error: payload
            };

        case actionTypes.REQUEST_SIGN_OUT:
            return {
                ...state,
                token: null
            }

        case actionTypes.REQUEST_SIGN_UP: 
            return {
                ...state,
                token: payload
            }

        default:
            return state
    }
};

