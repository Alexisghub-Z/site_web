import { lazy, Suspense } from 'react'

// Carga diferida del componente pesado
const LiquidGradient = lazy(() => import('./LiquidGradient'))

function LazyLiquidGradient() {
  return (
    <Suspense fallback={<div className="liquid-gradient-placeholder" />}>
      <LiquidGradient />
    </Suspense>
  )
}

export default LazyLiquidGradient
