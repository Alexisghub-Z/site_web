import '../styles/Services.css'

function Services() {
  const services = [
    {
      icon: '🌐',
      title: 'Landing Pages',
      description: 'Páginas web optimizadas para conversión, diseñadas para captar clientes y generar resultados medibles.',
      features: ['Diseño responsive', 'SEO optimizado', 'Alta velocidad']
    },
    {
      icon: '💻',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas y escalables con las últimas tecnologías. React, Node.js y más.',
      features: ['Arquitectura moderna', 'Código limpio', 'Escalable']
    },
    {
      icon: '⚙️',
      title: 'Software a Medida',
      description: 'Soluciones personalizadas para automatizar procesos y resolver necesidades específicas de tu negocio.',
      features: ['Personalizado', 'Integración', 'Soporte continuo']
    },
    {
      icon: '📱',
      title: 'Aplicaciones Web',
      description: 'Aplicaciones web interactivas y dinámicas que funcionan en cualquier dispositivo.',
      features: ['Progressive Web Apps', 'Multiplataforma', 'Offline-ready']
    }
  ]

  return (
    <section id="servicios" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Servicios</h2>
          <p className="section-description">
            Soluciones completas de desarrollo web adaptadas a tus necesidades
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div className="card-shine"></div>

              <div className="card-background">
                <div className="card-tiles">
                  <div className="card-tile card-tile-1"></div>
                  <div className="card-tile card-tile-2"></div>
                  <div className="card-tile card-tile-3"></div>
                  <div className="card-tile card-tile-4"></div>
                  <div className="card-tile card-tile-5"></div>
                  <div className="card-tile card-tile-6"></div>
                  <div className="card-tile card-tile-7"></div>
                  <div className="card-tile card-tile-8"></div>
                  <div className="card-tile card-tile-9"></div>
                  <div className="card-tile card-tile-10"></div>
                </div>

                <div className="card-line card-line-1"></div>
                <div className="card-line card-line-2"></div>
                <div className="card-line card-line-3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
