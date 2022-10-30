import { useNavigate } from "react-router";

const About = () => {
    let navigate = useNavigate();

    const homeHandler = () => {
        navigate("/");
    };

    return (
        <div className="AboutParent">
            <nav className="AboutNav">
                <div style={{ color: "black" }}>Kneed</div>
                <div className="UpFont">Up</div>
                <div style={{ color: "#B60000" }}>.</div>
            </nav>
            <div className="AboutBody">
                <p className="AboutPara1">
                    <strong style={{ color: "black" }}>KneedUp</strong> is a convenience application for aspirants preparing from government sites{" "}
                </p>
                <p className="AboutPara2">"Our mission is to make posts from your favorite government sites accessible to you at a single stop"</p>
                <p className="AboutPara1">
                    Guess what 🤯you can bookmark posts and also manage sites for which you wish to be notified. Our team believes in using technology to make the life of aspirants easy. 📢 Just log
                    in to KneedUp to avail all these features for <strong style={{ color: "black" }}>free</strong>
                </p>
                <p className="AboutPara1">
                    <strong style={{ color: "black" }}>😊Happy preparation</strong>
                </p>
                <button className="AboutButton" onClick={homeHandler}>
                    Go back to home
                </button>
            </div>
        </div>
    );
};

export default About;
