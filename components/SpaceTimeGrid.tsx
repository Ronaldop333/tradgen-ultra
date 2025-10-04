'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
  originalX: number
  originalY: number
  vx: number
  vy: number
}

export default function SpaceTimeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })
  const pointsRef = useRef<Point[][]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // DEFINIR initGrid PRIMEIRO
    const initGrid = () => {
      pointsRef.current = []
      const spacing = 40
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1

      for (let y = 0; y < rows; y++) {
        pointsRef.current[y] = []
        for (let x = 0; x < cols; x++) {
          pointsRef.current[y][x] = {
            x: x * spacing,
            y: y * spacing,
            originalX: x * spacing,
            originalY: y * spacing,
            vx: 0,
            vy: 0
          }
        }
      }
    }

    // DEPOIS resizeCanvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGrid() // Agora initGrid já está definido
    }

    // Mouse move
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    }

    // Animação
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.fillStyle = 'rgba(10, 10, 18, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const points = pointsRef.current
      const mouse = mouseRef.current

      if (!points.length) return

      for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[y].length; x++) {
          const point = points[y][x]
          
          const dx = mouse.x - point.x
          const dy = mouse.y - point.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            
            const depth = force * 30
            point.vx = -Math.cos(angle) * depth
            point.vy = -Math.sin(angle) * depth
          } else {
            point.vx += (point.originalX - point.x) * 0.1
            point.vy += (point.originalY - point.y) * 0.1
            
            point.vx *= 0.8
            point.vy *= 0.8
          }
          
          point.x += point.vx
          point.y += point.vy
        }
      }

      // COR ORIGINAL mantida - apenas espessura reduzida
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)' // ✅ Cor original
      ctx.lineWidth = 0.2 // ✅ Linha mais fina

      for (let y = 0; y < points.length; y++) {
        ctx.beginPath()
        for (let x = 0; x < points[y].length; x++) {
          if (x === 0) {
            ctx.moveTo(points[y][x].x, points[y][x].y)
          } else {
            ctx.lineTo(points[y][x].x, points[y][x].y)
          }
        }
        ctx.stroke()
      }

      if (points[0]) {
        for (let x = 0; x < points[0].length; x++) {
          ctx.beginPath()
          for (let y = 0; y < points.length; y++) {
            if (y === 0) {
              ctx.moveTo(points[y][x].x, points[y][x].y)
            } else {
              ctx.lineTo(points[y][x].x, points[y][x].y)
            }
          }
          ctx.stroke()
        }
      }

      ctx.fillStyle = '#00f0ff'
      for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[y].length; x++) {
          const point = points[y][x]
          ctx.beginPath()
          ctx.arc(point.x, point.y, 0.5, 0, Math.PI * 2) // ✅ Pontos menores
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Inicializar
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
