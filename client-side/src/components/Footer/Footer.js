import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">
            <p>&copy; 2021 Developed by <a href="https://github.com/rayhan999" style={{ color: 'white', textDecoration: 'none' }}> <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon> Rayhan Mahi</a>. All Rights Reserved </p>
        </footer>
    );
};

export default Footer;