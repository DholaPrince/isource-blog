"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">📚</span>
          iSource
        </Link>

        {/* Hamburger Menu */}
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/categories" className="navbar-link" onClick={closeMenu}>
              Categories
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link" onClick={closeMenu}>
              About
            </Link>
          </li>
          {/* <li className="navbar-item navbar-divider"></li> */}
          {/* <li className="navbar-item">
            <Link to="/privacy" className="navbar-link navbar-legal" onClick={closeMenu}>
              Privacy
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/terms" className="navbar-link navbar-legal" onClick={closeMenu}>
              Terms
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/disclaimer" className="navbar-link navbar-legal" onClick={closeMenu}>
              Disclaimer
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
