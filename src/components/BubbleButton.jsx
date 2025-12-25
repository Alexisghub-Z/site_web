import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/BubbleButton.css'

function BubbleButton({ children, onClick, variant = 'primary', className = '' }) {
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const circlesTopLeftRef = useRef([])
  const circlesBottomRightRef = useRef([])
  const effectButtonRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const $circlesTopLeft = circlesTopLeftRef.current
    const $circlesBottomRight = circlesBottomRightRef.current
    const $effectButton = effectButtonRef.current

    const btTl = gsap.timeline({ paused: true })

    // Top left animation
    const tlBt1 = gsap.timeline()
    tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 })

    const tl = gsap.timeline()
    tl.to($circlesTopLeft, {
      duration: 1.2,
      x: -25,
      y: -25,
      scaleY: 2,
      ease: "slow(0.1, 0.7, false)"
    })
    tl.to($circlesTopLeft[0], { duration: 0.1, scale: 0.2, x: '+=6', y: '-=2' })
    tl.to($circlesTopLeft[1], { duration: 0.1, scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1')
    tl.to($circlesTopLeft[2], { duration: 0.1, scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1')
    tl.to($circlesTopLeft[0], { duration: 1, scale: 0, x: '-=5', y: '-=15', opacity: 0 })
    tl.to($circlesTopLeft[1], { duration: 1, scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1')
    tl.to($circlesTopLeft[2], { duration: 1, scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1')

    tlBt1.add(tl)

    // Bottom right animation
    const tlBt2 = gsap.timeline()
    tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 })

    const tl2 = gsap.timeline()
    tl2.to($circlesBottomRight, {
      duration: 1.1,
      x: 30,
      y: 30,
      ease: "slow(0.1, 0.7, false)"
    })
    tl2.to($circlesBottomRight[0], { duration: 0.1, scale: 0.2, x: '-=6', y: '+=3' })
    tl2.to($circlesBottomRight[1], { duration: 0.1, scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1')
    tl2.to($circlesBottomRight[2], { duration: 0.1, scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2')
    tl2.to($circlesBottomRight[0], { duration: 1, scale: 0, x: '+=5', y: '+=15', opacity: 0 })
    tl2.to($circlesBottomRight[1], { duration: 1, scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1')
    tl2.to($circlesBottomRight[2], { duration: 1, scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1')

    tlBt2.add(tl2)

    // Combine animations
    btTl.add(tlBt1)
    btTl.to($effectButton, { duration: 0.8, scaleY: 1.1 }, 0.1)
    btTl.add(tlBt2, 0.2)
    btTl.to($effectButton, { duration: 1.8, scale: 1, ease: "elastic.out(1.2, 0.4)" }, 1.2)
    btTl.timeScale(2.6)

    const handleMouseEnter = () => {
      btTl.restart()
    }

    const button = buttonRef.current
    if (button) {
      button.addEventListener('mouseenter', handleMouseEnter)
    }

    return () => {
      if (button) {
        button.removeEventListener('mouseenter', handleMouseEnter)
      }
    }
  }, [])

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="goo-filter">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo"/>
          </filter>
        </defs>
      </svg>

      <span ref={containerRef} className={`button--bubble__container ${variant}`}>
        <button
          ref={buttonRef}
          onClick={onClick}
          className={`button--bubble ${variant} ${className}`}
        >
          {children}
        </button>
        <span className={`button--bubble__effect-container ${variant}`}>
          <span ref={el => circlesTopLeftRef.current[0] = el} className={`circle top-left ${variant}`}></span>
          <span ref={el => circlesTopLeftRef.current[1] = el} className={`circle top-left ${variant}`}></span>
          <span ref={el => circlesTopLeftRef.current[2] = el} className={`circle top-left ${variant}`}></span>

          <span ref={effectButtonRef} className={`effect-button ${variant}`}></span>

          <span ref={el => circlesBottomRightRef.current[0] = el} className={`circle bottom-right ${variant}`}></span>
          <span ref={el => circlesBottomRightRef.current[1] = el} className={`circle bottom-right ${variant}`}></span>
          <span ref={el => circlesBottomRightRef.current[2] = el} className={`circle bottom-right ${variant}`}></span>
        </span>
      </span>
    </>
  )
}

export default BubbleButton
