import { useState } from "react";
import { Form, Button, Navbar, Container, Nav, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

import { onLoginHandler, goToHomeHandler } from "../Functions/pageFunctions";

import Logo from "../Components/UI/Logo/Logo";

import useUserStore from "../store";

import "./Style.css";

const Login = () => {
    let navigate = useNavigate();
    const { loginUser, logoutUser, setSubscriptionStatus } = useUserStore((state) => state);

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
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

                    <Link to="/signup">
                        <Button variant="outline-primary">SignUp</Button>
                    </Link>
                </Container>
            </Navbar>
            <Container>
                <Form className="LoginForm" onSubmit={(e) => onLoginHandler(e, emailId, password, setError, navigate, loginUser, setSubscriptionStatus)}>
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
                    <div className="LoginReset">
                        <Link to="/reset" className="LoginResetPos">
                            <a>Forgot password ?</a>
                        </Link>

                        {error && (
                            <Alert variant="danger" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <BiErrorCircle style={{ fontSize: "1em" }} />
                                {error}
                            </Alert>
                        )}

                        <Button variant="primary" type="submit" className="LoginButton">
                            {" "}
                            Login{" "}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default Login;
