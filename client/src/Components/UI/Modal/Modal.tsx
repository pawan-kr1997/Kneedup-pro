import Backdrop from "../Backdrop/Backdrop";
import Checklist from "../../Checklist/Checklist";
import { ModalProps } from "../../../Utils/tscTypes";
import { getModalVisibilityClassName } from "../../../Functions/componentFunctions";

import "./Modal.css";

const Modal: React.FC<ModalProps> = (props) => {
    let visibleState = getModalVisibilityClassName(props.show);

    return (
        <div className={visibleState}>
            <Backdrop remove={props.removeHandler} />
            <div className="Modal">
                <Checklist category={props.category} show={props.show} removeModal={props.removeHandler} />
            </div>
        </div>
    );
};

export default Modal;
