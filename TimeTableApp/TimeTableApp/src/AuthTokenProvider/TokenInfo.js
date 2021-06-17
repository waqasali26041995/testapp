import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

export default function TokenInfo({token}) {
  if(token) {
    const { UserId, Role, iss } = jwtDecode(token);
    return {
      userId: UserId,
      Role: Role,
      Issuer: iss
    }
  }
  else {
    return {
      userId: null,
      Role: null,
      Issuer: null
    }
  }
}

export function LoggedInInfo() {
  var token = localStorage.getItem('token');
  if(token) {
    return {
      isLoggedIn: true
    }
  }
  else {
    return {
      isLoggedIn: false
    }
  }
}

