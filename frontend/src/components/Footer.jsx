import { Link } from "react-router-dom"
import "../styles/Footer.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <h3 className="footer-logo">iSource</h3>
          <p className="footer-description">
            Write articles, earn from Google AdSense, and build MERN projects with our community.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="copyright">&copy; {currentYear} iSource. All rights reserved.</p>
      </div>
    </footer>
  )
}
