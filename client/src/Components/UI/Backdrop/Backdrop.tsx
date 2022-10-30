import { BackdropProps } from "../../../Utils/tscTypes";
import "./Backdrop.css";

const Backdrop: React.FC<BackdropProps> = (props) => {
    return <div className="Backdrop" onClick={props.remove}></div>;
};

export default Backdrop;
