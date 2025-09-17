import {
  Copy,
  Download,
  FlipHorizontal,
  FolderOpen,
  MoveDown,
  MoveUp,
  Redo,
  RotateCcw,
  Save,
  Trash2,
  Undo,
} from 'lucide-react'
import type { EditorState, MugElement } from './types'

interface ToolbarProps {
  state: EditorState
  selectedElement?: MugElement
  onUndo: () => void
  onRedo: () => void
  onClearAll: () => void
  onSaveProject: () => void
  onLoadProject: () => void
  onExportImage: () => void
  onDuplicateElement: (id: string) => void
  onDeleteElement: (id: string) => void
  onChangeZIndex: (id: string, direction: 'up' | 'down') => void
  onSetViewSide: (side: 'front' | 'back') => void
}

export const Toolbar = ({
  state,
  selectedElement,
  onUndo,
  onRedo,
  onClearAll,
  onSaveProject,
  onLoadProject,
  onExportImage,
  onDuplicateElement,
  onDeleteElement,
  onChangeZIndex,
  onSetViewSide,
}: ToolbarProps) => {
  const canUndo = state.historyIndex > 0
  const canRedo = state.historyIndex < state.history.length - 1

  return (
    <div className='bg-white border-b border-gray-200 p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {/* História */}
          <div className='flex items-center gap-1 border-r border-gray-200 pr-3'>
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-2 rounded ${
                canUndo
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title='Desfazer (Ctrl+Z)'>
              <Undo className='w-4 h-4' />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`p-2 rounded ${
                canRedo
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title='Refazer (Ctrl+Y)'>
              <Redo className='w-4 h-4' />
            </button>
          </div>

          {/* Arquivo */}
          <div className='flex items-center gap-1 border-r border-gray-200 pr-3'>
            <button
              onClick={onSaveProject}
              className='p-2 text-gray-700 hover:bg-gray-100 rounded'
              title='Salvar projeto'>
              <Save className='w-4 h-4' />
            </button>
            <button
              onClick={onLoadProject}
              className='p-2 text-gray-700 hover:bg-gray-100 rounded'
              title='Carregar projeto'>
              <FolderOpen className='w-4 h-4' />
            </button>
            <button
              onClick={onExportImage}
              className='p-2 text-gray-700 hover:bg-gray-100 rounded'
              title='Exportar imagem'>
              <Download className='w-4 h-4' />
            </button>
          </div>

          {/* Ferramentas de elemento */}
          {selectedElement && (
            <div className='flex items-center gap-1 border-r border-gray-200 pr-3'>
              <button
                onClick={() => onDuplicateElement(selectedElement.id)}
                className='p-2 text-gray-700 hover:bg-gray-100 rounded'
                title='Duplicar elemento'>
                <Copy className='w-4 h-4' />
              </button>
              <button
                onClick={() => onDeleteElement(selectedElement.id)}
                className='p-2 text-red-600 hover:bg-red-50 rounded'
                title='Deletar elemento'>
                <Trash2 className='w-4 h-4' />
              </button>
              <button
                onClick={() => onChangeZIndex(selectedElement.id, 'up')}
                className='p-2 text-gray-700 hover:bg-gray-100 rounded'
                title='Trazer para frente'>
                <MoveUp className='w-4 h-4' />
              </button>
              <button
                onClick={() => onChangeZIndex(selectedElement.id, 'down')}
                className='p-2 text-gray-700 hover:bg-gray-100 rounded'
                title='Enviar para trás'>
                <MoveDown className='w-4 h-4' />
              </button>
            </div>
          )}

          {/* Limpar */}
          <button
            onClick={onClearAll}
            className='p-2 text-red-600 hover:bg-red-50 rounded'
            title='Limpar tudo'>
            <RotateCcw className='w-4 h-4' />
          </button>
        </div>

        {/* Visualização */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => onSetViewSide('front')}
              className={`px-3 py-1 text-sm rounded ${
                state.viewSide === 'front'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
              Frente
            </button>
            <button
              onClick={() => onSetViewSide('back')}
              className={`px-3 py-1 text-sm rounded ${
                state.viewSide === 'back'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}>
              Verso
            </button>
          </div>

          <button
            onClick={() =>
              onSetViewSide(state.viewSide === 'front' ? 'back' : 'front')
            }
            className='p-2 text-gray-700 hover:bg-gray-100 rounded'
            title='Alternar vista'>
            <FlipHorizontal className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Informações do elemento selecionado */}
      {selectedElement && (
        <div className='mt-2 pt-2 border-t border-gray-100'>
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <span>
              Elemento selecionado:{' '}
              {selectedElement.type === 'text' ? 'Texto' : 'Imagem'} (ID:{' '}
              {selectedElement.id.split('-')[0]}...)
            </span>
            <span>
              Posição: {Math.round(selectedElement.position.x)},{' '}
              {Math.round(selectedElement.position.y)} | Rotação:{' '}
              {selectedElement.rotation}° | Opacidade:{' '}
              {Math.round(selectedElement.opacity * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
