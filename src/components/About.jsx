import '../styles/About.css'

function About() {
  const technologiesTop = [
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/000000' },
    { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/000000' }
  ]

  const technologiesBottom = [
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Django', icon: 'https://cdn.simpleicons.org/django/092E20' },
    { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
    { name: 'Express', icon: 'https://cdn.simpleicons.org/express/000000' },
    { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
    { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' }
  ]

  const expertise = [
    {
      title: 'Landing Pages que Venden',
      description: 'Diseño páginas optimizadas para convertir visitas en ventas. Cada elemento está pensado para que tus clientes tomen acción.',
      icon: '🎯'
    },
    {
      title: 'Aplicaciones Web Personalizadas',
      description: 'Desarrollo sistemas a medida que automatizan tus procesos y resuelven problemas específicos de tu negocio.',
      icon: '⚙️'
    },
    {
      title: 'E-commerce & Plataformas',
      description: 'Tiendas online completas con pasarelas de pago, gestión de inventario y panel de administración.',
      icon: '🛒'
    }
  ]

  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        <div className="about-header scroll-reveal">
          <h2 className="section-title">¿Por Qué Trabajar Conmigo?</h2>
          <p className="section-description">
            No solo programo, creo soluciones digitales que impulsan tu negocio
          </p>
        </div>

        <div className="expertise-list">
          {expertise.map((item, index) => (
            <div key={index} className={`expertise-item scroll-reveal scroll-reveal-delay-${index + 1}`}>
              <div className="expertise-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="expertise-content">
                <h3 className="expertise-title">{item.title}</h3>
                <p className="expertise-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="about-content">
          <div className="about-text scroll-reveal-left">
            <h3 className="about-subtitle">Mi Enfoque</h3>
            <p className="about-description">
              <strong>Entiendo tu negocio primero, programo después.</strong> Muchos desarrolladores
              solo se enfocan en el código. Yo me enfoco en que tu inversión genere resultados.
            </p>
            <p className="about-description">
              Trabajo con <strong>empresas, emprendedores y startups</strong> que necesitan presencia digital
              profesional sin los costos de una agencia. Obtienes calidad de agencia con atención personalizada.
            </p>
            <p className="about-description">
              <strong>Entrega rápida:</strong> Landing pages en 5-7 días. Aplicaciones web en 2-4 semanas.
              Con actualizaciones constantes para que veas el progreso.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">5-7</div>
                <div className="stat-label">Días entrega landing</div>
              </div>
              <div className="stat">
                <div className="stat-number">30</div>
                <div className="stat-label">Días soporte gratis</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Código propio</div>
              </div>
            </div>
          </div>
          <div className="about-skills scroll-reveal-right">
            <h3 className="skills-title">Stack Tecnológico</h3>
            <p className="skills-subtitle">
              Uso las mejores tecnologías del mercado para garantizar rapidez, seguridad y escalabilidad
            </p>

            {/* Carrusel superior */}
            <div className="tech-carousel-container">
              <div className="tech-carousel">
                {[...technologiesTop, ...technologiesTop].map((tech, index) => (
                  <div key={index} className="tech-carousel-item">
                    <div className="tech-carousel-icon">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <span className="tech-carousel-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carrusel inferior */}
            <div className="tech-carousel-container">
              <div className="tech-carousel tech-carousel-reverse">
                {[...technologiesBottom, ...technologiesBottom].map((tech, index) => (
                  <div key={index} className="tech-carousel-item">
                    <div className="tech-carousel-icon">
                      <img src={tech.icon} alt={tech.name} />
                    </div>
                    <span className="tech-carousel-name">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
