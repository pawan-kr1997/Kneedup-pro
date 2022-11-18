import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import Bookmark from "./Pages/Bookmark";
import Home from "./Pages/Home";
import Feeds from "./Components/Feeds/Feeds";
import Reset from "./Pages/Reset";
import Subscription from "./Pages/Subscription/Subscription";
import PostReset from "./Pages/PostReset";
import About from "./Pages/About";
import useUserStore from "./store";
import SomethingWentWrong from "./Pages/SomethingWentWrong";

import { setUserTokenAndLoggedStatus } from "./Functions/componentFunctions";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const { isLogged, loginUser, logoutUser, setSubscriptionStatus } = useUserStore((state) => state);

    const stripePromise = loadStripe("pk_test_51LnL0sSAy6HVqYxUc4MRmS5GOR79Dbc7T7mKjKhXbeFl71EFvoYQg0q9QpOgMuh8inYfZY6VmbuJQUvF9i53coU200Pn3KuYcp");

    useEffect(() => {
        console.log("zuztand change done" + isLogged);
        setUserTokenAndLoggedStatus(logoutUser, loginUser, setSubscriptionStatus);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/" element={<Home />}>
                <Route path="/:category" element={<Feeds />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/reset/:resetToken" element={<Reset />} />
            <Route path="/reset" element={<PostReset />} />
            <Route path="/about" element={<About />} />
            <Route
                path="/subscription"
                element={
                    <Elements stripe={stripePromise}>
                        <Subscription />
                    </Elements>
                }
            />

            <Route path="/pagenotfound" element={<PageNotFound />} />
            <Route path="/somethingWentWrong" element={<SomethingWentWrong />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;
