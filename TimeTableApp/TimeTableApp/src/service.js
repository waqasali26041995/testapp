import React, { useState } from 'react';
import axios from 'axios';

let headers = {};
if(localStorage.token) {
    var jwtToken = JSON.parse(localStorage.token);
    headers.Authorization = `bearer ${jwtToken.token}`
}
const React_Api_Url = process.env.REACT_App_BACKEND_URL;
const axiosInstance = axios.create({
    baseURL: React_Api_Url,
    headers: headers
});
export const SignIn = (body) => {

    return fetch(`${React_Api_Url}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
};

export const GetAllEvents = () => {
    return axiosInstance.get(`/Event/GetAll`)
};
export const GetAllUsers = () => {
    return axiosInstance.get(`/User/GetAll`)
};
export const GetAllTimeTablesByEventId = (eventId) => {
    return axiosInstance.get(`/TimeTable/GetAllByEventId/${eventId}`)
};
export const GetAllScheduleTimeTablesByEventId = (eventId) => {
    return axiosInstance.get(`/TimeTable/schedule/GetAllByEventId/${eventId}`)
};
export const GetEventById = (eventId) => {
    return axiosInstance.get(`/Event/GetById/${eventId}`)
};
export const GetUserById = (id) => {
    return axiosInstance.get(`/User/GetById/${id}`)
};
export const GetTimeTableById = (id) => {
    return axiosInstance.get(`/TimeTable/GetById/${id}`)
};
export const CreateEvent = (event) => {
    return axiosInstance.post(`/Event/CreateOrUpdate`, event)
};
export const CreateUser = (user) => {
    return axiosInstance.post(`/User/CreateOrUpdate`, user)
};
export const CreateTimeTable = (body) => {
    return axiosInstance.post(`/TimeTable/CreateOrUpdate`, body)
};
export const RemoveEvent = (id) => {
    return axiosInstance.delete(`/Event/delete/${id}`)
};
export const RemoveTimeTable = (id) => {
    return axiosInstance.delete(`/TimeTable/delete/${id}`)
};
export const RemoveUser = (id) => {
    return axiosInstance.delete(`/User/delete/${id}`)
};
export const UploadImage = (form) => {
    return axiosInstance.post(`/Event/UploadEventImage`, form)
}