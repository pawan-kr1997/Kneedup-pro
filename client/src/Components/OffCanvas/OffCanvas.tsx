import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiBookmarks } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BsCreditCard } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Navbar, Offcanvas, Nav, Container, Accordion, ListGroup, Button } from "react-bootstrap";

import { OffCanvasProps } from "../../Utils/tscTypes";
import { onAboutClickHandler, onBookmarkClickHandler, onLogoutClickHandler, onSubscriptionClickHandler } from "../../Functions/componentFunctions";

import useUserStore from "../../store";

import "./OffCanvas.css";

const OffCanvas: React.FC<OffCanvasProps> = (props) => {
    let navigate = useNavigate();
    const { token, isLogged, subscriptionStatus, loginUser, logoutUser, setSubscriptionStatus, setCategoryDetail } = useUserStore((state) => state);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Navbar bg="dark" variant="dark" expand={false} className="OffcanvasNav">
            <Container fluid>
                <Navbar.Brand className="LogoFont">
                    <div>Kneed</div>
                    <div className="UpFont">Up</div>
                    <div style={{ color: "#B60000" }}>.</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel" className="LogoFont">
                            <div>Kneed</div>
                            <div className="UpFont">Up</div>
                            <div style={{ color: "#B60000" }}>.</div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ListGroup.Item
                            action
                            className="OffcanvasList"
                            onClick={() => {
                                onAboutClickHandler(navigate);
                                handleClose();
                            }}
                        >
                            <MdOutlinePeopleAlt />
                            About Us
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            className="OffcanvasList"
                            onClick={() => {
                                onBookmarkClickHandler(navigate, isLogged, subscriptionStatus);
                                handleClose();
                            }}
                        >
                            <BiBookmarks />
                            Bookmarks
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            className="OffcanvasList"
                            onClick={() => {
                                onSubscriptionClickHandler(navigate, isLogged);
                                handleClose();
                            }}
                        >
                            <BsCreditCard />
                            Subscription
                        </ListGroup.Item>

                        {props.showFollowSite ? (
                            <ListGroup.Item
                                action
                                className="OffcanvasList"
                                onClick={() => {
                                    props.showHandler();
                                    handleClose();
                                }}
                            >
                                <BiStar />
                                Follow Sites
                            </ListGroup.Item>
                        ) : null}

                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Accordion defaultActiveKey="0">
                                {props.category.news ? (
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>News on air</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/newsOnAir_National" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        National
                                                    </ListGroup.Item>
                                                </Link>

                                                <Link to="/newsOnAir_International" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        International
                                                    </ListGroup.Item>
                                                </Link>

                                                <Link to="/newsOnAir_Business" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Business
                                                    </ListGroup.Item>
                                                </Link>

                                                <Link to="/newsOnAir_Sports" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Sports
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}

                                {props.category.president ? (
                                    <Accordion.Item eventKey="1" style={{ border: "0px 0px 0px 1px" }}>
                                        <Accordion.Header>President Of India</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/poi_Speeches" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Speeches
                                                    </ListGroup.Item>
                                                </Link>

                                                <Link to="/poi_pressReleases" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Press releases
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}

                                {props.category.niti ? (
                                    <Accordion.Item eventKey="2" style={{ border: "0px 0px 0px 1px" }}>
                                        <Accordion.Header>Niti Aayog</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/nitiAayog_nitiBlogs" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Niti blogs
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}

                                {props.category.idsa ? (
                                    <Accordion.Item eventKey="3" style={{ border: "0px 0px 0px 1px" }}>
                                        <Accordion.Header>Institute for Defence Studies and Analysis</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/idsa_commentsAndBriefs" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Comments and briefs
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}

                                {props.category.pib ? (
                                    <Accordion.Item eventKey="4" style={{ border: "0px 0px 0px 1px" }}>
                                        <Accordion.Header>Press Information Bureau</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/pib_pressReleases" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Press releases
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}

                                {props.category.prs ? (
                                    <Accordion.Item eventKey="5" style={{ border: "0px 0px 0px 1px" }}>
                                        <Accordion.Header>PRS India</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                <Link to="/prs_Blogs" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Blogs
                                                    </ListGroup.Item>
                                                </Link>

                                                <Link to="/prs_Articles" className="SidebarLink" onClick={handleClose}>
                                                    <ListGroup.Item className="SidebarList" action>
                                                        Articles
                                                    </ListGroup.Item>
                                                </Link>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ) : null}
                            </Accordion>

                            {!isLogged ? (
                                <div>
                                    <Link to="/login">
                                        <Button variant="primary" size="lg" style={{ margin: "5px 0px", width: "100%" }}>
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button variant="outline-secondary" size="lg" style={{ width: "100%" }}>
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    style={{ margin: "5px 0px", width: "100%" }}
                                    onClick={() => onLogoutClickHandler(navigate, logoutUser, setSubscriptionStatus, setCategoryDetail)}
                                >
                                    Logout
                                </Button>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default OffCanvas;
