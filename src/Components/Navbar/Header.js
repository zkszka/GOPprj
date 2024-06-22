import React from "react";
import { Link } from 'react-router-dom';
import Logo from './Logo.png';

const Header = () => {
    return(
        <div>
            {/* Header */}
            <nav>
                <div className="nav-container">
                    <Link className="nav-home" to="/">Home</Link>
                    <div className="nav-title">
                        <p>For Animals' Happiness</p>
                    </div>
                    <div className="nav-link">
                        <Link className="nav-item" style={{ marginRight: '20px' }} to="/login">Login</Link>
                        <Link className="nav-item" to="/signup">Signup</Link>
                    </div>
                </div>
            </nav>

            {/* Banner */}
            <div className="banner">
                <Link to="/">
                    Guardians of Pets
                    <img src={Logo} width="80" height="80" alt="logo" />
                </Link>
            </div>
            <hr />
        </div>
    )
}

export default Header;

