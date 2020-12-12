import * as actionTypes from '../actions/actionTypes';

import DBController from '../../utils/dbController';

export const createProduct = (productValue) => async (dispatch) => {

    DBController.create(productValue).then(() => {
        dispatch({
            type: actionTypes.REQUEST_ADD_PRODUCT,
            payload: productValue
        });
        window.history.back();
    });   
}

export const getProducts = (products) => async (dispatch) => {
    dispatch({
        type: actionTypes.REQUEST_PRODUCTS,
        payload: products
    });

    dispatch({
        type: actionTypes.SET_PRODUCTS_LOADED
    })
};

export const updateProduct = (productValue) => async (dispatch) => {

    DBController.update(productValue.id, productValue).then(() => {
        
        dispatch({
            type: actionTypes.REQUEST_EDIT_PRODUCT,
            payload: productValue
        });
        window.history.back();
    })
}

export const removeProduct = (id) => async (dispatch) => {

    DBController.remove(id).then(() => {
        
        dispatch({
            type: actionTypes.REQUEST_REMOVE_PRODUCT,
            payload: id
        })
    });
}

