import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          // Opcional: dejar de observar después de revelar
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observar todos los elementos con clases de scroll-reveal
    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-blur'
    )

    elements.forEach((element) => {
      observer.observe(element)
    })

    // Cleanup
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])
}
