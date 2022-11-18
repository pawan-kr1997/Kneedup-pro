import { Button } from "react-bootstrap";
import useUserStore from "../../store";

const ProductDisplay = () => {
    const { token, subscriptionStatus } = useUserStore((state) => state);

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

export default ProductDisplay;
