import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import CreateOrUpdateTimeTable from '../CreateOrUpdateTimeTable/CreateOrUpdateTimeTable';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaArrowLeft } from '@react-icons/all-files/fa/FaArrowLeft';
import { useDispatch } from 'react-redux';
import { UpdateImage, UpdateTitle } from '../../../actions/index';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { GetAllTimeTablesByEventId, GetEventById, RemoveTimeTable } from '../../../service';

const EventTimeTableList = () => {
    const { eventId } = useParams();
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    const getEventTimeTable = async () => {
        GetAllTimeTablesByEventId(eventId)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const getEventById = async () => {
        GetEventById(eventId)
            .then((res) => {
                dispatch(UpdateImage(`https://localhost:5001/content/${res.data.imageName}`))
                dispatch(UpdateTitle(res.data.name))
            })
            .catch((error) => {
                console.error(error)
            });
    }


    const removeEventTimeTable = (id) => {
        RemoveTimeTable(id)
            .then(() => {
                NotificationManager.success('Deleted Successfully', 'Event Time Table', 5000);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {

        getEventTimeTable();
        getEventById();
    })

    const dispatch = useDispatch();

    const listItems = data.map((eventTimeTable) => {
        const startTime = new Date(eventTimeTable.startTime).toString().split(' ');
        const endTime = new Date(eventTimeTable.endTime).toString().split(' ');
        const startTimeFormatted = `${startTime[4].split(":")[0]}:${startTime[4].split(":")[1]}`;
        const endTimeFormatted = `${endTime[4].split(":")[0]}:${endTime[4].split(":")[1]}`;
        return <div className="box d-flex align-items-center my-3">
            <div className="box-style">
                <h2>{startTimeFormatted}</h2>
                <h5>-{endTimeFormatted}</h5>
            </div>
            <div className="ms-3">
                <h3>{eventTimeTable.name}</h3>
                <h6>{eventTimeTable.description}</h6>
            </div>
            <div className="ms-auto text-danger">
                {/* <button className="btn btn-add pull-right" onClick={() => { setShow(true); setId(eventTimeTable.id) }} style={{ margin: "20px" }}>Edit</button> */}

                <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: "#ADB842" }} variant="success" id="dropdown-basic">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setShow(true); setId(eventTimeTable.id) }}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => { removeEventTimeTable(eventTimeTable.id) }}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    }
    );
    return (
        <>
            <section>
                <label className="w-100">
                    <Link to="/event/list">
                        <button className="btn btn-add pull-left" style={{ margin: "20px" }}><FaArrowLeft /> Back</button>
                    </Link>
                    <button className="btn btn-add pull-right" onClick={() => { setShow(true); setId(null) }} style={{ margin: "20px" }}><FaPlus /> Add</button>
                </label>
                {data.length > 0
                    ? <div className="container relative">
                        <div className="bforeTimeline">
                            {listItems}
                        </div>
                    </div>
                    : <div className="bforeTimeline" style={{ textAlign: "center", margin: "23px" }}>
                        <h3>No record found</h3>
                    </div>
                }
            </section>
            <CreateOrUpdateTimeTable
                show={show}
                id={id}
                eventId={eventId}
                onHide={() => setShow(false)} />

            <NotificationContainer />
        </>
    )
}

export default EventTimeTableList;