import { Link } from "react-router-dom";
import { useState } from "react";
import logo from './planoraLogo.png';
import './Nav.css';

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return ( 
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Planora Logo" className="planoraLogo" />
            </div>

            <div className={`navbar-links ${isOpen ? "active" : ""}`}>
                <Link to="/about">About</Link>
                <Link to="/planner">Path Finder</Link>
                <Link to="/map">Map</Link>
                <Link to="/support">Connect</Link>
            </div>

            <div className={`hamburger ${isOpen ? "toggle" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
     );
}
 
export default NavBar;