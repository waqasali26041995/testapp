import React, { useState, useEffect, sta } from 'react';
import { Link } from "react-router-dom";
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import CreateOrUpdateEvent from '../CreateUpdate/CreateOrUpdateEvent';
import { useDispatch } from 'react-redux';
import { UpdateImage, UpdateTitle } from '../../../../store/UpdateHeader/actions/index';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { GetAllEvents, RemoveEvent } from '../../../../service'
import { Loader } from '../../../../store/loader/action/index';


function EventList() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState();
    const dispatch = useDispatch();

    const getEvents = () => {
        GetAllEvents()
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const removeEvent = (id) => {
        dispatch(Loader(false));
        RemoveEvent(id)
            .then(() => {
                dispatch(Loader(true));
                NotificationManager.success('Deleted Successfully', 'Event', 5000);
            })
            .catch((error) => {
                dispatch(Loader(true));
                console.error(error)
            });
    }


    useEffect(() => {
        dispatch(UpdateImage("/logo.png"));
        dispatch(UpdateTitle(""));
        getEvents();
    })

    const listItems = data.map((event) => {
        const tempDate = new Date(event.eventDate).toString().split(' ');
        const formattedDate = `${tempDate[2]}-${tempDate[1]}-${tempDate[3]}`;
        return <div className="box d-flex align-items-center my-3">
            <div className="box-style">
                <img style={{ width: "200px" }} src={`https://localhost:5001/content/${event.imageName}`} />
            </div>
            <div className="ms-3">
                <Link to={`/event/timtable/list/${event.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <h3>{event.name}</h3>
                </Link>
                <p>{event.description}</p>
                <p>{formattedDate}</p>
            </div>
            <div className="ms-auto text-danger">
                <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: "#ADB842" }} variant="success" id="dropdown-basic">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setShow(true); setId(event.id) }}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => { removeEvent(event.id) }}>Delete</Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={`/event/timtable/schedule/list/${event.id}`} style={{ textDecoration: "none", color: "black" }}>
                                Preview
                        </Link>
                        </Dropdown.Item>
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
                    <button className="btn btn-add pull-right" onClick={() => { setShow(true); setId(null) }} style={{ margin: "20px" }}><FaPlus /> Add</button>
                </label>
                {data.length > 0
                    ?
                    <div className="bforeTimeline">
                        {listItems}
                    </div>
                    :
                    <div className="bforeTimeline" style={{ textAlign: "center", margin: "23px" }}>
                        <h3>No record found</h3>
                    </div>
                }
            </section>
            <CreateOrUpdateEvent
                show={show}
                id={id}
                onHide={() => setShow(false)} />

            <NotificationContainer />
        </>
    )
};

export default React.memo(EventList);