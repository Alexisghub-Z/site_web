import '../styles/Hero.css'
import LiquidGradient from './LiquidGradient'

function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contacto')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="hero">
      <LiquidGradient />
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title scroll-reveal">
            Desarrollo de Software
            <span className="hero-title-accent"> a Medida</span>
          </h1>
          <p className="hero-description scroll-reveal scroll-reveal-delay-1">
            Transformo tus ideas en soluciones digitales profesionales.
            Landing pages, aplicaciones web y software personalizado para impulsar tu negocio.
          </p>
          <div className="hero-cta scroll-reveal scroll-reveal-delay-2">
            <button onClick={scrollToContact} className="btn btn-primary">
              Iniciar Proyecto
            </button>
            <button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-secondary">
              Ver Servicios
            </button>
          </div>
        </div>
        <div className="hero-visual scroll-reveal-scale scroll-reveal-delay-3">
          <div className="code-window">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
            </div>
            <div className="code-content">
              <pre>
                <code>{`function crearSolucion() {
  const idea = tuIdea
  const desarrollo = profesional

  return {
    resultado: "exitoso",
    calidad: "premium"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
