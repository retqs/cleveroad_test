import * as actionTypes from '../actions/actionTypes'

const initialState = {
    products: [],
    isLoading: true,
    error: null
}

const productsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case actionTypes.REQUEST_ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            }

        case actionTypes.REQUEST_PRODUCTS:
            return {
                ...state,
                error: false,
                products: payload,
            }

        case actionTypes.SET_PRODUCTS_LOADED: 
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.REQUEST_REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== payload)
            }

        case actionTypes.REQUEST_EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product.id === payload.id? payload : product)
            }

        default:
            return state
    }
};

export default productsReducer;


