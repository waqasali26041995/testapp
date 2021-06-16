import React, { useState } from 'react';
import axios from 'axios';
import TokenInfo from './account/TokenInfo'

// let jwtToken = localStorage.getItem('token').split(":")[1].replace('}','');
// const {baseUrl} = "";
// debugger;
// if(jwtToken != undefined && jwtToken != null) {
//     baseUrl = TokenInfo(jwtToken)
// } 

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
    return axios.get("https://localhost:5001/Event/GetAll", {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveEvent = (id, token) => {
    return axios.delete(`https://localhost:5001/Event/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveTimeTable = (id, token) => {
    return axios.delete(`https://localhost:5001/TimeTable/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};

export const RemoveUser = (id, token) => {
    return axios.delete(`https://localhost:5001/User/delete/${id}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};


export const GetAllUsers = (token) => {
    return axios.get("https://localhost:5001/User/GetAll", {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
};


export const GetAllTimeTablesByEventId = (eventId, token) => {
    return axios.get(`https://localhost:5001/TimeTable/GetAllByEventId/${eventId}`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
};

export const GetAllScheduleTimeTablesByEventId = (eventId, token) => {
    return axios.get(`https://localhost:5001/TimeTable/schedule/GetAllByEventId/${eventId}`, {
        headers: {
            'Authorization': `bearer ${token}`
        }
    })
};



export const CreateEvent = (event, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post('https://localhost:5001/Event/CreateOrUpdate', event, {
        headers: headers
    })
};

export const CreateUser = (user, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post('https://localhost:5001/User/CreateOrUpdate', user, {
        headers: headers
    })
};

export const CreateTimeTable = (body, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post('https://localhost:5001/TimeTable/CreateOrUpdate', body, {
        headers: headers
    })
};


export const GetEventById = (eventId, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`https://localhost:5001/Event/GetById/${eventId}`, {
        headers: headers
    })
};

export const GetUserById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`https://localhost:5001/User/GetById/${id}`, {
        headers: headers
    })
};

export const GetTimeTableById = (id, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.get(`https://localhost:5001/TimeTable/GetById/${id}`, {
        headers: headers
    })
};

export const UploadImage = (form, token) => {
    const headers = {
        'Authorization': `bearer ${token}`
    }
    return axios.post('https://localhost:5001/Event/UploadEventImage', form, {
        headers: headers
    })
}