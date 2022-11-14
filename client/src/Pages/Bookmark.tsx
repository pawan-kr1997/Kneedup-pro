import { Col, Container, Row, Card, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdShare } from "react-icons/md";
import { ToastContainer } from "react-toastify";

import { NavBar } from "../Components/NavBar/NavBar";
import OffCanvas from "../Components/OffCanvas/OffCanvas";

import "./Style.css";
import "react-toastify/dist/ReactToastify.css";
import { BookmarkData, Category } from "../Utils/tscTypes";
import { getPostDateWithShortMonth, onShareHandler, removeBookmarkHandler, showModalHandler } from "../Functions/componentFunctions";
import { getUserBookmarkedPosts, getUserCategory } from "../Functions/serverFunctions";

import useUserStore from "../store";

const Bookmark = () => {
    let navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [bookmark, setBookmark] = useState<BookmarkData[]>([]);
    const [bookmarkLoading, setBookmarkLoading] = useState(true);

    const { token, isLogged, categoryDetail, loginUser, logoutUser, setCategoryDetail } = useUserStore((state) => state);

    useEffect(() => {
        getUserBookmarkedPosts(setBookmark, isLogged, logoutUser, navigate, setBookmarkLoading);
    }, [JSON.stringify(bookmark)]);

    let orderedBookmark = [...bookmark].reverse();
    let bookmarkArray;
    if (bookmarkLoading) {
        bookmarkArray = (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                {" "}
                <Spinner animation="border" variant="primary" />
            </div>
        );
    } else {
        bookmarkArray = orderedBookmark.map((post) => {
            let postUrl = "https://" + post.url;
            let postDate = getPostDateWithShortMonth(post.date);

            return (
                <Card className="BookmarkContainer" key={post.id}>
                    <Card.Body>
                        <div className="BookmarkTop">
                            <p>{post.category}</p>
                            <p className="BookmarkTopDate">Added on {postDate}</p>
                        </div>

                        <Card.Title>
                            <a href={postUrl} target="_blank" rel="noopener noreferrer" className="BookmarkText">
                                {post.title}
                            </a>
                        </Card.Title>
                        <div className="BookmarkIconContainer">
                            <RiDeleteBin6Line className="BookmarkIcon" onClick={() => removeBookmarkHandler(post.id, setBookmark, navigate, logoutUser)} />
                            <MdShare className="BookmarkIcon" onClick={() => onShareHandler(postUrl)} />
                        </div>
                    </Card.Body>
                </Card>
            );
        });
    }

    return (
        <div>
            <NavBar />
            <OffCanvas showFollowSite={false} showHandler={() => showModalHandler(setShowModal, navigate, isLogged)} category={categoryDetail} />

            <Container>
                <Row>
                    <Col>
                        <div style={{ height: "70px" }}></div>
                        {bookmarkArray}
                    </Col>
                </Row>
            </Container>
            <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
        </div>
    );
};

export default Bookmark;
