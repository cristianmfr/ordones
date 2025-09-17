import { Label } from '@ordones/ui/components/label'
import { Image, RotateCw, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import type { ImageElementData, MugElement } from '../types'

interface ImageToolProps {
  onAddElement: (element: MugElement) => void
  selectedElement?: MugElement
  onUpdateElement?: (id: string, updates: Partial<MugElement>) => void
}

export const ImageTool = ({
  onAddElement,
  selectedElement,
  onUpdateElement,
}: ImageToolProps) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isImageElement = selectedElement?.type === 'image'
  const currentImageData = isImageElement
    ? (selectedElement.data as ImageElementData)
    : null

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem (JPG, PNG, SVG)')
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      const img = document.createElement('img')
      img.onload = () => {
        const maxSize = 200
        let { width, height } = img

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        const newElement: MugElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          position: { x: 50, y: 50 },
          size: { width, height },
          rotation: 0,
          opacity: 1,
          zIndex: Date.now(),
          data: {
            src: e.target?.result as string,
            originalWidth: img.width,
            originalHeight: img.height,
          },
        }
        onAddElement(newElement)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRotateImage = () => {
    if (isImageElement && selectedElement && onUpdateElement) {
      const newRotation = (selectedElement.rotation + 90) % 360
      onUpdateElement(selectedElement.id, { rotation: newRotation })
    }
  }

  const handleOpacityChange = (opacity: number) => {
    if (isImageElement && selectedElement && onUpdateElement) {
      onUpdateElement(selectedElement.id, { opacity })
    }
  }

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    if (
      isImageElement &&
      selectedElement &&
      onUpdateElement &&
      currentImageData
    ) {
      const aspectRatio =
        currentImageData.originalWidth / currentImageData.originalHeight
      const newSize = { ...selectedElement.size }

      if (dimension === 'width') {
        newSize.width = value
        newSize.height = value / aspectRatio
      } else {
        newSize.height = value
        newSize.width = value * aspectRatio
      }

      onUpdateElement(selectedElement.id, { size: newSize })
    }
  }

  return (
    <div className='p-4 space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Image className='w-5 h-5' />
        <h3 className='text-lg font-semibold'>Imagem</h3>
      </div>

      <div className='space-y-4'>
        {!isImageElement && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
            onDrop={handleDrop}
            onDragOver={e => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}>
            <Upload className='w-12 h-12 mx-auto mb-4 text-gray-400' />
            <p className='text-gray-600 mb-2'>
              Arraste uma imagem aqui ou clique para selecionar
            </p>
            <p className='text-sm text-gray-500 mb-4'>Suporta JPG, PNG e SVG</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>
              Selecionar Arquivo
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleFileInput}
          className='hidden'
        />

        {isImageElement && selectedElement && currentImageData && (
          <div className='space-y-4'>
            <div className='border rounded-lg p-3 bg-gray-50'>
              <img
                src={currentImageData.src}
                alt='Preview'
                className='max-w-full max-h-32 mx-auto object-contain rounded'
              />
            </div>

            <div>
              <Label className='block text-sm font-medium mb-2'>
                Dimensões
              </Label>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <Label className='text-xs text-gray-600'>Largura</Label>
                  <input
                    type='number'
                    value={Math.round(selectedElement.size.width)}
                    onChange={e =>
                      handleSizeChange('width', Number(e.target.value))
                    }
                    className='w-full p-2 border border-gray-300 rounded text-sm'
                    min='10'
                    max='200'
                  />
                </div>
                <div>
                  <Label className='text-xs text-gray-600'>Altura</Label>
                  <input
                    type='number'
                    value={Math.round(selectedElement.size.height)}
                    onChange={e =>
                      handleSizeChange('height', Number(e.target.value))
                    }
                    className='w-full p-2 border border-gray-300 rounded text-sm'
                    min='10'
                    max='200'
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className='block text-sm font-medium mb-2'>
                Opacidade
              </Label>
              <div className='flex items-center gap-2'>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={selectedElement.opacity}
                  onChange={e => handleOpacityChange(Number(e.target.value))}
                  className='flex-1'
                />
                <span className='text-sm text-gray-600 min-w-[3rem]'>
                  {Math.round(selectedElement.opacity * 100)}%
                </span>
              </div>
            </div>

            <div>
              <Label className='block text-sm font-medium mb-2'>Rotação</Label>
              <div className='flex items-center gap-2'>
                <button
                  onClick={handleRotateImage}
                  className='flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors'>
                  <RotateCw className='w-4 h-4' />
                  Girar 90°
                </button>
                <span className='text-sm text-gray-600'>
                  {selectedElement.rotation}°
                </span>
              </div>
            </div>

            <div className='pt-2 border-t'>
              <p className='text-xs text-gray-500'>
                Resolução original: {currentImageData.originalWidth}x
                {currentImageData.originalHeight}px
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
