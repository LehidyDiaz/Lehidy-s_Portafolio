import { useRef, useEffect, memo } from 'react'

const STAR_COLORS = [
  'rgba(217, 178, 95, ',
  'rgba(227, 195, 107, ',
  'rgba(217, 178, 95, ',
]

function createStars(count) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.7 ? 1 : 1.5,
      baseOpacity: 0.2 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    })
  }
  return stars
}

function createConstellations(count) {
  const lines = []
  for (let c = 0; c < count; c++) {
    const cx = Math.random() * 80 + 10
    const cy = Math.random() * 80 + 10
    const points = []
    const pointCount = 3 + Math.floor(Math.random() * 3)
    for (let p = 0; p < pointCount; p++) {
      points.push({
        x: cx + (Math.random() - 0.5) * 18,
        y: cy + (Math.random() - 0.5) * 18,
      })
    }
    for (let p = 0; p < points.length - 1; p++) {
      lines.push({
        x1: points[p].x, y1: points[p].y,
        x2: points[p + 1].x, y2: points[p + 1].y,
      })
    }
  }
  return lines
}

const Stars = memo(function Stars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const isMobile = window.innerWidth < 768

    const stars = createStars(isMobile ? 18 : 65)
    const constellations = createConstellations(isMobile ? 2 : 7)

    let shooting = { active: false, timer: 0, delay: 10 + Math.random() * 12, x: 0, y: 0 }

    function resize() {
      const w = window.innerWidth, h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    let animId = null, running = true, lastTime = 0, elapsed = 0
    const fps = isMobile ? 20 : 30

    function animate(time) {
      if (!running) return
      const delta = time - lastTime
      lastTime = time
      elapsed += delta

      const dark = document.documentElement.classList.contains('dark')
      const w = canvas.width / dpr, h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      if (dark) {
        for (const star of stars) {
          const t = Math.sin(elapsed / 1000 * star.speed + star.phase) * 0.35 + 0.65
          const opacity = star.baseOpacity * t
          ctx.beginPath()
          ctx.arc(star.x / 100 * w, star.y / 100 * h, star.size, 0, Math.PI * 2)
          ctx.fillStyle = star.color + opacity + ')'
          ctx.fill()
        }

        for (const line of constellations) {
          const op = 0.12 + Math.sin(elapsed / 4000) * 0.045
          ctx.beginPath()
          ctx.moveTo(line.x1 / 100 * w, line.y1 / 100 * h)
          ctx.lineTo(line.x2 / 100 * w, line.y2 / 100 * h)
          ctx.strokeStyle = `rgba(217, 178, 95, ${Math.max(0, Math.min(0.24, op))})`
          ctx.lineWidth = 0.7
          ctx.setLineDash([3, 5])
          ctx.stroke()
          ctx.setLineDash([])
        }

        if (!isMobile) {
          shooting.timer += delta
          if (!shooting.active && shooting.timer > shooting.delay * 1000) {
            shooting.active = true
            shooting.timer = 0
            shooting.delay = 10 + Math.random() * 12
            shooting.x = w * 1.05
            shooting.y = h * (5 + Math.random() * 40) / 100
          }
          if (shooting.active) {
            const progress = shooting.timer / 3000
            if (progress >= 1) {
              shooting.active = false
            } else {
              const x = shooting.x - 400 * progress
              const y = shooting.y + 250 * progress
              const alpha = progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3)
              ctx.beginPath()
              ctx.arc(x, y, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(217, 178, 95, ${alpha})`
              ctx.fill()
            }
          }
        }
      }

      setTimeout(() => { animId = requestAnimationFrame(animate) }, 1000 / fps)
    }

    animId = requestAnimationFrame(animate)

    function onVisibilityChange() {
      if (document.hidden) {
        running = false
        if (animId) { cancelAnimationFrame(animId); animId = null }
      } else {
        running = true; lastTime = 0
        animId = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      running = false
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
  )
})

export default Stars
