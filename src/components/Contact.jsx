import { useState, useRef } from 'react'
import '../styles/Contact.css'
import LEDBoard from './LEDBoard'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [buttonState, setButtonState] = useState('initial') // initial, progress, success, error
  const [message, setMessage] = useState({ text: '', type: '' })
  const buttonRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonState('progress')
    setMessage({ text: '', type: '' })

    // Agregar clase de progreso después de un pequeño delay
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.classList.add('btn-fill')
      }
    }, 500)

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

      // Esperar a que termine la animación de llenado (3.2s)
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.remove('btn-fill')
        }
        setButtonState('success')
        setMessage({
          text: '¡Mensaje enviado correctamente! Te contactaré pronto.',
          type: 'success'
        })
        setFormData({ name: '', email: '', message: '' })

        // Resetear después de 5 segundos
        setTimeout(() => {
          setButtonState('initial')
          setMessage({ text: '', type: '' })
        }, 5000)
      }, 3700)

    } catch (error) {
      // Esperar a que termine la animación de llenado
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.remove('btn-fill')
        }
        setButtonState('error')
        setMessage({
          text: 'No se pudo enviar el mensaje. Lo resolveremos pronto, intenta nuevamente más tarde.',
          type: 'error'
        })

        // Resetear después de 5 segundos
        setTimeout(() => {
          setButtonState('initial')
          setMessage({ text: '', type: '' })
        }, 5000)
      }, 3700)
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
              <p><a href="mailto:alexiszarate274@gmail.com">alexiszarate274@gmail.com</a></p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>WhatsApp</h3>
              <p><a href="https://wa.me/5219515886761" target="_blank" rel="noopener noreferrer">951 588 6761</a></p>
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
            <button
              ref={buttonRef}
              type="submit"
              className={`submit-btn ${buttonState === 'progress' ? 'btn-progress' : ''} ${buttonState === 'success' ? 'btn-complete btn-success' : ''} ${buttonState === 'error' ? 'btn-complete btn-error' : ''}`}
              disabled={buttonState !== 'initial'}
            >
              {buttonState === 'initial' && 'Enviar Mensaje'}
            </button>

            {message.text && (
              <div className={`submit-message ${message.type === 'success' ? 'submit-message-success' : 'submit-message-error'}`}>
                {message.type === 'success' ? '✓ ' : '✗ '}
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
