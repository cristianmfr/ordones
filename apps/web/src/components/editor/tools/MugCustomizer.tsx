import { Label } from '@ordones/ui/components/label'
import { Coffee, Palette, Zap } from 'lucide-react'
import type { MugConfig } from '../types'

interface MugCustomizerProps {
  mugConfig: MugConfig
  onUpdateConfig: (config: Partial<MugConfig>) => void
}

const MUG_COLORS = [
  { name: 'Branca', value: '#ffffff', preview: '#ffffff' },
  { name: 'Preta', value: '#1a1a1a', preview: '#1a1a1a' },
  { name: 'Azul', value: '#3b82f6', preview: '#3b82f6' },
  { name: 'Vermelha', value: '#ef4444', preview: '#ef4444' },
  { name: 'Verde', value: '#10b981', preview: '#10b981' },
  { name: 'Amarela', value: '#fbbf24', preview: '#fbbf24' },
  { name: 'Rosa', value: '#ec4899', preview: '#ec4899' },
  { name: 'Roxa', value: '#8b5cf6', preview: '#8b5cf6' },
]

const MUG_TYPES = [
  {
    value: 'standard',
    name: 'Padrão',
    description: 'Caneca cerâmica tradicional',
    icon: Coffee,
  },
  {
    value: 'magic',
    name: 'Mágica',
    description: 'Muda de cor com líquidos quentes',
    icon: Zap,
  },
  {
    value: 'thermal',
    name: 'Térmica',
    description: 'Mantém a temperatura por mais tempo',
    icon: Palette,
  },
]

const MUG_SIZES = [
  {
    value: '325ml',
    name: '325ml',
    description: 'Tamanho padrão',
    dimensions: '8cm × 9.5cm',
  },
  {
    value: '500ml',
    name: '500ml',
    description: 'Tamanho grande',
    dimensions: '9cm × 11cm',
  },
]

export const MugCustomizer = ({
  mugConfig,
  onUpdateConfig,
}: MugCustomizerProps) => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex items-center gap-2 mb-4'>
        <Coffee className='w-5 h-5' />
        <h3 className='text-lg font-semibold'>Personalizar Caneca</h3>
      </div>

      <div>
        <Label className='block text-sm font-medium mb-3'>Cor da Caneca</Label>
        <div className='grid grid-cols-4 gap-2'>
          {MUG_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => onUpdateConfig({ color: color.value })}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                mugConfig.color === color.value
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              title={color.name}>
              <div
                className='w-8 h-8 rounded-full mx-auto border border-gray-200'
                style={{ backgroundColor: color.preview }}
              />
              <span className='text-xs text-gray-600 mt-1 block'>
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className='block text-sm font-medium mb-3'>Tipo de Caneca</Label>
        <div className='space-y-2'>
          {MUG_TYPES.map(type => {
            const Icon = type.icon
            return (
              <button
                key={type.value}
                onClick={() => onUpdateConfig({ type: type.value as any })}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  mugConfig.type === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                <div className='flex items-center gap-3'>
                  <Icon className='w-5 h-5 text-gray-600' />
                  <div>
                    <div className='font-medium'>{type.name}</div>
                    <div className='text-sm text-gray-600'>
                      {type.description}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <Label className='block text-sm font-medium mb-3'>Tamanho</Label>
        <div className='space-y-2'>
          {MUG_SIZES.map(size => (
            <button
              key={size.value}
              onClick={() => onUpdateConfig({ size: size.value as any })}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                mugConfig.size === size.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}>
              <div className='flex justify-between items-center'>
                <div>
                  <div className='font-medium'>{size.name}</div>
                  <div className='text-sm text-gray-600'>
                    {size.description}
                  </div>
                </div>
                <div className='text-xs text-gray-500'>{size.dimensions}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className='bg-gray-50 p-3 rounded-lg'>
        <h4 className='font-medium text-sm mb-2'>Resumo da Personalização</h4>
        <div className='space-y-1 text-sm text-gray-600'>
          <div>
            Cor:{' '}
            {MUG_COLORS.find(c => c.value === mugConfig.color)?.name ||
              'Personalizada'}
          </div>
          <div>
            Tipo: {MUG_TYPES.find(t => t.value === mugConfig.type)?.name}
          </div>
          <div>Tamanho: {mugConfig.size}</div>
        </div>
      </div>
    </div>
  )
}
