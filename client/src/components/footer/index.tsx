import "../../styles/layout.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Spendly. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://github.com/jutalexa2024/spendly.git" target="_blank" rel="noopener noreferrer" className="github-link">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="github-icon" />
          </a>
        <div className="legal-links">
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <span className="divider">|</span>
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        </div>
        </div>
      </div>
    </footer>
  );
} 

export default Footer;