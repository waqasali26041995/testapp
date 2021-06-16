import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

export default function TokenInfo({token}) {
  const { UserId, Role } = jwtDecode(token);
  return {
    userId: UserId,
    Role: Role
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

