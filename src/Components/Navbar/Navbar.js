import React from 'react';
import Header from './Header';
import Menu from './Menu';

const Navbar = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>

            <div>
                <Menu/>
            </div>
        </div>
    )
}

export default Navbar;
