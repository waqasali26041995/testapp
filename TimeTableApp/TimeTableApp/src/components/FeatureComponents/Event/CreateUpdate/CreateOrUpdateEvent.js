import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-date-picker';
import axios from 'axios';
import useToken from '../../../../AuthTokenProvider/useToken';
import TokenInfo from '../../../../AuthTokenProvider/TokenInfo';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'moment-timezone';
import { CreateEvent, GetEventById, UploadImage } from '../../../../service'

function CreateOrUpdateEvent(props) {
    const { token, setToken } = useToken();
    const [value, onChange] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const [imageName, setImageName] = useState("");




    const setEventName = (name) => {
        setName(name);
    }

    const setEventDescription = (description) => {
        setDescription(description);
    }

    const setEventDate = (eventDate) => {
        var eventDate = new Date(eventDate);
        onChange(eventDate);
    }

    const saveEvent = () => {
        const form = document.getElementById("CreateOrUpdateEventForm");
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        const { userId } = TokenInfo({ token });
        var event = {
            Id: props.id,
            Name: name,
            Description: description,
            EventDate: value,
            IsDeleted: false,
            CreatedDateTime: new Date(),
            UserId: userId,
            ImageName: imageName
        }
        CreateEvent(event)
            .then(function (res) {
                if (!res.data) {
                    NotificationManager.error('Event with the same name already exist please use different name.', 'Event Time Table', 5000);
                    return;
                }
                props.onHide();
                if (props.id != undefined && props.id != null) {
                    NotificationManager.success('Updated Successfully', 'Event', 5000);
                }
                else {
                    NotificationManager.success('Created Successfully', 'Event', 5000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        if (props.id != undefined && props.id != null) {
            GetEventById(props.id)
                .then(function (res) {
                    setEventName(res.data.name);
                    setEventDescription(res.data.description);
                    setEventDate(res.data.eventDate);
                    setImageName(res.data.imageName)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            setEventName('');
            setEventDescription('');
            setEventDate(new Date());
        }
    }, [props.id])

    const onImageChange = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('Image', e.target.files[0]);
        form.append('FileName', e.target.files[0].name);
        setImageName(e.target.files[0].name);

        UploadImage(form)
            .then(function () {

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <Modal
                {...props}>
                <Modal.Header>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} id="CreateOrUpdateEventForm">
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
                                <Form.Label>Date</Form.Label>
                                <div>
                                    <DatePicker
                                        required
                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group as={Col} md="12">
                                <Form.File label="Event Logo" onChange={e => onImageChange(e)} />
                            </Form.Group>

                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                </Button>
                    <Button variant="primary" onClick={saveEvent}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <NotificationContainer />
        </>
    )
};

export default React.memo(CreateOrUpdateEvent);