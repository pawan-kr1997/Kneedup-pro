import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { NavBar } from "../../Components/NavBar/NavBar";
import OffCanvas from "../../Components/OffCanvas/OffCanvas";
import { showModalHandler } from "../../Functions/componentFunctions";
import Message from "./Message";
import ProductDisplay from "./ProductDisplay";
import SuccessDisplay from "./SuccessDisplay";

import useUserStore from "../../store";
import { setSubsParamOnSuccessAndFail } from "../../Functions/pageFunctions";

export default function Subscription() {
    const { token, isLogged, categoryDetail, subscriptionStatus, loginUser, logoutUser, setCategoryDetail, setSubscriptionStatus } = useUserStore((state) => state);

    let [message, setMessage] = useState("");
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState("");
    let [showModal, setShowModal] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        setSubsParamOnSuccessAndFail(query, setSuccess, setSessionId, setMessage);
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
