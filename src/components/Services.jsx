import '../styles/Services.css'

function Services() {
  const services = [
    {
      id: 1,
      number: '01',
      title: 'Landing Pages',
      description: 'Páginas web optimizadas para conversión y resultados medibles.'
    },
    {
      id: 2,
      number: '02',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas con React, Node.js y tecnologías escalables.'
    },
    {
      id: 3,
      number: '03',
      title: 'Software a Medida',
      description: 'Soluciones personalizadas para automatizar procesos de tu negocio.'
    },
    {
      id: 4,
      number: '04',
      title: 'Apps Web',
      description: 'Progressive Web Apps que funcionan en cualquier dispositivo.'
    },
    {
      id: 5,
      number: '05',
      title: 'Consultoría Tech',
      description: 'Asesoría para optimizar tu stack tecnológico y procesos.'
    },
    {
      id: 6,
      number: '06',
      title: 'Mantenimiento',
      description: 'Soporte continuo y actualizaciones para tu proyecto.'
    }
  ]

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="section-header scroll-reveal">
          <h2 className="section-title">Servicios</h2>
          <p className="section-description">
            Desarrollo web profesional y soluciones digitales
          </p>
        </div>

        <div className="services-list scroll-reveal">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-number">{service.number}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
