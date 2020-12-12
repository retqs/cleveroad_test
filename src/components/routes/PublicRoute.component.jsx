import {Redirect, Route} from 'react-router-dom'

import React from 'react'
import {useSelector} from 'react-redux';

function PublicRoute({component:Component, restricted, ...rest}) {

    const {token} = useSelector(state => state.authReducer);

    return (
        <Route
        {...rest}
        render={(props) => 
        token && restricted ? (
            <Redirect to='/'></Redirect>
        ) : (
            <Component {...props}></Component>
        ) }
        ></Route>
    )
}

export default PublicRoute
