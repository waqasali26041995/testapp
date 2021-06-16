import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import useToken from '../../../account/useToken';
import CreateOrUpdateTimeTable from '../CreateOrUpdateTimeTable/CreateOrUpdateTimeTable';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { useDispatch } from 'react-redux';
import { UpdateImage, UpdateTitle } from '../../../actions/index';
import moment from 'moment'
import {GetAllScheduleTimeTablesByEventId, GetEventById} from '../../../service'
const EventTimeTableSchedule = () => {
    const { token, setToken } = useToken();
    const { eventId } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    useEffect(() => {
        GetAllScheduleTimeTablesByEventId(eventId, token)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error)
            });

            GetEventById(eventId, token)
            .then((res) => {
                dispatch(UpdateImage(`https://localhost:5001/content/${res.data.imageName}`))
                dispatch(UpdateTitle(res.data.name))
            })
            .catch((error) => {
                console.error(error)
            });

        setInterval(checkTime, 1000);
    })

    const makeTimeTableAsStarted = (id) => {
        var statusElement = document.getElementById("status-" + id + "");
        var mainElement = document.getElementById("main-" + id + "");
        var timeElement = document.getElementById("time-" + id + "");

        if (mainElement && mainElement.classList && mainElement.classList.length > 0) {
            mainElement.classList.remove("box");
            mainElement.classList.add("box-inverse");
        }

        if (timeElement && timeElement.classList && timeElement.classList.length > 0) {
            timeElement.classList.remove("box-style");
            timeElement.classList.add("box-style-inverse");
        }

        if (statusElement && statusElement.classList && statusElement.classList.length > 0) {
            statusElement.classList.remove("text-danger");
            statusElement.classList.add("now-color");
            statusElement.innerHTML = "<h1>Now</h1>";
        }
    }

    const makeTimeTableAsNext = (id, isNext) => {
        var statusElement = document.getElementById("status-" + id + "");
        var mainElement = document.getElementById("main-" + id + "");
        var timeElement = document.getElementById("time-" + id + "");
        
        if (mainElement && mainElement.classList && mainElement.classList.length > 0) {
            mainElement.classList.remove("box-inverse");
            mainElement.classList.add("box");
        }

        if (timeElement && timeElement.classList && timeElement.classList.length > 0) {
            timeElement.classList.remove("box-style-inverse");
            timeElement.classList.add("box-style");
        }

        if (statusElement && statusElement.classList && statusElement.classList.length > 0) {
            statusElement.classList.remove("now-color");
            statusElement.classList.add("text-danger");
            if (isNext) {
                statusElement.innerHTML = "<h3>Next</h3>";
            }
            else {
                statusElement.innerHTML = "<h3></h3>";
            }
        }
    }
    const checkTime = () => {
        let currTime = moment().format("hh:mm:ss");

        let index = 0;
        let isActiveTimeTable = false;

        for (let i = 0; i < data.length; i++) {
            const startTime = moment(data[i].startTime).format("hh:mm:ss");
            const endTime = moment(data[i].endTime).format("hh:mm:ss");
            if (currTime >= startTime && currTime < endTime) {
                index = i;
                isActiveTimeTable = true;
                makeTimeTableAsStarted(data[i].id);
            }
            else {
                makeTimeTableAsNext(data[i].id, false);
            }
        }
        if (index >= 0 && isActiveTimeTable) {
            index += 1;
        }

        if(index < data.length) {
            const startTime = moment(data[index].startTime).format("hh:mm:ss");
            if(startTime > currTime)
                makeTimeTableAsNext(data[index].id, true);
        }
    }


    const dispatch = useDispatch();

    const listItems = data.map((eventTimeTable) => {
        const startTime = new Date(eventTimeTable.startTime).toString().split(' ');
        const endTime = new Date(eventTimeTable.endTime).toString().split(' ');
        const startTimeFormatted = `${startTime[4].split(":")[0]}:${startTime[4].split(":")[1]}`;
        const endTimeFormatted = `${endTime[4].split(":")[0]}:${endTime[4].split(":")[1]}`;
        return <div className="box d-flex align-items-center my-3" id={`main-${eventTimeTable.id}`}>
            <div className="box-style" id={`time-${eventTimeTable.id}`}>
                <h2>{startTimeFormatted}</h2>
                <h5>-{endTimeFormatted}</h5>
            </div>
            <div className="ms-3">
                <h3>{eventTimeTable.name}</h3>
                <h6>{eventTimeTable.description}</h6>
            </div>
            <div class="ms-auto text-danger" id={`status-${eventTimeTable.id}`}>
                {/* <h3>Next</h3> */}
            </div>
        </div>
    }
    );
    if (data.length > 0) {
        return (
            <>
                <section>
                    <div className="container relative">
                        <div className="bforeTimeline">
                            {listItems}
                        </div>
                    </div>
                </section>
                <CreateOrUpdateTimeTable
                    show={show}
                    id={id}
                    eventId={eventId}
                    onHide={() => setShow(false)} />
            </>
        )
    }
    else {
        return (
            <>
                <section>
                    <div className="bforeTimeline" style={{ textAlign: "center", margin: "23px" }}>
                        <h3>No record found</h3>
                    </div>
                </section>
                <CreateOrUpdateTimeTable
                    show={show}
                    id={id}
                    eventId={eventId}
                    onHide={() => setShow(false)} />
            </>
        )
    }
}

export default EventTimeTableSchedule;