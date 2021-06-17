import React from 'react'
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode'

export default function Logout({responseCode}) {
    if (responseCode == 401) {
        if (localStorage.token) {
            localStorage.removeItem('token');
            return <Redirect to="auth/login" />
        }
        else {
            return <></>;
        }
    }
    else {
        if (localStorage.token) {
            var jwtToken = JSON.parse(localStorage.token);
            const { exp } = jwtDecode(jwtToken.token)
            const expirationTime = (exp * 1000) - 60000
            if (Date.now() >= expirationTime) {
                localStorage.removeItem('token');
            }
        }
        else {
            return <></>
        }
    }
}