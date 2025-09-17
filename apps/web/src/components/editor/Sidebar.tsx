import { Coffee, Download, Image, Layers, Type } from 'lucide-react'
import { useState } from 'react'
import { ImageTool } from './tools/ImageTool'
import { MugCustomizer } from './tools/MugCustomizer'
import { TextTool } from './tools/TextTool'
import type { MugConfig, MugElement } from './types'

interface SidebarProps {
  elements: MugElement[]
  selectedElementId: string | null
  mugConfig: MugConfig
  onAddElement: (element: MugElement) => void
  onUpdateElement: (id: string, updates: Partial<MugElement>) => void
  onSelectElement: (id: string | null) => void
  onUpdateMugConfig: (config: Partial<MugConfig>) => void
  onExportImage: () => void
}

type TabId = 'text' | 'image' | 'mug' | 'layers' | 'export'

const TABS = [
  { id: 'text' as TabId, name: 'Texto', icon: Type },
  { id: 'image' as TabId, name: 'Imagem', icon: Image },
  { id: 'mug' as TabId, name: 'Caneca', icon: Coffee },
  { id: 'layers' as TabId, name: 'Camadas', icon: Layers },
  { id: 'export' as TabId, name: 'Exportar', icon: Download },
]

export const Sidebar = ({
  elements,
  selectedElementId,
  mugConfig,
  onAddElement,
  onUpdateElement,
  onSelectElement,
  onUpdateMugConfig,
  onExportImage,
}: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('text')

  const selectedElement = elements.find(el => el.id === selectedElementId)

  const LayersPanel = () => (
    <div className='p-4 space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Layers className='w-5 h-5' />
        <h3 className='text-lg font-semibold'>Camadas</h3>
      </div>

      <div className='space-y-2'>
        {elements.length === 0 ? (
          <div className='text-center text-gray-500 py-8'>
            <Layers className='w-8 h-8 mx-auto mb-2 text-gray-400' />
            <p>Nenhum elemento adicionado</p>
          </div>
        ) : (
          [...elements]
            .sort((a, b) => b.zIndex - a.zIndex)
            .map((element, index) => (
              <div
                key={element.id}
                onClick={() => onSelectElement(element.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  element.id === selectedElementId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    {element.type === 'text' ? (
                      <Type className='w-4 h-4 text-gray-600' />
                    ) : (
                      <Image className='w-4 h-4 text-gray-600' />
                    )}
                    <span className='text-sm font-medium'>
                      {element.type === 'text'
                        ? (element.data as any).text.substring(0, 20) +
                          ((element.data as any).text.length > 20 ? '...' : '')
                        : `Imagem ${index + 1}`}
                    </span>
                  </div>
                  <div className='text-xs text-gray-500'>
                    z: {element.zIndex}
                  </div>
                </div>

                <div className='mt-2 text-xs text-gray-500'>
                  Posição: {Math.round(element.position.x)},{' '}
                  {Math.round(element.position.y)} | Opacidade:{' '}
                  {Math.round(element.opacity * 100)}%
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )

  const ExportPanel = () => (
    <div className='p-4 space-y-4'>
      <div className='flex items-center gap-2 mb-4'>
        <Download className='w-5 h-5' />
        <h3 className='text-lg font-semibold'>Exportar</h3>
      </div>

      <div className='space-y-4'>
        <button
          onClick={onExportImage}
          className='w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors'>
          Baixar PNG de Alta Resolução
        </button>

        <div className='bg-gray-50 p-3 rounded-lg'>
          <h4 className='font-medium text-sm mb-2'>
            Especificações de Impressão
          </h4>
          <div className='space-y-1 text-sm text-gray-600'>
            <div>Resolução: 300 DPI</div>
            <div>Dimensões: 160x200px (área de impressão)</div>
            <div>Formato: PNG com transparência</div>
            <div>Qualidade: Alta resolução para impressão</div>
          </div>
        </div>

        <div className='bg-yellow-50 border border-yellow-200 p-3 rounded-lg'>
          <h4 className='font-medium text-sm text-yellow-800 mb-1'>
            ⚠️ Dicas de Impressão
          </h4>
          <ul className='text-xs text-yellow-700 space-y-1'>
            <li>• Use papel transfer para sublimação</li>
            <li>• Temperatura: 180°C por 60 segundos</li>
            <li>• Pressione firmemente durante a aplicação</li>
            <li>• Deixe esfriar antes de remover o papel</li>
          </ul>
        </div>

        <div className='text-center'>
          <p className='text-xs text-gray-500'>
            Preview em tempo real disponível no canvas
          </p>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <TextTool
            onAddElement={onAddElement}
            selectedElement={selectedElement}
            onUpdateElement={onUpdateElement}
          />
        )
      case 'image':
        return (
          <ImageTool
            onAddElement={onAddElement}
            selectedElement={selectedElement}
            onUpdateElement={onUpdateElement}
          />
        )
      case 'mug':
        return (
          <MugCustomizer
            mugConfig={mugConfig}
            onUpdateConfig={onUpdateMugConfig}
          />
        )
      case 'layers':
        return <LayersPanel />
      case 'export':
        return <ExportPanel />
      default:
        return null
    }
  }

  return (
    <div className='w-80 bg-white text-background border-l border-gray-200 flex flex-col'>
      {/* Tabs */}
      <div className='border-b border-gray-200'>
        <div className='flex'>
          {TABS.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}>
                <Icon className='w-4 h-4' />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Conteúdo da aba */}
      <div className='flex-1 overflow-y-auto'>{renderTabContent()}</div>
    </div>
  )
}
