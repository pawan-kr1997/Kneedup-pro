import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import { onHomeClickHandler, onLogoutClickHandler } from "../../Functions/componentFunctions";

import useUserStore from "../../store";

import "./NavBar.css";

export const NavBar = () => {
    let navigate = useNavigate();
    const { isLogged, logoutUser, setSubscriptionStatus, setCategoryDetail } = useUserStore((state) => state);

    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="ShowNav">
                <Container>
                    <Navbar.Brand className="LogoFont">
                        <div>Kneed</div>
                        <div className="UpFont">Up</div>
                        <div style={{ color: "#B60000" }}>.</div>
                    </Navbar.Brand>
                    {"  "}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => onHomeClickHandler(navigate)} className="HomeStyle">
                                <AiFillHome />
                                Home
                            </Nav.Link>
                        </Nav>

                        {!isLogged ? (
                            <Nav style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                                <Link to="/login">
                                    <Button variant="primary" style={{ width: "100px" }}>
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/signup">
                                    <Button variant="outline-secondary" style={{ width: "100px" }}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Link to="/">
                                    <Button variant="outline-primary" onClick={() => onLogoutClickHandler(navigate, logoutUser, setSubscriptionStatus, setCategoryDetail)}>
                                        Log Out
                                    </Button>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
