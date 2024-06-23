import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Company Information</h5>
                        <p>Company Name | Address | Phone Number</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Services</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Service 1</a></li>
                            <li><a href="/">Service 2</a></li>
                            <li><a href="/">Service 3</a></li>
                            <li><a href="/">Service 4</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Social Media</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Facebook</a></li>
                            <li><a href="/">Instagram</a></li>
                            <li><a href="/">Twitter</a></li>
                            <li><a href="/">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy; {new Date().getFullYear()} Company Name | All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
