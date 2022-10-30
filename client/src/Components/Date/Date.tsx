import { DateProps } from "../../Utils/tscTypes";
import "./Date.css";

const Date: React.FC<DateProps> = (props) => {
    return (
        <div className="DateParent">
            <div className="DateLine"></div>
            <div className="DateBody">{props.children}</div>
            <div className="DateLine"></div>
        </div>
    );
};

export default Date;
