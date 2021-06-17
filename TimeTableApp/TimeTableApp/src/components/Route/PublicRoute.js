import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoggedInInfo } from '../../AuthTokenProvider/TokenInfo';

const {isLoggedIn} = LoggedInInfo();
const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;