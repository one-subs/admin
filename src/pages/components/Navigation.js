import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../styles/images/logo_blue.svg';
import AuthContext from "../../context/AuthContext";

function Navigation() {

    const auth = useContext(AuthContext);

    const [display, setDisplay] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.style.overflowY = display ? "hidden" : "auto";
    }, [display]);

    const menuIcon = (
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    );

    const closeIcon = (
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    );

    const desktopMenu = (
        <div className="pages">
            <Link to="/"><span>Finance</span></Link>
            <Link to="/database"><span>Database</span></Link>
            <Link to="/partners"><span>Partners</span></Link>
            <Link to="/admins"><span>Admins</span></Link>
            <span onClick={() => auth.logout()}>Log out</span>
        </div>
    );

    const mobileMenu = (
        <div className="menu">
            <div className="pages">
                <Link to="/"><span onClick={() => setDisplay(false)}>Users</span></Link>
            </div>
            <div className="pages">
                <span onClick={() => auth.logout()}>Log out</span>
                <Link to={`${process.env.REACT_APP_ONESUBS}/contact`}><span>Contact us</span></Link>
            </div>
        </div>
    );

    return (
        <nav className="navbar">
            <Link to={process.env.REACT_APP_ONESUBS}>
                <Logo style={{ maxWidth: '140px', maxHeight: '50px' }}/>
            </Link>
            {isMobile ? (
                <>
                    <svg 
                        onClick={() => setDisplay(!display)} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="35" 
                        height="35" 
                        fill="#64748b" 
                        className="bi bi-list" 
                        viewBox="0 0 16 16"
                        aria-label={display ? "Close menu" : "Open menu"}
                        role="button"
                    >
                        {display ? closeIcon : menuIcon}
                    </svg>
                    {display && mobileMenu}
                </>
            ) : (
                desktopMenu
            )}
        </nav>
    );
}

export default Navigation;
