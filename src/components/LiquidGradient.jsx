import { useEffect, useRef } from 'react'
import '../styles/LiquidGradient.css'

// TouchTexture class
class TouchTexture {
  constructor() {
    this.size = 64
    this.width = this.height = this.size
    this.maxAge = 64
    this.radius = 0.25 * this.size
    this.speed = 1 / this.maxAge
    this.trail = []
    this.last = null
    this.initTexture()
  }

  initTexture() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.texture = new window.THREE.Texture(this.canvas)
  }

  update() {
    this.clear()
    let speed = this.speed
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i]
      let f = point.force * speed * (1 - point.age / this.maxAge)
      point.x += point.vx * f
      point.y += point.vy * f
      point.age++
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1)
      } else {
        this.drawPoint(point)
      }
    }
    this.texture.needsUpdate = true
  }

  clear() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  addTouch(point) {
    let force = 0
    let vx = 0
    let vy = 0
    const last = this.last
    if (last) {
      const dx = point.x - last.x
      const dy = point.y - last.y
      if (dx === 0 && dy === 0) return
      const dd = dx * dx + dy * dy
      let d = Math.sqrt(dd)
      vx = dx / d
      vy = dy / d
      force = Math.min(dd * 20000, 2.0)
    }
    this.last = { x: point.x, y: point.y }
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }

  drawPoint(point) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height
    }

    let intensity = 1
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2))
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7)
      intensity = -t * (t - 2)
    }
    intensity *= point.force

    const radius = this.radius
    let color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`
    let offset = this.size * 5
    this.ctx.shadowOffsetX = offset
    this.ctx.shadowOffsetY = offset
    this.ctx.shadowBlur = radius * 1
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`

    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }
}

