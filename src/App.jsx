import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useScrollReveal } from './hooks/useScrollReveal'
import './styles/scroll-animations.css'

function App() {
  useScrollReveal()

  useEffect(() => {
    // Scroll al top cuando la app se monte
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Forzar scroll en móvil
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
