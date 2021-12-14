import React from 'react'
import { useTheme } from '../hooks/useTheme'
import './css/Footer.css'

const Footer = () => {
  const { navColor } = useTheme();

  return (
    <footer style={{ backgroundColor: `${navColor}` }}>
      <div className="footer-content">
        <div className="contact-us">

        </div>
        <p>&copy; {new Date().getFullYear()} Spicy Dragon.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
