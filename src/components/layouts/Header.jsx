import React from 'react';
import {Link} from "react-router-dom";
import '../../assets/styles/layouts/Header.css';


const Header = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" className="nav-link"><h1 className="logo">Couple Diary</h1></Link>
                <nav>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/join" className="nav-link">Join</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;