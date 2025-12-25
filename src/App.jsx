import { useEffect } from 'react'
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
    window.scrollTo(0, 0)
  }, [])

  return (
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
  )
}

export default App
