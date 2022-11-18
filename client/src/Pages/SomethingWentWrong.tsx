import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Logo from "../Components/UI/Logo/Logo";
import { onRefreshClickHandler } from "../Functions/pageFunctions";

const SomethingWentWrong: React.FC = () => {
    let navigate = useNavigate();

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

                <Button variant="primary" onClick={() => onRefreshClickHandler(navigate)}>
                    Refresh page
                </Button>
            </div>
        </div>
    );
};

export default SomethingWentWrong;
