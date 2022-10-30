import { useState } from "react";
import { Form, Button, Navbar, Container, Nav, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

import Logo from "../Components/UI/Logo/Logo";

import { goToHomeHandler, onSignupHandler } from "../Functions/pageFunctions";

import "./Style.css";

const Signup = () => {
    let navigate = useNavigate();

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Logo />

                    <Nav className="me-auto">
                        <Nav.Link onClick={() => goToHomeHandler(navigate)} className="HomeStyle">
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
                <Form className="SignupForm" onSubmit={(e) => onSignupHandler(e, emailId, password, confirmPassword, setError, navigate)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                setEmailId(e.target.value);
                                setError("");
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError("");
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
                        SignUp{" "}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Signup;
