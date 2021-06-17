import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoggedInInfo } from '../../AuthTokenProvider/TokenInfo';

const {isLoggedIn} = LoggedInInfo();
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/auth/login" />
        )} />
    );
};

export default PrivateRoute;