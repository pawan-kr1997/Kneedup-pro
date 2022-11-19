import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { authenticationErrorHandler } from "./errorFunctions";

export const onSignupHandler = async (
    e: React.FormEvent<EventTarget>,
    emailId: string,
    password: string,
    confirmPassword: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction
) => {
    e.preventDefault();

    try {
        const response = await axios.post("/signup", { emailId, password, confirmPassword });
        navigate("/login");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err);
            authenticationErrorHandler(setError, err.response?.data, navigate);
        }
    }
};

export const onLoginHandler = async (
    e: React.FormEvent<EventTarget>,
    emailId: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    navigate: NavigateFunction,
    loginUser: (jwtToken: string) => void,
    setSubscriptionStatus: () => Promise<void>
) => {
    e.preventDefault();

    try {
        const response = await axios.post("/login", { emailId, password });
        localStorage.setItem("token", response.data.token);
        loginUser(response.data.token);
        axios.defaults.headers.common["Authorization"] = response.data.token;
        setSubscriptionStatus();
        navigate("/");
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err);
            authenticationErrorHandler(setError, err.response?.data, navigate);
        }
    }
};

export const goToHomeHandler = (navigate: NavigateFunction) => {
    navigate("/");
};

export const onRefreshClickHandler = (navigate: NavigateFunction) => {
    navigate("/home");
    window.location.reload();
};

export const setSubsParamOnSuccessAndFail = (
    query: URLSearchParams,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setSessionId: React.Dispatch<React.SetStateAction<string>>,
    setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
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
};
