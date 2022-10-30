import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CategorySideBar from "../CategorySideBar/CategorySideBar";

import useUserStore from "../../store";

import "./Sidebar.css";
import { SidebarProps } from "../../Utils/tscTypes";

const Sidebar: React.FC<SidebarProps> = (props) => {
    const isLogged = useUserStore((state) => state.isLogged);

    // let LoggedIn = localStorage.getItem("token") ? true : false;

    return (
        <div className="SidebarParent">
            {!isLogged ? (
                <div>
                    <Link to="/login" className="SidebarLink">
                        <Button variant="secondary" size="lg" className="SidebarButton">
                            Login
                        </Button>
                    </Link>
                    <Link to="/signup" className="SidebarLink">
                        <Button variant="outline-primary" size="lg" className="SidebarButton">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            ) : null}

            <CategorySideBar categoryNew={props.category} />
        </div>
    );
};

export default Sidebar;
