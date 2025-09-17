import { Label } from '@ordones/ui/components/label'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Type,
  Underline,
} from 'lucide-react'
import { useState } from 'react'
import type { MugElement, TextElementData } from '../types'

interface TextToolProps {
  onAddElement: (element: MugElement) => void
  selectedElement?: MugElement
  onUpdateElement?: (id: string, updates: Partial<MugElement>) => void
}

const FONT_FAMILIES = [
  'Arial',
  'Times New Roman',
  'Comic Sans MS',
  'Helvetica',
  'Georgia',
  'Verdana',
  'Courier New',
  'Impact',
]

const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72]

export const TextTool = ({
  onAddElement,
  selectedElement,
  onUpdateElement,
}: TextToolProps) => {
  const [textConfig, setTextConfig] = useState<TextElementData>({
    text: 'Novo texto',
    fontSize: 20,
    fontFamily: 'Arial',
    color: '#000000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
  })

  const isTextElement = selectedElement?.type === 'text'
  const currentTextData = isTextElement
    ? (selectedElement.data as TextElementData)
    : textConfig

  const handleAddText = () => {
    const newElement: MugElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      position: { x: 50, y: 50 },
      size: { width: 120, height: 30 },
      rotation: 0,
      opacity: 1,
      zIndex: Date.now(),
      data: { ...textConfig },
    }
    onAddElement(newElement)
  }

  const handleUpdateText = (updates: Partial<TextElementData>) => {
    if (isTextElement && selectedElement && onUpdateElement) {
      onUpdateElement(selectedElement.id, {
        data: { ...selectedElement.data, ...updates },
      })
    } else {
      setTextConfig(prev => ({ ...prev, ...updates }))
    }
  }

  return (
    <div className='p-4 space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Type className='w-5 h-5' />
        <h3 className='text-lg font-semibold'>Texto</h3>
      </div>

      <div className='space-y-4'>
        <div>
          <Label className='block text-sm font-medium mb-1'>Texto</Label>
          <textarea
            value={currentTextData.text}
            onChange={e => handleUpdateText({ text: e.target.value })}
            className='w-full p-2 border border-gray-300 rounded-md resize-none'
            rows={3}
            placeholder='Digite seu texto aqui...'
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label className='block text-sm font-medium mb-1'>Fonte</Label>
            <select
              value={currentTextData.fontFamily}
              onChange={e => handleUpdateText({ fontFamily: e.target.value })}
              className='w-full p-2 border border-gray-300 rounded-md'>
              {FONT_FAMILIES.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className='block text-sm font-medium mb-1'>Tamanho</Label>
            <select
              value={currentTextData.fontSize}
              onChange={e =>
                handleUpdateText({ fontSize: Number(e.target.value) })
              }
              className='w-full p-2 border border-gray-300 rounded-md'>
              {FONT_SIZES.map(size => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label className='block text-sm font-medium mb-1'>Cor</Label>
          <div className='flex items-center gap-2'>
            <input
              type='color'
              value={currentTextData.color}
              onChange={e => handleUpdateText({ color: e.target.value })}
              className='w-12 h-10 border border-gray-300 rounded cursor-pointer'
            />
            <input
              type='text'
              value={currentTextData.color}
              onChange={e => handleUpdateText({ color: e.target.value })}
              className='flex-1 p-2 border border-gray-300 rounded-md font-mono text-sm'
              placeholder='#000000'
            />
          </div>
        </div>

        <div>
          <Label className='block text-sm font-medium mb-2'>Estilo</Label>
          <div className='flex gap-2'>
            <button
              onClick={() =>
                handleUpdateText({
                  fontWeight:
                    currentTextData.fontWeight === 'bold' ? 'normal' : 'bold',
                })
              }
              className={`p-2 border rounded ${
                currentTextData.fontWeight === 'bold'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}>
              <Bold className='w-4 h-4' />
            </button>

            <button
              onClick={() =>
                handleUpdateText({
                  fontStyle:
                    currentTextData.fontStyle === 'italic'
                      ? 'normal'
                      : 'italic',
                })
              }
              className={`p-2 border rounded ${
                currentTextData.fontStyle === 'italic'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}>
              <Italic className='w-4 h-4' />
            </button>

            <button
              onClick={() =>
                handleUpdateText({
                  textDecoration:
                    currentTextData.textDecoration === 'underline'
                      ? 'none'
                      : 'underline',
                })
              }
              className={`p-2 border rounded ${
                currentTextData.textDecoration === 'underline'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}>
              <Underline className='w-4 h-4' />
            </button>
          </div>
        </div>

        <div>
          <Label className='block text-sm font-medium mb-2'>Alinhamento</Label>
          <div className='flex gap-2'>
            {[
              { value: 'left', icon: AlignLeft },
              { value: 'center', icon: AlignCenter },
              { value: 'right', icon: AlignRight },
            ].map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleUpdateText({ textAlign: value as any })}
                className={`p-2 border rounded ${
                  currentTextData.textAlign === value
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}>
                <Icon className='w-4 h-4' />
              </button>
            ))}
          </div>
        </div>

        {!isTextElement && (
          <button
            onClick={handleAddText}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors'>
            Adicionar Texto
          </button>
        )}
      </div>
    </div>
  )
}
