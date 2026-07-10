import { memo, useEffect, useRef } from 'react'

function seededRandom(seed) {
  let value = seed
  return () => {
    value |= 0
    value = value + 0x6D2B79F5 | 0
    let result = Math.imul(value ^ value >>> 15, 1 | value)
    result = result + Math.imul(result ^ result >>> 7, 61 | result) ^ result
    return ((result ^ result >>> 14) >>> 0) / 4294967296
  }
}

function createSky(isMobile) {
  const random = seededRandom(1997)
  const counts = isMobile
    ? { small: 34, medium: 8, prominent: 3 }
    : { small: 112, medium: 32, prominent: 10 }
  const count = counts.small + counts.medium + counts.prominent
  const stars = Array.from({ length: count }, (_, index) => {
    const prominent = index < counts.prominent
    const medium = !prominent && index < counts.prominent + counts.medium
    return {
      x: random() * 100,
      y: random() * 100,
      size: prominent ? 1.9 + random() * 1.25 : medium ? 1.05 + random() * .85 : .38 + random() * .72,
      opacity: prominent ? .62 + random() * .3 : .14 + random() * .54,
      speed: .12 + random() * .32,
      phase: random() * Math.PI * 2,
      prominent,
      tone: random() > .91 ? 'green' : random() > .68 ? 'blue' : random() > .42 ? 'ivory' : 'gold',
    }
  })

  const constellationCount = isMobile ? 2 : 8
  const constellations = Array.from({ length: constellationCount }, () => {
    const originX = 8 + random() * 84
    const originY = 8 + random() * 84
    const pointCount = 4 + Math.floor(random() * 3)
    return Array.from({ length: pointCount }, () => ({
      x: Math.max(2, Math.min(98, originX + (random() - .5) * 18)),
      y: Math.max(2, Math.min(98, originY + (random() - .5) * 15)),
    }))
  })

  return { stars, constellations }
}

const colors = {
  gold: [227, 195, 107],
  blue: [118, 174, 255],
  green: [75, 198, 144],
  ivory: [247, 244, 232],
}

const Stars = memo(function Stars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isMobile = mobileQuery.matches
    const reducedMotion = motionQuery.matches
    const { stars, constellations } = createSky(isMobile)
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5)
    let frame = 0
    let previousTime = 0
    let elapsed = 0
    let running = true

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time = 0) => {
      if (!running) return
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const delta = Math.min(50, time - previousTime || 16)
      previousTime = time
      elapsed += delta
      const dark = document.documentElement.classList.contains('dark')
      const globalOpacity = dark ? 1 : .27

      context.clearRect(0, 0, width, height)

      const lineAlpha = (dark ? .19 : .11) * globalOpacity
      for (const points of constellations) {
        context.beginPath()
        points.forEach((point, index) => {
          const x = point.x / 100 * width
          const y = point.y / 100 * height
          if (index === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
        })
        context.strokeStyle = `rgba(217,178,95,${lineAlpha})`
        context.lineWidth = .7
        context.setLineDash([3, 5])
        context.stroke()
        context.setLineDash([])

        for (const point of points) {
          const x = point.x / 100 * width
          const y = point.y / 100 * height
          context.beginPath()
          context.arc(x, y, 1.65, 0, Math.PI * 2)
          context.fillStyle = `rgba(227,195,107,${(dark ? .62 : .38) * globalOpacity})`
          context.shadowColor = 'rgba(217,178,95,.65)'
          context.shadowBlur = 6
          context.fill()
          context.shadowBlur = 0
        }
      }

      for (const star of stars) {
        const [red, green, blue] = colors[star.tone]
        const pulse = reducedMotion ? .78 : Math.sin(elapsed / 1000 * star.speed + star.phase) * .19 + .79
        const alpha = star.opacity * pulse * globalOpacity
        const x = star.x / 100 * width
        const y = star.y / 100 * height

        context.fillStyle = `rgba(${red},${green},${blue},${alpha})`
        context.shadowColor = `rgba(${red},${green},${blue},${alpha})`
        context.shadowBlur = star.prominent ? 10 : 2
        context.beginPath()
        context.arc(x, y, star.size, 0, Math.PI * 2)
        context.fill()

        if (star.prominent) {
          const ray = star.size * 3.8
          context.strokeStyle = `rgba(${red},${green},${blue},${alpha * .72})`
          context.lineWidth = .55
          context.beginPath()
          context.moveTo(x - ray, y)
          context.lineTo(x + ray, y)
          context.moveTo(x, y - ray)
          context.lineTo(x, y + ray)
          context.stroke()
        }
        context.shadowBlur = 0
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const handleVisibility = () => {
      running = !document.hidden
      if (running && !reducedMotion) {
        previousTime = 0
        frame = requestAnimationFrame(draw)
      } else if (frame) {
        cancelAnimationFrame(frame)
      }
    }

    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-star-canvas" />
})

export default Stars
