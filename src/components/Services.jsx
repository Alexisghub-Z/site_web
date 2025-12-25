import { useState } from 'react'
import '../styles/Services.css'

function Services() {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      number: '01',
      title: 'Landing Pages',
      description: 'Páginas web optimizadas para conversión y resultados medibles.',
      fullDescription: 'Desarrollo de landing pages profesionales diseñadas para convertir visitantes en clientes. Utilizo las mejores prácticas de UX/UI y optimización SEO.',
      features: [
        'Diseño responsive y mobile-first',
        'Optimización SEO avanzada',
        'Velocidad de carga ultra rápida',
        'Formularios de contacto integrados',
        'Analytics y seguimiento de conversiones',
        'Integración con CRM y herramientas de marketing'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel']
    },
    {
      id: 2,
      number: '02',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas con React, Node.js y tecnologías escalables.',
      fullDescription: 'Creación de aplicaciones web completas y escalables utilizando las tecnologías más modernas del mercado. Desde el frontend hasta el backend.',
      features: [
        'Arquitectura escalable y mantenible',
        'APIs RESTful y GraphQL',
        'Autenticación y autorización segura',
        'Base de datos optimizada',
        'Despliegue en la nube',
        'Testing automatizado'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS']
    },
    {
      id: 3,
      number: '03',
      title: 'Software a Medida',
      description: 'Soluciones personalizadas para automatizar procesos de tu negocio.',
      fullDescription: 'Desarrollo de software personalizado que se adapta 100% a las necesidades específicas de tu negocio. Automatiza procesos y aumenta la productividad.',
      features: [
        'Análisis detallado de requerimientos',
        'Diseño de solución personalizada',
        'Integración con sistemas existentes',
        'Capacitación del equipo',
        'Documentación completa',
        'Soporte post-implementación'
      ],
      technologies: ['Python', 'Java', 'C#', '.NET', 'Docker', 'Kubernetes']
    },
    {
      id: 4,
      number: '04',
      title: 'Apps Web',
      description: 'Progressive Web Apps que funcionan en cualquier dispositivo.',
      fullDescription: 'Desarrollo de Progressive Web Apps (PWA) que ofrecen experiencias similares a apps nativas pero accesibles desde el navegador.',
      features: [
        'Funciona offline',
        'Instalable en dispositivos',
        'Notificaciones push',
        'Acceso a hardware del dispositivo',
        'Actualizaciones automáticas',
        'Rendimiento nativo'
      ],
      technologies: ['React', 'Service Workers', 'Workbox', 'Firebase']
    },
    {
      id: 5,
      number: '05',
      title: 'Consultoría Tech',
      description: 'Asesoría para optimizar tu stack tecnológico y procesos.',
      fullDescription: 'Consultoría tecnológica para ayudarte a tomar las mejores decisiones sobre tu infraestructura, stack tecnológico y procesos de desarrollo.',
      features: [
        'Auditoría de código y arquitectura',
        'Recomendaciones de mejora',
        'Selección de tecnologías',
        'Optimización de rendimiento',
        'Mejores prácticas de seguridad',
        'Estrategia de escalabilidad'
      ],
      technologies: ['DevOps', 'Cloud', 'CI/CD', 'Docker', 'Microservicios']
    },
    {
      id: 6,
      number: '06',
      title: 'Mantenimiento',
      description: 'Soporte continuo y actualizaciones para tu proyecto.',
      fullDescription: 'Servicio de mantenimiento continuo para mantener tu aplicación actualizada, segura y funcionando perfectamente.',
      features: [
        'Actualizaciones de seguridad',
        'Corrección de bugs',
        'Monitoreo 24/7',
        'Backups automáticos',
        'Mejoras y optimizaciones',
        'Soporte técnico prioritario'
      ],
      technologies: ['Monitoring', 'CI/CD', 'Cloud Services', 'Backup Solutions']
    }
  ]

  const openPanel = (service) => {
    setSelectedService(service)
    document.body.style.overflow = 'hidden'
  }

  const closePanel = () => {
    setSelectedService(null)
    document.body.style.overflow = 'auto'
  }

  const handleQuoteRequest = () => {
    // Cerrar el panel
    closePanel()

    // Hacer scroll al formulario de contacto
    setTimeout(() => {
      const contactSection = document.getElementById('contacto')
      contactSection?.scrollIntoView({ behavior: 'smooth' })

      // Opcional: hacer focus en el primer campo del formulario
      setTimeout(() => {
        const nameInput = document.getElementById('name')
        nameInput?.focus()
      }, 800)
    }, 300)
  }

  return (
    <>
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
              <div
                key={service.id}
                className="service-item"
                onClick={() => openPanel(service)}
              >
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

      {selectedService && (
        <div className="service-panel-overlay" onClick={closePanel}>
          <div className="service-panel" onClick={(e) => e.stopPropagation()}>
            <button className="panel-close" onClick={closePanel}>×</button>

            <div className="panel-header">
              <span className="panel-number">{selectedService.number}</span>
              <h2 className="panel-title">{selectedService.title}</h2>
            </div>

            <p className="panel-description">{selectedService.fullDescription}</p>

            <div className="panel-section">
              <h3 className="panel-section-title">Características</h3>
              <ul className="panel-features">
                {selectedService.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <button className="panel-cta" onClick={handleQuoteRequest}>
              Solicitar Cotización
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Services
