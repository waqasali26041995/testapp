import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TokenInfo from '../../../../AuthTokenProvider/TokenInfo';
import useToken from '../../../../AuthTokenProvider/useToken';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './Login.css';
import { SignIn } from '../../../../service';
import axios from 'axios';

export default function Login() {
  const [username, setUserName] = useState();
  const { token, setToken } = useToken();
  const [password, setPassword] = useState();
  const [validated, setValidated] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  const handleSubmit = async e => {
    const form = document.getElementById("LoginForm");
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    e.preventDefault();
    SignIn({
      email: username,
      password: password
    })
      .then(function (res) {
        const jwtToken = res.data;
        if (jwtToken) {
          setToken(jwtToken);
          const { Role } = TokenInfo();
          if (Role == "Admin") {
            window.location.href = '/user/list'
          }
          else {
            window.location.href = '/event/list'
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setPasswordIncorrect(true);
        }
      });
  }

  

  return (
    <>
      <Container style={{ marginTop: "7%" }}>
        <div className="login-wrapper">
          <Form noValidate validated={validated} id="LoginForm">
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <Form.Text style={{ color: "#dc3545" }}>
                  {passwordIncorrect ? "Email or Password is incorrect." : ''}
                </Form.Text>
              </Form.Group>
            </Form.Row>
            <Button onClick={handleSubmit} style={{ backgroundColor: "#ADB842" }}>
              Submit
          </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}