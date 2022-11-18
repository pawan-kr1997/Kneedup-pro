import { useState } from "react";
import { Form, Button, Navbar, Container, Nav, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";

import Logo from "../Components/UI/Logo/Logo";
import { sendResetLinkClickHandler } from "../Functions/serverFunctions";
import { onHomeClickHandler } from "../Functions/componentFunctions";

import "./Style.css";

const PostReset = () => {
    let navigate = useNavigate();

    const [emailId, setEmailId] = useState("");
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
                <Form className="SignupForm" onSubmit={(e) => sendResetLinkClickHandler(e, emailId, navigate, setError)}>
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

                    {error && (
                        <Alert variant="danger" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <BiErrorCircle style={{ fontSize: "1em" }} />
                            {error}
                        </Alert>
                    )}

                    <Button variant="primary" type="submit">
                        Send reset link{" "}
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default PostReset;
