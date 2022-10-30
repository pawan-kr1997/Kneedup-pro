import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PageNotFound from "./Pages/PageNotFound";
import Bookmark from "./Pages/Bookmark";
import Home from "./Pages/Home";
import Feeds from "./Components/Feeds/Feeds";
import Reset from "./Pages/Reset";
import { useEffect } from "react";
import PostReset from "./Pages/PostReset";
import About from "./Pages/About";
import useUserStore from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import SomethingWentWrong from "./Pages/SomethingWentWrong";
import { setUserTokenAndLoggedStatus } from "./Functions/componentFunctions";

const App = () => {
    const { loginUser, logoutUser } = useUserStore((state) => ({
        loginUser: state.loginUser,
        logoutUser: state.logoutUser,
    }));

    useEffect(() => {
        setUserTokenAndLoggedStatus(logoutUser, loginUser);
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
            <Route path="/pagenotfound" element={<PageNotFound />} />
            <Route path="/somethingWentWrong" element={<SomethingWentWrong />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    );
};

export default App;
