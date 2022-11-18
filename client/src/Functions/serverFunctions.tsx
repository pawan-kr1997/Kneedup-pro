import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { BookmarkData, Category, Post } from "../Utils/tscTypes";
import { getPostErrorHandler, userDataErrorHandler } from "./errorFunctions";

export const getPostsFromUrl = async (
    url: string,
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setRefreshPost: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);
    setRefreshPost(false);

    try {
        const response = await axios.get(url);
        setPosts(response.data.posts);
        setLoading(false);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            getPostErrorHandler(setLoading, setRefreshPost);
        }
    }
};

export const getUserBookmarkedPosts = async (
    setBookmarkData: React.Dispatch<React.SetStateAction<BookmarkData[]>>,
    isLogged: boolean,
    logoutUser: () => void,
    navigate: NavigateFunction,
    setBookmarkLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setBookmarkLoading(true);
    try {
        if (isLogged) {
            const response = await axios.get("/bookmark");
            setBookmarkData(response.data.data);
            setBookmarkLoading(false);
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err);
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const getUserCategory = async (setCategoryDetail: (category: Category) => void, logoutUser: () => void, navigate: NavigateFunction) => {
    try {
        const response = await axios.get("/feeds/category");
        setCategoryDetail(response.data.category);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const updateCategoryClickHandler = async (
    news: boolean | undefined,
    president: boolean | undefined,
    niti: boolean | undefined,
    idsa: boolean | undefined,
    pib: boolean | undefined,
    prs: boolean | undefined,
    setCategoryDetail: (category: Category) => void,
    navigate: NavigateFunction,
    logoutUser: () => void
) => {
    try {
        let category = {
            News: news,
            President: president,
            Niti: niti,
            Idsa: idsa,
            Pib: pib,
            Prs: prs,
        };

        const response = await axios.post("/feeds/category", category);
        setCategoryDetail(response.data.result.bookmark);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const getUserCategoryDetails = async (
    setNews: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setPresident: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setNiti: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setIdsa: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setPib: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setPrs: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setCategoryDetail: (category: Category) => void,
    categoryDetail: Category,
    show: boolean,
    navigate: NavigateFunction,
    logoutUser: () => void
) => {
    try {
        const response = await axios.get("/feeds/category");
        if (JSON.stringify(categoryDetail) !== JSON.stringify(response.data.category)) {
            if (!response.data.category) {
                return;
            }
            setCategoryDetail(response.data.category);
            setNews(response.data.category.news);
            setPresident(response.data.category.president);
            setNiti(response.data.category.niti);
            setIdsa(response.data.category.idsa);
            setPib(response.data.category.pib);
            setPrs(response.data.category.prs);
        }

        if (!show) {
            setNews(response.data.category.news);
            setPresident(response.data.category.president);
            setNiti(response.data.category.niti);
            setIdsa(response.data.category.idsa);
            setPib(response.data.category.pib);
            setPrs(response.data.category.prs);
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const sendResetLinkClickHandler = (e: React.FormEvent<HTMLFormElement>, emailId: string, navigate: NavigateFunction, setError: React.Dispatch<React.SetStateAction<null>>) => {
    e.preventDefault();
    axios
        .post("/password/resetLink", { emailId })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            if (err.response.status === 500) {
                navigate("/500");
            }
            setError(err.response.data.message);
        });
};

export const resetPasswordClickHandler = (
    e: React.FormEvent<HTMLFormElement>,
    emailId: string,
    password: string,
    confirmPassword: string,
    token: string | undefined,
    navigate: NavigateFunction,
    setError: React.Dispatch<React.SetStateAction<null>>
) => {
    e.preventDefault();

    axios
        .post("/password/resetPassword", { emailId, password, confirmPassword, token })
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err.response.data.message);
            if (err.response.status === 500) {
                navigate("/500");
            }
            setError(err.response.data.message);
        });
};

export const setUserSubscriptionDueDate = async (setDueDate: React.Dispatch<React.SetStateAction<number>>, logoutUser: () => void, navigate: NavigateFunction): Promise<void> => {
    try {
        const response = await axios.get("/subscriptionDueDate");
        setDueDate(response.data.subscriptionDueDate);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log(err);
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};
