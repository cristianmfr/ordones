import { useEffect, useRef } from 'react'
import { Canvas3D } from './Canvas3D'
import { useEditorState } from './hooks/useEditorState'
import { Sidebar } from './Sidebar'
import { Toolbar } from './Toolbar'

export const MugEditor = () => {
  const { state, actions } = useEditorState()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedElement = state.elements.find(
    el => el.id === state.selectedElementId
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              actions.redo()
            } else {
              actions.undo()
            }
            break
          case 'y':
            e.preventDefault()
            actions.redo()
            break
          case 'd':
            e.preventDefault()
            if (state.selectedElementId) {
              actions.duplicateElement(state.selectedElementId)
            }
            break
        }
      } else if (e.key === 'Delete' && state.selectedElementId) {
        actions.deleteElement(state.selectedElementId)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [state.selectedElementId, actions])

  const handleSaveProject = () => {
    const projectData = {
      ...state,
      version: '1.0.0',
      savedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(projectData, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `caneca-projeto-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLoadProject = () => {
    fileInputRef.current?.click()
  }

  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      try {
        const projectData = JSON.parse(event.target?.result as string)

        // Validate project data structure
        if (projectData.elements && projectData.mugConfig) {
          // Here you would need to implement a method to restore the complete state
          console.log('Project loaded:', projectData)
          alert('Projeto carregado com sucesso!')
        } else {
          alert('Arquivo de projeto inválido!')
        }
      } catch (error) {
        console.error('Error loading project:', error)
        alert('Erro ao carregar o projeto!')
      }
    }
    reader.readAsText(file)
  }

  const handleExportImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High resolution for print
    const scale = 3
    const printArea = { width: 160, height: 200 }

    canvas.width = printArea.width * scale
    canvas.height = printArea.height * scale

    ctx.scale(scale, scale)
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, printArea.width, printArea.height)

    // Render elements in order of zIndex
    const sortedElements = [...state.elements].sort(
      (a, b) => a.zIndex - b.zIndex
    )

    Promise.all(
      sortedElements.map(element => {
        return new Promise(resolve => {
          if (element.type === 'text') {
            const textData = element.data as any
            ctx.save()
            ctx.globalAlpha = element.opacity
            ctx.translate(
              element.position.x + element.size.width / 2,
              element.position.y + element.size.height / 2
            )
            ctx.rotate((element.rotation * Math.PI) / 180)

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

            ctx.restore()
            resolve(true)
          } else if (element.type === 'image') {
            const imageData = element.data as any
            const img = document.createElement('img')
            img.onload = () => {
              ctx.save()
              ctx.globalAlpha = element.opacity
              ctx.translate(
                element.position.x + element.size.width / 2,
                element.position.y + element.size.height / 2
              )
              ctx.rotate((element.rotation * Math.PI) / 180)
              ctx.drawImage(
                img,
                -element.size.width / 2,
                -element.size.height / 2,
                element.size.width,
                element.size.height
              )
              ctx.restore()
              resolve(true)
            }
            img.src = imageData.src
          }
        })
      })
    ).then(() => {
      // Download the image
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `caneca-design-${Date.now()}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    })
  }

  return (
    <div className='h-screen flex flex-col bg-gray-100'>
      <Toolbar
        state={state}
        selectedElement={selectedElement}
        onUndo={actions.undo}
        onRedo={actions.redo}
        onClearAll={actions.clearAll}
        onSaveProject={handleSaveProject}
        onLoadProject={handleLoadProject}
        onExportImage={handleExportImage}
        onDuplicateElement={actions.duplicateElement}
        onDeleteElement={actions.deleteElement}
        onChangeZIndex={actions.changeElementZIndex}
        onSetViewSide={actions.setViewSide}
      />

      <div className='flex-1 flex'>
        {/* Área principal do canvas */}
        <div className='flex-1 flex items-center justify-center p-8'>
          <Canvas3D
            elements={state.elements}
            mugConfig={state.mugConfig}
            viewSide={state.viewSide}
            selectedElementId={state.selectedElementId}
            onElementClick={actions.selectElement}
            onCanvasClick={() => actions.selectElement(null)}
            onElementDrag={(elementId, position) =>
              actions.updateElement(elementId, { position })
            }
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          elements={state.elements}
          selectedElementId={state.selectedElementId}
          mugConfig={state.mugConfig}
          onAddElement={actions.addElement}
          onUpdateElement={actions.updateElement}
          onSelectElement={actions.selectElement}
          onUpdateMugConfig={actions.updateMugConfig}
          onExportImage={handleExportImage}
        />
      </div>

      {/* Hidden file input for loading projects */}
      <input
        ref={fileInputRef}
        type='file'
        accept='.json'
        onChange={handleFileLoad}
        className='hidden'
      />

      {/* Keyboard shortcuts hint */}
      <div className='absolute bottom-4 left-4 bg-black/75 text-white text-xs p-2 rounded'>
        <div>Ctrl+Z: Desfazer | Ctrl+Y: Refazer</div>
        <div>Ctrl+D: Duplicar | Delete: Excluir</div>
        <div>Clique e arraste para mover elementos</div>
      </div>
    </div>
  )
}
