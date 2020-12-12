import {Redirect, Route} from 'react-router-dom'

import React from 'react'
import {useSelector} from 'react-redux';

function ProtectedRoute({component: Component, ...rest}) {

    const {token} = useSelector(state => state.authReducer);

    return (
        <Route
        {...rest}
        render={(props) => 
        token? (
            <Component {...props}></Component>
        ) : ( 
            <Redirect to='/login'></Redirect>
        ) }
        ></Route>
    )
}

export default ProtectedRoute
