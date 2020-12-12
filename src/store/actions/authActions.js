import * as actionTypes from './actionTypes';

import {auth} from '../../utils'

export const requestToken = (formValue) => async (dispatch) => {
    const {email, password} = formValue;
    try {
        const {user} = await auth.signInWithEmailAndPassword(email, password);

        dispatch({
            type: actionTypes.REQUEST_TOKEN,
            payload: user.uid
        });
        
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_SET_AUTH_ERROR,
            payload: error.message
        })
    }
};

export const requestRegister = (formValue) => async (dispatch) => {
    const {email,password} = formValue;

    try {
        const {user} = await auth.createUserWithEmailAndPassword(email,password);

        dispatch({
            type: actionTypes.REQUEST_TOKEN,
            payload: user.uid
        });
    } catch (error) {
        dispatch({
            type: actionTypes.REQUEST_SET_AUTH_ERROR,
            payload: error.message
        })
    }
}

export const requestSignOut = () => ({
    type: actionTypes.REQUEST_SIGN_OUT
})

export const setToken = (token) => ({
    type: actionTypes.REQUEST_TOKEN,
    payload: token
});

export const setUserLoadingDone = () => ({
    type: actionTypes.SET_USER_LOADING_DONE,
})

export const clearErrors = () => ({
    type: actionTypes.REQUEST_AUTH_REMOVE_ERRORS
})