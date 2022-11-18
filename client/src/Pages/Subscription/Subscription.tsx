import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { NavBar } from "../../Components/NavBar/NavBar";
import OffCanvas from "../../Components/OffCanvas/OffCanvas";
import { showModalHandler } from "../../Functions/componentFunctions";
import Message from "./Message";
import ProductDisplay from "./ProductDisplay";
import SuccessDisplay from "./SuccessDisplay";

import useUserStore from "../../store";

export default function Subscription() {
    const { token, isLogged, categoryDetail, subscriptionStatus, loginUser, logoutUser, setCategoryDetail, setSubscriptionStatus } = useUserStore((state) => state);

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
