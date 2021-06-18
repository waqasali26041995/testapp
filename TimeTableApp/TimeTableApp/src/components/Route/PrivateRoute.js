import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import TokenInfo, { LoggedInInfo } from '../../AuthTokenProvider/TokenInfo';

const {isLoggedIn} = LoggedInInfo();
const {Role} = TokenInfo();

const PrivateRoute = ({component: Component, roles, ...rest}) => {
    const history = useHistory();

    if (roles && roles.indexOf(Role) === -1) {
        return history.goBack();
    }
    return (
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/auth/login" />
        )} />
    );
};

export default PrivateRoute;