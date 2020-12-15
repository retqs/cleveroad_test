import React,{useEffect} from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import Login from './layouts/SignIn'
import ProductsDetail from './layouts/ProductDetail'
import ProductsList from './layouts/ProductsList'
import ProtectedRoute from './components/routes/ProtectedRoute.component'
import PublicRoute from './components/routes/PublicRoute.component'
import Registration from './layouts/SignUp'
import {auth} from './utils';
import {useDispatch} from 'react-redux';

const routes = [
    {
        path: '/',
        isProtected: true,
        exact: true,
        component: ProductsList
    },
    {
        path: '/login',
        isProtected: false,
        exact: true,
        component: Login
    },
    {
        path: '/registration',
        isProtected: false,
        exact: true,
        component: Registration
    },
    {
        path: '/addProduct',
        isProtected: true,
        exact: true,
        component: ProductsDetail
    },
    {
        path: '/editProduct/:id',
        isProtected: true,
        exact: true,
        component: ProductsDetail
    }
]

function RootRouter() {
    const dispatch = useDispatch();

    useEffect(() => {

        // auth.onAuthStateChanged(userAuth => {
        //     if(userAuth !== null) localStorage.setItem('token', userAuth.uid);
        // });

    },[dispatch]);
    
    return (
        <Router>
            <Switch>
                {routes.map((route => route.isProtected?
                 <ProtectedRoute key={route.path} component={route.component} {...route}></ProtectedRoute>
                 :
                 <PublicRoute key={route.path}  restricted={true} component={route.component} {...route}></PublicRoute>))
                }
            </Switch>
        </Router>
    )
}

export default RootRouter
