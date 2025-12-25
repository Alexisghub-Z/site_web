import '../styles/Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta">
          <div className="cta-row">
            <div className="single-cta">
              <i className="icon">📍</i>
              <div className="cta-text">
                <h4>Encuéntranos</h4>
                <span>Tu ubicación aquí</span>
              </div>
            </div>
            <div className="single-cta">
              <i className="icon">📞</i>
              <div className="cta-text">
                <h4>Llámanos</h4>
                <span>+1 234 567 8900</span>
              </div>
            </div>
            <div className="single-cta">
              <i className="icon">✉️</i>
              <div className="cta-text">
                <h4>Escríbenos</h4>
                <span>contacto@devpro.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-row">
            <div className="footer-widget">
              <div className="footer-logo">
                <div className="logo">
                  <span className="logo-text">Dev</span>
                  <span className="logo-accent">Pro</span>
                </div>
              </div>
              <div className="footer-text">
                <p>Desarrollo de software profesional y soluciones digitales personalizadas para impulsar tu negocio al siguiente nivel.</p>
              </div>
              <div className="footer-social-icon">
                <span>Síguenos</span>
                <a href="#" aria-label="Facebook"><i className="social-icon facebook-bg">f</i></a>
                <a href="#" aria-label="Twitter"><i className="social-icon twitter-bg">𝕏</i></a>
                <a href="#" aria-label="LinkedIn"><i className="social-icon linkedin-bg">in</i></a>
              </div>
            </div>

            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Enlaces Útiles</h3>
              </div>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#contacto">Contacto</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#soporte">Soporte</a></li>
              </ul>
            </div>

            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Suscríbete</h3>
              </div>
              <div className="footer-text">
                <p>No te pierdas nuestras novedades, suscríbete a nuestro newsletter.</p>
              </div>
              <div className="subscribe-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Tu Email" />
                  <button type="submit" aria-label="Suscribirse">
                    <i>→</i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-row">
            <div className="copyright-text">
              <p>Copyright &copy; {currentYear}, Todos los derechos reservados <a href="#">DevPro</a></p>
            </div>
            <div className="footer-menu">
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#terminos">Términos</a></li>
                <li><a href="#privacidad">Privacidad</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
