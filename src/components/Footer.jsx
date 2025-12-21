import '../styles/Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Dev</span>
              <span className="logo-accent">Pro</span>
            </div>
            <p className="footer-tagline">
              Desarrollo de software profesional
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Servicios</h4>
              <ul>
                <li><a href="#servicios">Landing Pages</a></li>
                <li><a href="#servicios">Desarrollo Web</a></li>
                <li><a href="#servicios">Software a Medida</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contacto</h4>
              <ul>
                <li><a href="#contacto">Formulario</a></li>
                <li><a href="mailto:tu-email@ejemplo.com">Email</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} DevPro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
