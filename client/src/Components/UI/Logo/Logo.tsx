import { Navbar } from "react-bootstrap";

const Logo = () => {
    return (
        <Navbar.Brand className="LogoFont">
            <div>Kneed</div>
            <div className="UpFont">Up</div>
            <div style={{ color: "#B60000" }}>.</div>
        </Navbar.Brand>
    );
};

export default Logo;
