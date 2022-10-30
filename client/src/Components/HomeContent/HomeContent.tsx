import { ImNewspaper } from "react-icons/im";
import "./HomeContent.css";

export const HomeContent = () => {
    return (
        <div className="HomeContentParent">
            <ImNewspaper className="HomeContentIcon" />
            <div className="HomeContentPara">Select category to view posts</div>
        </div>
    );
};
