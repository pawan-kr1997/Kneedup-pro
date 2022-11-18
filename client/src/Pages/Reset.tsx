import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Navbar, Container, Nav, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

import Logo from "../Components/UI/Logo/Logo";
import { resetPasswordClickHandler } from "../Functions/serverFunctions";
import { onHomeClickHandler } from "../Functions/componentFunctions";

import "./Style.css";

const Reset = () => {
    let navigate = useNavigate();
    let params = useParams();

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(params.resetToken);
    const [error, setError] = useState(null);

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Logo />

                    <Nav className="me-auto">
                        <Nav.Link onClick={() => onHomeClickHandler(navigate)} className="HomeStyle">
                            <AiFillHome />
                            Home
                        </Nav.Link>
                    </Nav>

                    <Link to="/login">
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                </Container>
            </Navbar>
            <Container>
                <Form className="SignupForm" onSubmit={(e) => resetPasswordClickHandler(e, emailId, password, confirmPassword, token, navigate, setError)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                setEmailId(e.target.value);
                                setError(null);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(null);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(null);
                            }}
                        />
                    </Form.Group>

                    {error && (
                        <Alert variant="danger" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <BiErrorCircle style={{ fontSize: "1em" }} />
                            {error}
                        </Alert>
                    )}

                    <Button variant="primary" type="submit">
                        {" "}
                        Reset password{" "}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Reset;
