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
                <span className="nav-icon" aria-hidden="true">🏠</span>
                <svg viewBox="0 0 300 300" aria-hidden="true">
                  <g>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath">Inicio</textPath>
                    </text>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath" startOffset="50%">Inicio</textPath>
                    </text>
                  </g>
                </svg>
              </button>

              <button onClick={() => scrollToSection('servicios')} className="nav-button" title="Servicios">
                <span>Servicios</span>
                <span className="nav-icon" aria-hidden="true">⚙️</span>
                <svg viewBox="0 0 300 300" aria-hidden="true">
                  <g>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath">Servicios</textPath>
                    </text>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath" startOffset="50%">Servicios</textPath>
                    </text>
                  </g>
                </svg>
              </button>

              <button onClick={() => scrollToSection('sobre-mi')} className="nav-button" title="Sobre Mí">
                <span>Sobre Mí</span>
                <span className="nav-icon" aria-hidden="true">ℹ️</span>
                <svg viewBox="0 0 300 300" aria-hidden="true">
                  <g>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath">Sobre Mí</textPath>
                    </text>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath" startOffset="50%">Sobre Mí</textPath>
                    </text>
                  </g>
                </svg>
              </button>

              <button onClick={() => scrollToSection('contacto')} className="nav-button" title="Contacto">
                <span>Contacto</span>
                <span className="nav-icon" aria-hidden="true">✉️</span>
                <svg viewBox="0 0 300 300" aria-hidden="true">
                  <g>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath">Contacto</textPath>
                    </text>
                    <text fill="currentColor">
                      <textPath xlinkHref="#circlePath" startOffset="50%">Contacto</textPath>
                    </text>
                  </g>
                </svg>
              </button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* SVG template para el path circular */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <path id="circlePath" d="M 150, 150 m -50, 0 a 50,50 0 0,1 100,0 a 50,50 0 0,1 -100,0" />
        </defs>
      </svg>
    </header>
  )
}

export default Header
