import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MessageProps } from "../../Utils/tscTypes";

const Message: React.FC<MessageProps> = ({ message }) => (
    <section>
        <div className="Content404">
            <h1 className="Head404">Err something went wrong</h1>
            <h4>{message}</h4>
            <Link to="/home">
                <Button variant="primary">Go to home</Button>
            </Link>
        </div>
    </section>
);

export default Message;
