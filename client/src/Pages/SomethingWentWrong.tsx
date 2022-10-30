import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../Components/UI/Logo/Logo";

const SomethingWentWrong: React.FC = () => {
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Logo />
                    {"  "}
                </Container>
            </Navbar>
            <div className="Content404">
                <h1 className="Head404">Err something went wrong</h1>
                <h4>Please refresh page</h4>
                <Link to="/home">
                    <Button variant="primary">Refresh page</Button>
                </Link>
            </div>
        </div>
    );
};

export default SomethingWentWrong;
