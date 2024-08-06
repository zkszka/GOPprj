import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Company Information</h5>
                        <p>Norri | 서울특별시 xx동 xx구 | 02-xxxx-xxxx</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Resources</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://github.com/zkszka/GOPprj">github_frontend</a></li>
                            <li><a href="https://github.com/zkszka/GOP_server">github_server</a></li>
                            <li><a href="https://blog.naver.com/tenandten10">naver_blog</a></li>
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
