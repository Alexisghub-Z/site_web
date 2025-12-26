import { Resend } from 'resend'

const resend = new Resend(process.env.STRIX_CODA)

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' })
    }

    // Enviar email con Resend
    const data = await resend.emails.send({
      from: 'Contacto Landing <onboarding@resend.dev>', // Cambiar por tu dominio verificado
      to: ['alexiszarate260@gmail.com'], // Tu email donde recibirás los mensajes
      replyTo: email, // Email del cliente para responder fácilmente
      subject: `Nuevo mensaje de contacto: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #667eea;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 10px;
                border-radius: 5px;
                border-left: 3px solid #667eea;
              }
              .message-box {
                background: white;
                padding: 15px;
                border-radius: 5px;
                border-left: 3px solid #667eea;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">📧 Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Nombre:</span>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <span class="label">✉️ Email:</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <span class="label">💬 Mensaje:</span>
                <div class="message-box">${message}</div>
              </div>

              <div class="footer">
                Recibido desde tu landing page • ${new Date().toLocaleString('es-ES')}
              </div>
            </div>
          </body>
        </html>
      `
    })

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
      id: data.id
    })

  } catch (error) {
    console.error('Error al enviar email:', error)
    return res.status(500).json({
      error: 'Error al enviar el email',
      details: error.message
    })
  }
}
