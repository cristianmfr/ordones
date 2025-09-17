import { useEffect, useRef, useState, useCallback } from 'react'
import type { MugConfig, MugElement, Position } from './types'

interface Canvas3DProps {
  elements: MugElement[]
  mugConfig: MugConfig
  viewSide: 'front' | 'back'
  selectedElementId: string | null
  onElementClick: (elementId: string) => void
  onCanvasClick: () => void
  onElementDrag: (elementId: string, position: Position) => void
}

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 500
const MUG_PRINT_AREA = {
  x: 120,
  y: 150,
  width: 160,
  height: 200,
}

export const Canvas3D = ({
  elements,
  mugConfig,
  viewSide,
  selectedElementId,
  onElementClick,
  onCanvasClick,
  onElementDrag,
}: Canvas3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [loadedImages, setLoadedImages] = useState<Map<string, HTMLImageElement>>(new Map())

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      if (loadedImages.has(src)) {
        resolve(loadedImages.get(src)!)
        return
      }
      
      const img = document.createElement('img')
      img.onload = () => {
        setLoadedImages(prev => new Map(prev).set(src, img))
        resolve(img)
      }
      img.onerror = reject
      img.src = src
    })
  }, [loadedImages])

  const drawMug = (ctx: CanvasRenderingContext2D) => {
    const centerX = CANVAS_WIDTH / 2
    const centerY = CANVAS_HEIGHT / 2
    const mugWidth = 200
    const mugHeight = 300

    ctx.save()

    // Draw mug shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(
      centerX - mugWidth / 2 + 5,
      centerY - mugHeight / 2 + 5,
      mugWidth,
      mugHeight
    )

    // Draw mug body
    ctx.fillStyle = mugConfig.color
    ctx.fillRect(
      centerX - mugWidth / 2,
      centerY - mugHeight / 2,
      mugWidth,
      mugHeight
    )

    // Draw mug handle
    if (viewSide === 'front') {
      ctx.strokeStyle = mugConfig.color
      ctx.lineWidth = 15
      ctx.beginPath()
      ctx.arc(
        centerX + mugWidth / 2 + 20,
        centerY,
        40,
        -Math.PI / 3,
        Math.PI / 3
      )
      ctx.stroke()
    }

    // Draw print area outline (subtle)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.strokeRect(
      MUG_PRINT_AREA.x,
      MUG_PRINT_AREA.y,
      MUG_PRINT_AREA.width,
      MUG_PRINT_AREA.height
    )
    ctx.setLineDash([])

    ctx.restore()
  }

  const drawElement = (ctx: CanvasRenderingContext2D, element: MugElement) => {
    const x = MUG_PRINT_AREA.x + element.position.x
    const y = MUG_PRINT_AREA.y + element.position.y

    ctx.save()
    ctx.globalAlpha = element.opacity
    ctx.translate(x + element.size.width / 2, y + element.size.height / 2)
    ctx.rotate((element.rotation * Math.PI) / 180)

    if (element.type === 'text') {
      const textData = element.data as any
      ctx.fillStyle = textData.color
      ctx.font = `${textData.fontStyle} ${textData.fontWeight} ${textData.fontSize}px ${textData.fontFamily}`
      ctx.textAlign = textData.textAlign
      ctx.fillText(textData.text, 0, 0)

      if (textData.textDecoration === 'underline') {
        const metrics = ctx.measureText(textData.text)
        ctx.beginPath()
        ctx.moveTo(-metrics.width / 2, 5)
        ctx.lineTo(metrics.width / 2, 5)
        ctx.strokeStyle = textData.color
        ctx.lineWidth = 1
        ctx.stroke()
      }
    } else if (element.type === 'image') {
      const imageData = element.data as any
      const img = loadedImages.get(imageData.src)
      if (img && img.complete) {
        ctx.drawImage(
          img,
          -element.size.width / 2,
          -element.size.height / 2,
          element.size.width,
          element.size.height
        )
      }
    }

    ctx.restore()

    // Draw selection outline
    if (element.id === selectedElementId) {
      ctx.save()
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      ctx.strokeRect(
        x - 2,
        y - 2,
        element.size.width + 4,
        element.size.height + 4
      )

      // Draw resize handles
      const handleSize = 8
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(
        x - handleSize / 2,
        y - handleSize / 2,
        handleSize,
        handleSize
      )
      ctx.fillRect(
        x + element.size.width - handleSize / 2,
        y - handleSize / 2,
        handleSize,
        handleSize
      )
      ctx.fillRect(
        x - handleSize / 2,
        y + element.size.height - handleSize / 2,
        handleSize,
        handleSize
      )
      ctx.fillRect(
        x + element.size.width - handleSize / 2,
        y + element.size.height - handleSize / 2,
        handleSize,
        handleSize
      )

      ctx.restore()
    }
  }

  const redraw = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw background
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    drawMug(ctx)

    // Sort elements by zIndex
    const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex)

    sortedElements.forEach(element => {
      drawElement(ctx, element)
    })
  }

  useEffect(() => {
    // Load all images
    const imageElements = elements.filter(el => el.type === 'image')
    const loadPromises = imageElements.map(el => {
      const imageData = el.data as any
      return loadImage(imageData.src).catch(() => null) // Ignore errors
    })
    
    Promise.all(loadPromises).then(() => {
      redraw()
    })
    
    // Also redraw for non-image changes
    if (imageElements.length === 0) {
      redraw()
    }
  }, [elements, mugConfig, viewSide, selectedElementId, loadImage])

  const getElementAt = (x: number, y: number): MugElement | null => {
    const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex)

    for (const element of sortedElements) {
      const elementX = MUG_PRINT_AREA.x + element.position.x
      const elementY = MUG_PRINT_AREA.y + element.position.y

      if (
        x >= elementX &&
        x <= elementX + element.size.width &&
        y >= elementY &&
        y <= elementY + element.size.height
      ) {
        return element
      }
    }
    return null
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const element = getElementAt(x, y)

    if (element) {
      onElementClick(element.id)
      setIsDragging(true)
      setDragOffset({
        x: x - (MUG_PRINT_AREA.x + element.position.x),
        y: y - (MUG_PRINT_AREA.y + element.position.y),
      })
    } else {
      onCanvasClick()
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElementId) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newPosition = {
      x: Math.max(
        0,
        Math.min(MUG_PRINT_AREA.width - 50, x - MUG_PRINT_AREA.x - dragOffset.x)
      ),
      y: Math.max(
        0,
        Math.min(
          MUG_PRINT_AREA.height - 50,
          y - MUG_PRINT_AREA.y - dragOffset.y
        )
      ),
    }

    onElementDrag(selectedElementId, newPosition)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }

  return (
    <div className='relative'>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className='border border-gray-200 rounded-lg cursor-pointer bg-white'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className='absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm'>
        {viewSide === 'front' ? 'Frente' : 'Verso'}
      </div>

      <div className='absolute bottom-2 right-2 text-xs text-gray-500'>
        Área de impressão: {MUG_PRINT_AREA.width}x{MUG_PRINT_AREA.height}px
      </div>
    </div>
  )
}
