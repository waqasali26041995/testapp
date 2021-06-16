import React, { useState } from 'react';
import axios from 'axios';
import TokenInfo from './account/TokenInfo'

const localStorageToken = localStorage.getItem('token');
let baseUrl = "";
if(localStorageToken)
{
    const jwtToken = JSON.parse(localStorageToken);
    const {Issuer} = TokenInfo(jwtToken);
    baseUrl = Issuer;
}

export const SignIn = (body) => {

    return fetch('https://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};

export const GetAllEvents = (token) => {
    return axios.get(`${baseUrl}/Event/GetAll`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveEvent = (id, token) => {
    return axios.delete(`${baseUrl}/Event/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveTimeTable = (id, token) => {
    return axios.delete(`${baseUrl}/TimeTable/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveUser = (id, token) => {
    return axios.delete(`${baseUrl}/User/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};


export const GetAllUsers = (token) => {
    return axios.get(`${baseUrl}/User/GetAll`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
};


export const GetAllTimeTablesByEventId = (eventId, token) => {
    return axios.get(`${baseUrl}/TimeTable/GetAllByEventId/${eventId}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
};

export const GetAllScheduleTimeTablesByEventId = (eventId, token) => {
    return axios.get(`${baseUrl}/TimeTable/schedule/GetAllByEventId/${eventId}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};



export const CreateEvent = (event, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${baseUrl}/Event/CreateOrUpdate`, event, {
        headers: headers
    })
};

export const CreateUser = (user, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${baseUrl}/User/CreateOrUpdate`, user, {
        headers: headers
    })
};

export const CreateTimeTable = (body, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${baseUrl}/TimeTable/CreateOrUpdate`, body, {
        headers: headers
    })
};


export const GetEventById = (eventId, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${baseUrl}/Event/GetById/${eventId}`, {
        headers: headers
    })
};

export const GetUserById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${baseUrl}/User/GetById/${id}`, {
        headers: headers
    })
};

export const GetTimeTableById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${baseUrl}/TimeTable/GetById/${id}`, {
        headers: headers
    })
};

export const UploadImage = (form, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${baseUrl}/Event/UploadEventImage`, form, {
        headers: headers
    })
}