import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { NavBar } from "../Components/NavBar/NavBar";
import OffCanvas from "../Components/OffCanvas/OffCanvas";
import { showModalHandler } from "../Functions/componentFunctions";

import useUserStore from "../store";
import { MessageProps, SuccessDisplayProps } from "../Utils/tscTypes";

const ProductDisplay = () => {
    const { token, subscriptionStatus } = useUserStore((state) => ({
        token: state.token,
        subscriptionStatus: state.subscriptionStatus,
    }));

    return (
        <section>
            <div className="product">
                <div className="SubsStatus">
                    <span> Subscription status: </span> {subscriptionStatus ? <div className="SubsActive">Active</div> : <div className="SubsInactive">Inactive</div>}
                </div>
                <div className="SubsDescription">Avail the membership to unlock bookmark feature in KneedUp</div>
            </div>
            <form action="http://localhost:8090/create-checkout-session" method="POST">
                <input type="hidden" name="lookup_key" value="price_1LzwC7SAy6HVqYxUwz8vXMff" />
                <input type="hidden" name="user_token" value={token} />

                <Button variant="primary" type="submit" className="LoginButtonWide" id="checkout-and-portal-button">
                    Subscribe for ₹100 / month
                </Button>
            </form>
        </section>
    );
};

const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ sessionId }) => {
    const { token, subscriptionStatus } = useUserStore((state) => ({
        token: state.token,
        subscriptionStatus: state.subscriptionStatus,
    }));

    return (
        <section>
            <div className="product Box-root">
                <div className="SubsStatus">
                    <span> Subscription status: </span> {subscriptionStatus ? <div className="SubsActive">Active</div> : <div className="SubsInactive">Inactive</div>}
                </div>
                <div className="SubsDescription">Your are now subscribed to the pro membership of KneedUp!!!</div>
            </div>
            <form action="http://localhost:8090/create-portal-session" method="POST">
                <input type="hidden" id="session-id" name="session_id" value={sessionId} />
                <input type="hidden" name="user_token" value={token} />

                <Button variant="primary" type="submit" className="LoginButtonWide" id="checkout-and-portal-button">
                    Manage your billing information
                </Button>
            </form>
        </section>
    );
};

const Message: React.FC<MessageProps> = ({ message }) => (
    <section>
        <div className="Content404">
            <h1 className="Head404">Err something went wrong</h1>
            <h4>{message}</h4>
            <Link to="/home">
                <Button variant="primary">Go to home</Button>
            </Link>
        </div>
    </section>
);

export default function Subscription() {
    const { token, isLogged, categoryDetail, subscriptionStatus, loginUser, logoutUser, setCategoryDetail, setSubscriptionStatus } = useUserStore((state) => ({
        token: state.token,
        isLogged: state.isLogged,
        categoryDetail: state.categoryDetail,
        subscriptionStatus: state.subscriptionStatus,
        loginUser: state.loginUser,
        logoutUser: state.logoutUser,
        setCategoryDetail: state.setCategoryDetail,
        setSubscriptionStatus: state.setSubscriptionStatus,
    }));

    let [message, setMessage] = useState("");
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState("");
    let [showModal, setShowModal] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            console.log("success");
            setSuccess(true);
            setSessionId(query.get("session_id") as string);
        }

        if (query.get("canceled")) {
            console.log("cnacelled");
            setSuccess(false);
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, [sessionId]);

    let subscriptionPageContent = null;

    if (!success && message === "" && !subscriptionStatus) {
        subscriptionPageContent = <ProductDisplay />;
    } else if ((success && sessionId !== "") || (!success && sessionId === "" && subscriptionStatus)) {
        subscriptionPageContent = <SuccessDisplay sessionId={sessionId} />;
    } else {
        subscriptionPageContent = <Message message={message} />;
    }

    return (
        <div>
            <NavBar />
            <OffCanvas showFollowSite={false} showHandler={() => showModalHandler(setShowModal, navigate, isLogged)} category={categoryDetail} />
            <div className="SubsContainer">{subscriptionPageContent}</div>
        </div>
    );
}
