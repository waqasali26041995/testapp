import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-date-picker';
import axios from 'axios';
import useToken from '../../../account/useToken';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {GetUserById, CreateUser} from '../../../service'

function CreateOrUpdateUser(props) {

    const { token, setToken } = useToken();
    const [value, onChange] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (props.id != undefined) {
            const headers = {
                'Authorization': `bearer ${token}`
            }
            GetUserById(props.id, token)
                .then(function (res) {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                    setPhoneNumber(res.data.phoneNumber);
                    var dateOfBirth = new Date(res.data.dateOfBirth)
                    onChange(dateOfBirth);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            setPassword('');
            setConfirmPassword('');
            onChange(new Date());
        }
    }, [props.id]);

    const saveUser = () => {
        const form = document.getElementById("CreateOrUpdateUserForm");
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        if(password != confirmPassword)
        {
            NotificationManager.error('Confirm Password and password not matched', 'Error',5000);
            return;
        }
        var user = {
            Id: props.id,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            Password: password,
            DateofBirth: value,
            CreatedDateTime: new Date(),
            IsDeleted: false
        }
        const headers = {
            'Authorization': `bearer ${token}`
        }
        CreateUser(user, token)
            .then(function () {
                props.onHide();
                
                if (props.id != undefined && props.id != null) {
                    NotificationManager.success('Updated Successfully', 'User',5000);
                }
                else {
                    NotificationManager.success('Created Successfully', 'User',5000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    const passwordFields = { html: "" };
    if (props.id == undefined) {
        passwordFields.html = <>
            <Form.Group as={Col} md="12" controlId="formBasicDescription">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="formBasicDescription">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Group>
        </>
    }
    return (
        <>
            <Modal
                {...props}>
                <Modal.Header>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} id="CreateOrUpdateUserForm">
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicFirstName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDescription">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDescription">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control required type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="formBasicDate">
                                <Form.Label>Date of Birth</Form.Label>
                                <div>
                                    <DatePicker
                                         required
                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>
                            </Form.Group>

                            {passwordFields.html}
                        </Form.Row>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                </Button>
                    <Button variant="primary" onClick={saveUser}>
                        Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <NotificationContainer />
        </>
    )
}

export default React.memo(CreateOrUpdateUser);