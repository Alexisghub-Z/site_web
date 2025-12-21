import { useState } from 'react'
import '../styles/Header.css'
import ThemeToggle from './ThemeToggle'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false) // Cerrar menú al navegar
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Dev</span>
            <span className="logo-accent">Pro</span>
          </div>
          <div className="header-right">
            <button
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
              <button onClick={() => scrollToSection('inicio')} className="nav-button" title="Inicio">
                <span>Inicio</span>
              </button>

              <button onClick={() => scrollToSection('servicios')} className="nav-button" title="Servicios">
                <span>Servicios</span>
              </button>

              <button onClick={() => scrollToSection('sobre-mi')} className="nav-button" title="Sobre Mí">
                <span>Sobre Mí</span>
              </button>

              <button onClick={() => scrollToSection('contacto')} className="nav-button" title="Contacto">
                <span>Contacto</span>
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
