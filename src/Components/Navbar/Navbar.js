import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';

const Navbar = () => {
    return (
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

            {/* Menu */}
            <div className="menu-container">
                {/* Dropdowns */}
                {/* Dropdown 1 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">봉사안내</span>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/volunteer/info">봉사정보</Link>
                        <Link to="/volunteer/review">봉사후기</Link>
                    </div>
                </div>
                {/* Dropdown 2 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">입양안내</span>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/adoption/info">입양정보</Link>
                        <Link to="/adoption/review">입양후기</Link>
                    </div>
                </div>
                {/* Dropdown 3 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">실종동물정보</span>
                    </div>
                </div>
                {/* Dropdown 4 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">백과사전</span>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/encyclopedia/dog">강아지</Link>
                        <Link to="/encyclopedia/cat">고양이</Link>
                    </div>
                </div>
                {/* Dropdown 5 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">애견동반정보</span>
                    </div>
                    <div className="dropdown-content">
                        <Link to="/leisure/restaurant">애견동반식당</Link>
                        <Link to="/leisure/accommodation">애견동반숙소</Link>
                    </div>
                </div>
                {/* Dropdown 6 */}
                <div className="dropdown">
                    <div className="dropbtn">
                        <span className="dropbtn_icon">커뮤니티</span>
                    </div>
                </div>
            </div>
            <div className='darkmode'>
                <button>다크모드</button>
            </div>
            <hr></hr>
        </div>
    )
}

export default Navbar;
