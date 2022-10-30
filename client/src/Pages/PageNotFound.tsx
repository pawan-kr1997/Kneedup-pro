import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Logo from "../Components/UI/Logo/Logo";

const PageNotFound: React.FC = () => {
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Logo />
                </Container>
            </Navbar>
            <div className="Content404">
                <h1 className="Head404">Page Not Found</h1>
                <h4>Something went wrong ,please visit again later</h4>
                <Link to="/home">
                    <Button variant="primary">Back To Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
