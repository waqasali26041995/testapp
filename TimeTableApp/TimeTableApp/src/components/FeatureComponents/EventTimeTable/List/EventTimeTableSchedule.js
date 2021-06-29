import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import CreateOrUpdateTimeTable from '../CreateUpdate/CreateOrUpdateTimeTable';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { useDispatch } from 'react-redux';
import { UpdateImage, UpdateTitle } from '../../../../store/UpdateHeader/actions/index';
import moment from 'moment'
import { GetAllScheduleTimeTablesByEventId, GetEventById } from '../../../../service';
import TokenInfo from '../../../../AuthTokenProvider/TokenInfo';
const EventTimeTableSchedule = () => {
    const { eventId } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const { Issuer } = TokenInfo();
    const [html, setHtml] = useState();
    const dispatch = useDispatch();

    const listItems = {html: []};

    useEffect(() => {
        GetAllScheduleTimeTablesByEventId(eventId)
            .then((res) => {
                setData(res.data);
                createListElements();
            })
            .catch((error) => {
                console.error(error)
            });

        GetEventById(eventId)
            .then((res) => {
                dispatch(UpdateImage(`${Issuer}/content/${res.data.imageName}`))
                dispatch(UpdateTitle(res.data.name))
            })
            .catch((error) => {
                console.error(error)
            });
    })
    const createListElements = () => {
        let isActiveTimeTable = false;
        var createHtml = data.map((eventTimeTable) => {
            const startTime = new Date(eventTimeTable.startTime).toString().split(' ');
            const endTime = new Date(eventTimeTable.endTime).toString().split(' ');
            const startTimeFormatted = `${startTime[4].split(":")[0]}:${startTime[4].split(":")[1]}`;
            const endTimeFormatted = `${endTime[4].split(":")[0]}:${endTime[4].split(":")[1]}`;


            let currTime = moment().format("hh:mm:ss");
            const timeTableStartTime = moment(eventTimeTable.startTime).format("hh:mm:ss");
            const timeTableEndTime = moment(eventTimeTable.endTime).format("hh:mm:ss");
            if (currTime >= timeTableStartTime && currTime < timeTableEndTime) {
                isActiveTimeTable = true;
                return <div className="box-inverse d-flex align-items-center my-3" id={`main-${eventTimeTable.id}`}>
                    <div className="box-style-inverse" id={`time-${eventTimeTable.id}`}>
                        <h2>{startTimeFormatted}</h2>
                        <h5>-{endTimeFormatted}</h5>
                    </div>
                    <div className="ms-3">
                        <h3>{eventTimeTable.name}</h3>
                        <h6>{eventTimeTable.description}</h6>
                    </div>
                    <div class="ms-auto now-color" id={`status-${eventTimeTable.id}`}>
                        <h1>Now</h1>
                    </div>
                </div>
            }
            else if (isActiveTimeTable) {
                isActiveTimeTable = false;
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
                        <h3>Next</h3>
                    </div>
                </div>
            }
            else {
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
                        <h3></h3>
                    </div>
                </div>
            }
        });
        setHtml(createHtml);
    }

    return (
        <>
            <section>
                {data.length > 0
                    ?
                    <div className="container relative">
                        <div className="bforeTimeline">
                            {html}
                        </div>
                    </div>
                    :
                    <div className="bforeTimeline" style={{ textAlign: "center", margin: "23px" }}>
                        <h3>No record found</h3>
                    </div>
                }
            </section>
            <CreateOrUpdateTimeTable
                show={show}
                id={id}
                eventId={eventId}
                onHide={() => setShow(false)} />
        </>
    )

}

export default EventTimeTableSchedule;