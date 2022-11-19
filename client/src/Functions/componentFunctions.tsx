import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";

import { BookmarkData, Category, Post } from "../Utils/tscTypes";
import { userDataErrorHandler } from "./errorFunctions";

export const setBookmarkHandler = async (
    postId: string,
    setBookmarkData: React.Dispatch<React.SetStateAction<BookmarkData[]>>,
    navigate: NavigateFunction,
    isLogged: boolean,
    logoutUser: () => void,
    subscriptionStatus: boolean
) => {
    try {
        toast("Post added to bookmark");
        if (!isLogged) {
            navigate("/login");
            return;
        }
        if (!subscriptionStatus) {
            navigate("/subscription");
            return;
        }
        const response = await axios.get("/postBookmark/" + postId);
        setBookmarkData(response.data.user.bookmark);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const removeBookmarkHandler = async (postId: string, setBookmarkData: React.Dispatch<React.SetStateAction<BookmarkData[]>>, navigate: NavigateFunction, logoutUser: () => void) => {
    try {
        toast("Post removed from bookmark");
        const response = await axios.get("/postUnmark/" + postId);
        setBookmarkData(response.data.user.bookmark);
    } catch (err) {
        if (axios.isAxiosError(err)) {
            userDataErrorHandler(err.response?.data, logoutUser, navigate);
        }
    }
};

export const getAndSetFeedVariable = (
    paramsCategory: string | undefined,
    setHeaderText: React.Dispatch<React.SetStateAction<string>>,
    setShowHomeStatus: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
): string => {
    let url = "";

    switch (paramsCategory) {
        case "newsOnAir_National":
            url = "http://localhost:8090/newsOnAir/national";
            setHeaderText("News On Air / National news");
            setShowHomeStatus(false);
            break;
        case "newsOnAir_International":
            url = "http://localhost:8090/newsOnAir/international";
            setHeaderText("News On Air / International news");
            setShowHomeStatus(false);
            break;
        case "newsOnAir_Business":
            url = "http://localhost:8090/newsOnAir/business";
            setHeaderText("News On Air / Business news");
            setShowHomeStatus(false);
            break;
        case "newsOnAir_Sports":
            url = "http://localhost:8090/newsOnAir/sports";
            setHeaderText("News On Air / Sports news");
            setShowHomeStatus(false);
            break;
        case "poi_Speeches":
            url = "http://localhost:8090/presidentOfIndia/speeches";
            setHeaderText("President of India / Speeches");
            setShowHomeStatus(false);
            break;
        case "poi_pressReleases":
            url = "http://localhost:8090/presidentOfIndia/pressReleases";
            setHeaderText("President of India / Press releases");
            setShowHomeStatus(false);
            break;
        case "nitiAayog_nitiBlogs":
            url = "http://localhost:8090/nitiAayog/nitiBlogs";
            setHeaderText("Niti Aayog / Niti blogs");
            setShowHomeStatus(false);
            break;
        case "idsa_commentsAndBriefs":
            url = "http://localhost:8090/idsa/commentsAndBriefs";
            setHeaderText("Institute of Defence Studies and Analysis / Comments and Briefs");
            setShowHomeStatus(false);
            break;
        case "pib_pressReleases":
            url = "http://localhost:8090/pressInformationBureau/pressReleases";
            setHeaderText("Press Information Bureau / Press releases");
            setShowHomeStatus(false);
            break;
        case "prs_Blogs":
            url = "http://localhost:8090/prsIndia/blogs";
            setHeaderText("PRS India / Blogs");
            setShowHomeStatus(false);
            break;
        case "prs_Articles":
            url = "http://localhost:8090/prsIndia/articles";
            setHeaderText("PRS India / Articles");
            setShowHomeStatus(false);
            break;
        case "home":
            setShowHomeStatus(true);
            break;

        default:
            navigate("/pagenotfound");
    }

    return url;
};

export const getPostBirthUrl = (paramsCategory: string | undefined, post: Post): string => {
    let postURL = "";
    if (
        paramsCategory === "newsOnAir_National" ||
        paramsCategory === "newsOnAir_International" ||
        paramsCategory === "newsOnAir_Business" ||
        paramsCategory === "newsOnAir_Sports" ||
        paramsCategory === "idsa_commentsAndBriefs" ||
        paramsCategory === "prs_Blogs" ||
        paramsCategory === "prs_Articles"
    ) {
        postURL = "https://" + post.url;
    } else {
        postURL = post.url;
    }

    return postURL;
};

export const scrollAnimationHandler = (): _.DebouncedFunc<() => void> => {
    var checkHeader = _.throttle(() => {
        let scrollPosition = Math.ceil(window.scrollY);
        // console.log(scrollPosition);
        if (scrollPosition > 10) {
            (document.querySelector("p") as HTMLInputElement).classList.add("HeaderTextHover");
        } else {
            (document.querySelector("p") as HTMLInputElement).classList.remove("HeaderTextHover");
        }
    }, 300);

    return checkHeader;
};

export const onShareHandler = (postURL: string) => {
    navigator.clipboard.writeText(postURL);
    toast("Post URL copied");
};

export const getCurrentDate = (): string => {
    let date = new Date();
    let currDay = date.getDate();
    let currMonth = date.getMonth();
    let currYear = date.getFullYear();

    return currDay + " " + currMonth + " " + currYear;
};

export const getYesterdayDate = (): string => {
    let date = new Date();
    let yesterdayDay = date.getDate() - 1;
    let yesterdayMonth = date.getMonth();
    let yesterdayYear = date.getFullYear();

    return yesterdayDay + " " + yesterdayMonth + " " + yesterdayYear;
};

export const getPostDate = (postDate: number): string => {
    let date = new Date(postDate);
    let postDay = date.getDate();
    let postMonth = date.getMonth();
    let postYear = date.getFullYear();

    return postDay + " " + postMonth + " " + postYear;
};

export const getPostDateWithShortMonth = (postDate: number): string => {
    let date = new Date(postDate);
    let fullDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let shortMonth = fullDate.toLocaleString("en-us", { month: "short" });

    return date.getDate() + " " + shortMonth + " " + date.getFullYear();
};

export const setCurrentDateAndStatus = (post: Post, currentDate: string, currentDateStatus: boolean) => {
    console.log(currentDateStatus);
    if (currentDate !== getPostDate(post.createdAt)) {
        currentDateStatus = true;
        currentDate = getPostDate(post.createdAt);
        console.log("true : " + currentDateStatus);
    } else {
        currentDateStatus = false;
        console.log("false : " + currentDateStatus);
    }
};

export const getToBeShownPostDate = (post: Post, currentDate: string, currentDateStatus: boolean): string => {
    let postDate = "";
    if (getPostDate(post.createdAt) === getCurrentDate()) {
        postDate = "Today";
    } else if (getPostDate(post.createdAt) === getYesterdayDate()) {
        postDate = "Yesterday";
    } else {
        postDate = getPostDateWithShortMonth(post.createdAt);
    }

    // setCurrentDateAndStatus(post, currentDate, currentDateStatus);

    return postDate;
};

export const onLogoutClickHandler = (navigate: NavigateFunction, logoutUser: () => void, setSubscriptionStatus: () => Promise<void>, setCategoryDetail: (category: Category) => void) => {
    navigate("/newsOnAir_National");
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setCategoryDetail({ news: true, president: true, niti: true, idsa: true, pib: true, prs: true });
    logoutUser();
    setSubscriptionStatus();
    window.location.reload();
};

export const onAboutClickHandler = (navigate: NavigateFunction) => {
    navigate("/about");
};

export const onBookmarkClickHandler = (navigate: NavigateFunction, isLogged: boolean, subscriptionStatus: boolean) => {
    if (isLogged) {
        if (subscriptionStatus) {
            navigate("/bookmark");
        } else {
            navigate("/subscription");
        }
    } else {
        navigate("/login");
    }
};

export const onSubscriptionClickHandler = (navigate: NavigateFunction, isLogged: boolean) => {
    if (isLogged) {
        navigate("/subscription");
    } else {
        navigate("/login");
    }
};

export const onHomeClickHandler = (navigate: NavigateFunction) => {
    navigate("/");
};

export const showModalHandler = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction, isLogged: boolean) => {
    isLogged ? setShowModal(true) : navigate("/login");
};

export const removeModalHandler = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowModal(false);
};

export const getModalVisibilityClassName = (show: boolean): string => {
    let visibleState = "";
    if (!show) {
        visibleState = "Visible";
    }

    return visibleState;
};

export const setUserTokenAndLoggedStatus = (logoutUser: () => void, loginUser: (jwtToken: string) => void, setSubscriptionStatus: () => Promise<void>) => {
    console.log("Initializing Zustand store from App.tsx");
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === "") {
        logoutUser();
    } else {
        loginUser(localStorage.getItem("token") || "");
        setSubscriptionStatus();
    }
};
