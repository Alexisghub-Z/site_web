# 📧 Configuración de Resend para Envío de Emails

## 🚀 Pasos para configurar Resend

### 1. Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Regístrate con tu email
3. Verifica tu cuenta

### 2. Obtener API Key
1. En el dashboard de Resend, ve a **API Keys**
2. Click en **Create API Key**
3. Dale un nombre (ej: "Landing Page")
4. Copia la API Key generada (solo se muestra una vez)

### 3. Configurar variables de entorno
Edita el archivo `.env` en la raíz del proyecto:

```env
RESEND_API_KEY=re_123456789abcdefghijk  # Tu API key real
VITE_CONTACT_EMAIL=tu-email@ejemplo.com  # Email donde recibirás mensajes
```

⚠️ **IMPORTANTE:** Nunca compartas tu API key ni la subas a Git

### 4. Verificar dominio (Opcional pero recomendado)

Por defecto, Resend te permite enviar desde `onboarding@resend.dev`, pero es mejor usar tu propio dominio:

1. En Resend, ve a **Domains**
2. Click en **Add Domain**
3. Ingresa tu dominio (ej: `tudominio.com`)
4. Sigue las instrucciones para agregar registros DNS
5. Una vez verificado, actualiza el código en `api/send-email.js`:

```javascript
from: 'Contacto <contacto@tudominio.com>'
```

### 5. Configurar el servidor API

Tienes varias opciones para desplegar la API:

#### Opción A: Vercel (Recomendado - Gratis)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Despliega:
```bash
vercel
```

3. Configura las variables de entorno en Vercel:
   - Ve a tu proyecto en vercel.com
   - Settings > Environment Variables
   - Agrega `RESEND_API_KEY` con tu API key

#### Opción B: Netlify Functions

1. Renombra la carpeta `api` a `netlify/functions`
2. Crea `netlify.toml`:
```toml
[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

3. Despliega en Netlify y agrega la variable de entorno

#### Opción C: Backend Node.js propio

Si prefieres crear tu propio servidor:

```bash
npm install express cors dotenv
```

Crea `server.js`:
```javascript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config()

const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())
app.use(express.json())

app.post('/api/send-email', async (req, res) => {
  // Copia el código de api/send-email.js aquí
})

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000')
})
```

### 6. Probar el envío

1. Inicia tu aplicación:
```bash
npm run dev
```

2. Ve al formulario de contacto
3. Llena los campos y envía
4. Deberías recibir el email en tu bandeja de entrada

### 7. Actualizar email de destino

En `api/send-email.js`, cambia esta línea:

```javascript
to: ['tu-email@ejemplo.com'], // ← Pon tu email real aquí
```

## 🎨 Personalización del Email

El template HTML del email está en `api/send-email.js`. Puedes personalizarlo:

- Cambiar colores del gradiente
- Agregar logo
- Modificar el formato
- Agregar más campos

## 📊 Monitoreo

En el dashboard de Resend puedes ver:
- Emails enviados
- Tasa de entrega
- Errores
- Logs detallados

## 🔒 Seguridad

✅ **Implementado:**
- Validación de campos requeridos
- Validación de formato de email
- Método POST únicamente
- Sanitización de HTML

❌ **Recomendado agregar:**
- Rate limiting (limitar envíos por IP)
- reCAPTCHA para evitar spam
- CORS específico (solo tu dominio)

## 💰 Límites de Resend

**Plan Gratuito:**
- 100 emails/día
- 3,000 emails/mes
- Perfecto para landing pages

**Si necesitas más:**
- Plan Pro: $20/mes - 50,000 emails/mes
- Enterprise: Contactar ventas

## ❓ Troubleshooting

### Error: "API key no válida"
- Verifica que copiaste la API key completa
- Asegúrate de tener el prefijo `re_`
- Revisa que el archivo `.env` esté en la raíz

### Error: "No se puede conectar a la API"
- Verifica que tu servidor API esté corriendo
- Revisa la URL en el fetch del formulario
- Comprueba CORS si usas dominios diferentes

### No llegan los emails
- Revisa la carpeta de spam
- Verifica el email de destino en el código
- Comprueba los logs en el dashboard de Resend

## 📚 Recursos

- [Documentación oficial de Resend](https://resend.com/docs)
- [Ejemplos de templates](https://resend.com/docs/send-with-react-email)
- [React Email](https://react.email/) - Templates más avanzados
