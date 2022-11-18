import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import { setUserSubscriptionDueDate } from "../../Functions/serverFunctions";
import { SuccessDisplayProps } from "../../Utils/tscTypes";

import useUserStore from "../../store";

const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ sessionId }) => {
    const { token, subscriptionStatus, logoutUser } = useUserStore((state) => state);
    let navigate = useNavigate();

    const [dueDate, setDueDate] = useState<number>(0);

    useEffect(() => {
        setUserSubscriptionDueDate(setDueDate, logoutUser, navigate);
    }, []);

    return (
        <section>
            <div className="product Box-root">
                <div className="SubsStatus">
                    <span> Subscription status: </span> {subscriptionStatus ? <div className="SubsActive">Active</div> : <div className="SubsInactive">Inactive</div>}
                </div>
                <div className="SubsDate">Your next payment is due on {new Date(dueDate * 1000).toUTCString()}</div>
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

export default SuccessDisplay;
