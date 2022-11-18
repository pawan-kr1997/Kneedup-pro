import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BsBookmarks } from "react-icons/bs";
import { BsFillBookmarksFill } from "react-icons/bs";
import { MdShare } from "react-icons/md";

import DateContainer from "../Date/Date";
import { BookmarkData, Post } from "../../Utils/tscTypes";
import {
    getAndSetFeedVariable,
    getPostBirthUrl,
    removeBookmarkHandler,
    scrollAnimationHandler,
    setBookmarkHandler,
    getToBeShownPostDate,
    onShareHandler,
    setCurrentDateAndStatus,
    getPostDate,
} from "../../Functions/componentFunctions";
import { getPostsFromUrl, getUserBookmarkedPosts } from "../../Functions/serverFunctions";
import { HomeContent } from "../HomeContent/HomeContent";

import useUserStore from "../../store";

import "./Feeds.css";
import "react-toastify/dist/ReactToastify.css";

const Feeds = () => {
    let params = useParams();
    let navigate = useNavigate();
    const { token, isLogged, loginUser, logoutUser, subscriptionStatus } = useUserStore((state) => state);

    const [showHomeStatus, setShowHomeStatus] = useState<boolean>(true);
    const [headerText, setHeaderText] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [bookmarkLoading, setBookmarkLoading] = useState(true);
    const [refreshPost, setRefreshPost] = useState<boolean>(true);
    const [bookmarkData, setBookmarkData] = useState<BookmarkData[]>([]);

    let reversePosts = [...posts].reverse();
    let currentDate = "";
    let currentDateStatus = false;

    useEffect(() => {
        window.scrollTo(0, 0);
        let url = getAndSetFeedVariable(params.category, setHeaderText, setShowHomeStatus, navigate);
        getPostsFromUrl(url, setPosts, setLoading, setRefreshPost);
    }, [params.category]);

    useEffect(() => {
        getUserBookmarkedPosts(setBookmarkData, isLogged, logoutUser, navigate, setBookmarkLoading);
    }, [JSON.stringify(bookmarkData), isLogged]);

    useEffect(() => {
        window.addEventListener("scroll", scrollAnimationHandler());
    }, []);

    let cardArray;
    if (refreshPost) {
        cardArray = (
            <div className="InconvinientText">
                <div>Sorry for the inconvinience</div>
                <Button
                    variant="link"
                    onClick={() => {
                        let url = getAndSetFeedVariable(params.category, setHeaderText, setShowHomeStatus, navigate);
                        getPostsFromUrl(url, setPosts, setLoading, setRefreshPost);
                    }}
                >
                    refresh page
                </Button>
            </div>
        );
    } else {
        cardArray = reversePosts.map((post) => {
            let postURL = getPostBirthUrl(params.category, post);

            let postDate = getToBeShownPostDate(post, currentDate, currentDateStatus);

            if (currentDate !== getPostDate(post.createdAt)) {
                currentDateStatus = true;
                currentDate = getPostDate(post.createdAt);
            } else {
                currentDateStatus = false;
            }

            let bookmarkStatus = <BsBookmarks className="Icon" onClick={() => setBookmarkHandler(post.id, setBookmarkData, navigate, isLogged, logoutUser, subscriptionStatus)} />;

            for (let i = 0; i < bookmarkData.length; i++) {
                if (bookmarkData[i].id.toString() === post.id.toString()) {
                    bookmarkStatus = <BsFillBookmarksFill className="Icon" style={{ color: "#1a73e8" }} onClick={() => removeBookmarkHandler(post.id, setBookmarkData, navigate, logoutUser)} />;
                    break;
                }
            }

            return (
                <div>
                    {currentDateStatus ? <DateContainer>{postDate}</DateContainer> : null}
                    <Card key={post.id}>
                        <Card.Body>
                            <Card.Title>
                                <a href={postURL} target="_blank" rel="noopener noreferrer" className="Text">
                                    {post.title}
                                </a>
                            </Card.Title>
                            <div className="IconContainer">
                                {bookmarkStatus}

                                <MdShare className="Icon" onClick={() => onShareHandler(postURL)} />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        });
    }
    return (
        <div>
            {showHomeStatus ? (
                <p>
                    <HomeContent />
                </p>
            ) : (
                <div className="FeedsContainer">
                    <div className="HeaderTextParent">
                        <p className="HeaderText">{headerText}</p>
                    </div>

                    {loading ? (
                        <div style={{ margin: "auto" }}>
                            {" "}
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        cardArray
                    )}

                    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
                </div>
            )}
        </div>
    );
};

export default Feeds;