function LiquidGradient() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const clockRef = useRef(null)
  const touchTextureRef = useRef(null)
  const meshRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!window.THREE) {
      console.error('Three.js not loaded')
      return
    }

    const container = containerRef.current
    if (!container) return

    const width = container.offsetWidth
    const height = container.offsetHeight

    // Setup renderer
    const renderer = new window.THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
      stencil: false,
      depth: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Setup camera
    const camera = new window.THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
    camera.position.z = 50
    cameraRef.current = camera

    // Setup scene
    const scene = new window.THREE.Scene()
    scene.background = new window.THREE.Color(0x0a0e27)
    sceneRef.current = scene

    // Setup clock
    clockRef.current = new window.THREE.Clock()

    // Setup touch texture
    const touchTexture = new TouchTexture()
    touchTextureRef.current = touchTexture

    // Get view size
    const getViewSize = () => {
      const fovInRadians = (camera.fov * Math.PI) / 180
      const h = Math.abs(camera.position.z * Math.tan(fovInRadians / 2) * 2)
      return { width: h * camera.aspect, height: h }
    }

    const viewSize = getViewSize()

    // Setup uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new window.THREE.Vector2(width, height) },
      uColor1: { value: new window.THREE.Vector3(0.945, 0.353, 0.133) },
      uColor2: { value: new window.THREE.Vector3(0.039, 0.055, 0.153) },
      uColor3: { value: new window.THREE.Vector3(0.945, 0.353, 0.133) },
      uColor4: { value: new window.THREE.Vector3(0.039, 0.055, 0.153) },
      uColor5: { value: new window.THREE.Vector3(0.945, 0.353, 0.133) },
      uColor6: { value: new window.THREE.Vector3(0.039, 0.055, 0.153) },
      uSpeed: { value: 1.5 },
      uIntensity: { value: 1.8 },
      uTouchTexture: { value: touchTexture.texture },
      uGrainIntensity: { value: 0.08 },
      uZoom: { value: 1.0 },
      uDarkNavy: { value: new window.THREE.Vector3(0.039, 0.055, 0.153) },
      uGradientSize: { value: 0.45 },
      uGradientCount: { value: 12.0 },
      uColor1Weight: { value: 0.5 },
      uColor2Weight: { value: 1.8 }
    }

    // Create geometry
    const geometry = new window.THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1)

    // Create material
    const material = new window.THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vec3 pos = position.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        uniform float uZoom;
        uniform vec3 uDarkNavy;
        uniform float uGradientSize;
        uniform float uGradientCount;
        uniform float uColor1Weight;
        uniform float uColor2Weight;

        varying vec2 vUv;

        #define PI 3.14159265359

        float grain(vec2 uv, float time) {
          vec2 grainUv = uv * uResolution * 0.5;
          float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
          return grainValue * 2.0 - 1.0;
        }

        vec3 getGradientColor(vec2 uv, float time) {
          float gradientRadius = uGradientSize;

          vec2 center1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
          vec2 center2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 center3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 center4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
          vec2 center5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
          vec2 center6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);

          float dist1 = length(uv - center1);
          float dist2 = length(uv - center2);
          float dist3 = length(uv - center3);
          float dist4 = length(uv - center4);
          float dist5 = length(uv - center5);
          float dist6 = length(uv - center6);

          float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
          float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
          float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
          float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
          float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
          float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);

          vec2 rotatedUv1 = uv - 0.5;
          float angle1 = time * uSpeed * 0.15;
          rotatedUv1 = vec2(
            rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1),
            rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1)
          );
          rotatedUv1 += 0.5;

          vec2 rotatedUv2 = uv - 0.5;
          float angle2 = -time * uSpeed * 0.12;
          rotatedUv2 = vec2(
            rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2),
            rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2)
          );
          rotatedUv2 += 0.5;

          float radialGradient1 = length(rotatedUv1 - 0.5);
          float radialGradient2 = length(rotatedUv2 - 0.5);
          float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, radialGradient1);
          float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, radialGradient2);

          vec3 color = vec3(0.0);
          color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
          color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
          color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
          color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
          color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
          color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;

          color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
          color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;

          color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;

          float luminance = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(luminance), color, 1.35);
          color = pow(color, vec3(0.92));

          float brightness1 = length(color);
          float mixFactor1 = max(brightness1 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor1);

          float maxBrightness = 1.0;
          float brightness = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }

          return color;
        }

        void main() {
          vec2 uv = vUv;

          vec4 touchTex = texture2D(uTouchTexture, uv);
          float vx = -(touchTex.r * 2.0 - 1.0);
          float vy = -(touchTex.g * 2.0 - 1.0);
          float intensity = touchTex.b;
          uv.x += vx * 0.8 * intensity;
          uv.y += vy * 0.8 * intensity;

          vec2 center = vec2(0.5);
          float dist = length(uv - center);
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
          float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
          uv += vec2(ripple + wave);

          vec3 color = getGradientColor(uv, uTime);

          float grainValue = grain(uv, uTime);
          color += grainValue * uGrainIntensity;

          float timeShift = uTime * 0.5;
          color.r += sin(timeShift) * 0.02;
          color.g += cos(timeShift * 1.4) * 0.02;
          color.b += sin(timeShift * 1.2) * 0.02;

          float brightness2 = length(color);
          float mixFactor2 = max(brightness2 * 1.2, 0.15);
          color = mix(uDarkNavy, color, mixFactor2);

          color = clamp(color, vec3(0.0), vec3(1.0));

          float maxBrightness = 1.0;
          float brightness = length(color);
          if (brightness > maxBrightness) {
            color = color * (maxBrightness / brightness);
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `
    })

    // Create mesh
    const mesh = new window.THREE.Mesh(geometry, material)
    mesh.position.z = 0
    scene.add(mesh)
    meshRef.current = { mesh, uniforms, getViewSize }

    // Mouse/Touch handlers
    const handleMouseMove = (ev) => {
      const rect = container.getBoundingClientRect()
      const x = (ev.clientX - rect.left) / rect.width
      const y = 1 - (ev.clientY - rect.top) / rect.height
      touchTexture.addTouch({ x, y })
    }

    const handleTouchMove = (ev) => {
      ev.preventDefault()
      const touch = ev.touches[0]
      const rect = container.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width
      const y = 1 - (touch.clientY - rect.top) / rect.height
      touchTexture.addTouch({ x, y })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('touchmove', handleTouchMove, { passive: false })

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)

      const viewSize = getViewSize()
      mesh.geometry.dispose()
      mesh.geometry = new window.THREE.PlaneGeometry(viewSize.width, viewSize.height, 1, 1)
      uniforms.uResolution.value.set(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      const delta = clockRef.current.getDelta()
      const clampedDelta = Math.min(delta, 0.1)

      touchTexture.update()
      uniforms.uTime.value += clampedDelta

      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('touchmove', handleTouchMove)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (meshRef.current) {
        meshRef.current.mesh.geometry.dispose()
        meshRef.current.mesh.material.dispose()
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
        container.removeChild(rendererRef.current.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="liquid-gradient-container" />
}

export default LiquidGradient
