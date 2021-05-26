import React,{ Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getUser } from './helpers'

const PrivateRoute = ({ Component: component, ...rest}) => {
    return (
    <Route {...rest} render = { props => getUser() ? <Component {...props}/> : 
        <Redirect to={{pathname: '/login', state: {from: props.location} }} /> } />
    )
}

export default PrivateRoute;