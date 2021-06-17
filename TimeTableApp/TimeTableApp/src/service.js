import React, { useState } from 'react';
import axios from 'axios';

const React_Api_Url = process.env.REACT_App_BACKEND_URL;
debugger;
export const SignIn = (body) => {

    return fetch(`${React_Api_Url}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};

export const GetAllEvents = (token) => {
    return axios.get(`${React_Api_Url}/Event/GetAll`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveEvent = (id, token) => {
    return axios.delete(`${React_Api_Url}/Event/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveTimeTable = (id, token) => {
    return axios.delete(`${React_Api_Url}/TimeTable/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveUser = (id, token) => {
    return axios.delete(`${React_Api_Url}/User/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};


export const GetAllUsers = (token) => {
    return axios.get(`${React_Api_Url}/User/GetAll`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
};


export const GetAllTimeTablesByEventId = (eventId, token) => {
    return axios.get(`${React_Api_Url}/TimeTable/GetAllByEventId/${eventId}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
};

export const GetAllScheduleTimeTablesByEventId = (eventId, token) => {
    return axios.get(`${React_Api_Url}/TimeTable/schedule/GetAllByEventId/${eventId}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};



export const CreateEvent = (event, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${React_Api_Url}/Event/CreateOrUpdate`, event, {
        headers: headers
    })
};

export const CreateUser = (user, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${React_Api_Url}/User/CreateOrUpdate`, user, {
        headers: headers
    })
};

export const CreateTimeTable = (body, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${React_Api_Url}/TimeTable/CreateOrUpdate`, body, {
        headers: headers
    })
};


export const GetEventById = (eventId, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${React_Api_Url}/Event/GetById/${eventId}`, {
        headers: headers
    })
};

export const GetUserById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${React_Api_Url}/User/GetById/${id}`, {
        headers: headers
    })
};

export const GetTimeTableById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`${React_Api_Url}/TimeTable/GetById/${id}`, {
        headers: headers
    })
};

export const UploadImage = (form, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post(`${React_Api_Url}/Event/UploadEventImage`, form, {
        headers: headers
    })
}