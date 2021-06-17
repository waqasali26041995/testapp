import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import useToken from '../../../../AuthTokenProvider/useToken';
import TimePicker from 'react-time-picker';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import moment from 'moment';
import 'moment-timezone';
import { GetEventById, CreateTimeTable, GetTimeTableById } from '../../../../service';
import { useDispatch } from 'react-redux';
import { Loader } from '../../../../store/loader/action/index';


function CreateOrUpdateTimeTable(props) {
    const { token, setToken } = useToken();
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();


    const saveEventTimeTable = () => {
        dispatch(Loader(false));
        const form = document.getElementById("CreateOrUpdateTimeTableForm");
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        GetEventById(props.eventId)
            .then(function (res) {
                const eventDate = new Date(res.data.eventDate);

                const startTimeHour = +startTime.split(":")[0];
                const startTimeMin = +startTime.split(":")[1];
                const startTimeFormatted = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), startTimeHour, startTimeMin);

                const endTimeHour = +endTime.split(":")[0];
                const endTimeMin = +endTime.split(":")[1];
                const endTimeFormatted = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), endTimeHour, endTimeMin);
                var eventTimeTable = {
                    Id: props.id,
                    Name: name,
                    Description: description,
                    StartTime: startTimeFormatted,
                    EndTime: endTimeFormatted,
                    IsDeleted: false,
                    CreatedDateTime: new Date(),
                    EventId: props.eventId
                }
                CreateTimeTable(eventTimeTable)
                    .then(function (res) {
                        dispatch(Loader(true));
                        if (!res.data) {
                            NotificationManager.error('Start Time and End Time should be greater than current time and End Time should also greater than Start Time.', 'Event Time Table', 5000);
                            return;
                        }
                        props.onHide();

                        if (props.id != undefined && props.id != null) {
                            NotificationManager.success('Updated Successfully', 'Event Time Table', 5000);
                        }
                        else {
                            NotificationManager.success('Created Successfully', 'Event Time Table', 5000);
                        }
                    })
                    .catch(function (error) {
                        dispatch(Loader(true));
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log("Moment", moment().toLocaleString())
        if (props.id != undefined && props.id != null) {
            GetTimeTableById(props.id)
                .then(function (res) {
                    setName(res.data.name);
                    setDescription(res.data.description);
                    setStartTime(res.data.startTime.split("T")[1]);
                    setEndTime(res.data.endTime.split("T")[1]);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            setName('');
            setDescription('');
            setStartTime(new Date());
            setEndTime(new Date);
        }
    }, [props.id])

    return (
        <>
            <Modal
                {...props}>
                <Modal.Header>
                    <Modal.Title>Create Time Table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} id="CreateOrUpdateTimeTableForm">
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDate">
                                <Form.Label>Start Time</Form.Label>
                                <div>
                                    <TimePicker
                                        required
                                        onChange={setStartTime}
                                        value={startTime}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDate">
                                <Form.Label>End Time</Form.Label>
                                <div>
                                    <TimePicker
                                        required
                                        onChange={setEndTime}
                                        value={endTime}
                                    />
                                </div>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                </Button>
                    <Button variant="primary" onClick={saveEventTimeTable}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </>
    )
}

export default React.memo(CreateOrUpdateTimeTable);