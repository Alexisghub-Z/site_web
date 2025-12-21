import { useEffect, useRef, useState } from 'react'
import '../styles/ServicesSlider.css'

function ServicesSlider() {
  const trackRef = useRef(null)
  const wrapRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const services = [
    {
      id: 1,
      title: 'Landing Pages',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Páginas web optimizadas para conversión, diseñadas para captar clientes y generar resultados.',
    },
    {
      id: 2,
      title: 'Desarrollo Web',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Aplicaciones web modernas y escalables con React, Node.js y las últimas tecnologías.',
    },
    {
      id: 3,
      title: 'Software a Medida',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'Soluciones personalizadas para automatizar procesos y resolver necesidades específicas.',
    },
    {
      id: 4,
      title: 'Apps Web',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'Progressive Web Apps interactivas que funcionan en cualquier dispositivo.',
    },
    {
      id: 5,
      title: 'Consultoría Tech',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'Asesoría técnica para optimizar tu stack tecnológico y mejorar tus procesos.',
    },
  ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width:767px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) go(1)
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) go(-1)
    }
    window.addEventListener('keydown', handleKeyDown, { passive: true })
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [current])

  useEffect(() => {
    const handleResize = () => center(current)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [current])

  const center = (i) => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return

    const cards = Array.from(track.children)
    const card = cards[i]
    if (!card) return

    const axis = isMobile ? 'top' : 'left'
    const size = isMobile ? 'clientHeight' : 'clientWidth'
    const start = isMobile ? card.offsetTop : card.offsetLeft

    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: 'smooth'
    })
  }

  const activate = (i, scroll) => {
    if (i === current) return
    setCurrent(i)
    if (scroll) {
      setTimeout(() => center(i), 50)
    }
  }

  const go = (step) => {
    const newIndex = Math.min(Math.max(current + step, 0), services.length - 1)
    activate(newIndex, true)
  }

  const handleCardClick = (i) => {
    activate(i, true)
  }

  const handleCardHover = (i) => {
    if (window.matchMedia('(hover:hover)').matches) {
      activate(i, true)
    }
  }

  const handleTouchStart = useRef({ x: 0, y: 0 })

  const onTouchStart = (e) => {
    handleTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - handleTouchStart.current.x
    const dy = e.changedTouches[0].clientY - handleTouchStart.current.y
    const threshold = 60

    if (isMobile ? Math.abs(dy) > threshold : Math.abs(dx) > threshold) {
      go((isMobile ? dy : dx) > 0 ? -1 : 1)
    }
  }

  return (
    <section id="servicios" className="services-slider-section">
      <div className="head scroll-reveal">
        <h2>Impulsa tu negocio con soluciones digitales profesionales</h2>
        <div className="controls">
          <button
            id="prev"
            className="nav-btn"
            aria-label="Anterior"
            onClick={() => go(-1)}
            disabled={current === 0}
          >
            ‹
          </button>
          <button
            id="next"
            className="nav-btn"
            aria-label="Siguiente"
            onClick={() => go(1)}
            disabled={current === services.length - 1}
          >
            ›
          </button>
        </div>
      </div>

      <div className="slider" ref={wrapRef}>
        <div
          className="track"
          id="track"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="project-card"
              active={index === current ? '' : undefined}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => handleCardHover(index)}
            >
              <div className="project-card__bg" style={{ background: service.gradient }}></div>
              <div className="project-card__content">
                <div className="project-card__text">
                  <h3 className="project-card__title">{service.title}</h3>
                  <p className="project-card__desc">{service.description}</p>
                  <button className="project-card__btn">Ver detalles</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="dots" id="dots">
          {services.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? 'active' : ''}`}
              onClick={() => activate(index, true)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ServicesSlider
