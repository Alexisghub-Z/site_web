import { useState } from 'react'
import '../styles/Contact.css'
import LEDBoard from './LEDBoard'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje')
      }

      setStatus({ loading: false, success: true, error: null })
      setFormData({ name: '', email: '', message: '' })

      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null })
      }, 5000)

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.message || 'Error al enviar el mensaje. Intenta nuevamente.'
      })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="section-header scroll-reveal">
          <h2 className="section-title">Hablemos de tu Proyecto</h2>
          <p className="section-description">
            Cuéntame sobre tu idea y hagamos realidad tu proyecto digital
          </p>
        </div>
        <LEDBoard text="¡Tu próximo gran proyecto comienza aquí!" />
        <div className="contact-content">
          <div className="contact-info scroll-reveal-left">
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>tu-email@ejemplo.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>Respuesta</h3>
              <p>Dentro de 24 horas</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🌍</div>
              <h3>Ubicación</h3>
              <p>Trabajo remoto</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="contact-form scroll-reveal-right">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Cuéntame sobre tu proyecto..."
              ></textarea>
            </div>
            {status.success && (
              <div className="form-message form-message-success">
                ✓ ¡Mensaje enviado correctamente! Te contactaré pronto.
              </div>
            )}

            {status.error && (
              <div className="form-message form-message-error">
                ✗ {status.error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={status.loading}
            >
              {status.loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
