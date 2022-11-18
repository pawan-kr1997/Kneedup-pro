import { Nav } from "react-bootstrap";
import { BsPeople } from "react-icons/bs";
import { BsStar } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import OffCanvas from "../Components/OffCanvas/OffCanvas";
import Sidebar from "../Components/Sidebar/Sidebar";
import Modal from "../Components/UI/Modal/Modal";

import { onAboutClickHandler, onBookmarkClickHandler, onLogoutClickHandler, onSubscriptionClickHandler, removeModalHandler, showModalHandler } from "../Functions/componentFunctions";
import { getUserCategory } from "../Functions/serverFunctions";

import useUserStore from "../store";

const Home = () => {
    let navigate = useNavigate();
    const { token, isLogged, categoryDetail, subscriptionStatus, loginUser, logoutUser, setCategoryDetail, setSubscriptionStatus } = useUserStore((state) => state);

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        getUserCategory(setCategoryDetail, logoutUser, navigate);
    }, [JSON.stringify(categoryDetail)]);

    return (
        <div className="MainParentNewHome">
            <Nav className="NavNewHome">
                <div style={{ color: "white" }}>Kneed</div>
                <div className="UpFont">Up</div>
                <div style={{ color: "#B60000" }}>.</div>
            </Nav>

            <OffCanvas showFollowSite={true} showHandler={() => showModalHandler(setShowModal, navigate, isLogged)} category={categoryDetail} />
            <Modal show={showModal} removeHandler={() => removeModalHandler(setShowModal)} category={categoryDetail} />

            <div className="ChildParent">
                <div className="DivOne">
                    <div className="IconNewHome" data-tooltip="About us">
                        <BsPeople className="InsideIcon" onClick={() => onAboutClickHandler(navigate)} />
                    </div>
                    <div className="IconNewHome" data-tooltip="Bookmarks">
                        <BsBookmark className="InsideIcon" onClick={() => onBookmarkClickHandler(navigate, isLogged, subscriptionStatus)} />
                    </div>
                    <div className="IconNewHome" data-tooltip="Follow sites">
                        <BsStar className="InsideIcon" onClick={() => showModalHandler(setShowModal, navigate, isLogged)} />
                    </div>
                    <div className="IconNewHome" data-tooltip="Subscription">
                        <BsCreditCard className="InsideIcon" onClick={() => onSubscriptionClickHandler(navigate, isLogged)} />
                    </div>

                    {isLogged ? (
                        <div className="IconNewHome" style={{ borderTop: "3px solid lightgray", paddingTop: "50px" }} data-tooltip="Logout">
                            <IoIosLogOut className="InsideIcon" onClick={() => onLogoutClickHandler(navigate, logoutUser, setSubscriptionStatus, setCategoryDetail)} />
                        </div>
                    ) : null}
                </div>

                <div className="DivTwo">
                    <Outlet />
                </div>

                <div className="DivThree">
                    <Sidebar category={categoryDetail} />
                </div>
            </div>
        </div>
    );
};

export default Home;
