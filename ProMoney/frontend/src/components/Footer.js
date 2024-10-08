
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 ProMoney, tu gestor de confianza. Todos los derechos reservados.</p>
        <div className="social-icons">
          <a href="https://www.twitch.tv/srcloock" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitch} size="lg" />
          </a>
          <a href="https://github.com/SrCloock" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a href="https://www.instagram.com/sr.cloock/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
