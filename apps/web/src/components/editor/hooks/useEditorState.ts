import { useCallback, useState } from 'react'
import type { EditorState, MugConfig, MugElement } from '../types'

const initialMugConfig: MugConfig = {
  color: '#ffffff',
  type: 'standard',
  size: '325ml',
}

const initialState: EditorState = {
  elements: [],
  selectedElementId: null,
  mugConfig: initialMugConfig,
  viewSide: 'front',
  history: [],
  historyIndex: -1,
}

export const useEditorState = () => {
  const [state, setState] = useState<EditorState>(initialState)

  const saveToHistory = useCallback((newState: EditorState) => {
    const history = newState.history.slice(0, newState.historyIndex + 1)
    history.push({ ...newState })
    return {
      ...newState,
      history,
      historyIndex: history.length - 1,
    }
  }, [])

  const addElement = useCallback(
    (element: MugElement) => {
      setState(prevState => {
        const newState = {
          ...prevState,
          elements: [...prevState.elements, element],
          selectedElementId: element.id,
        }
        return saveToHistory(newState)
      })
    },
    [saveToHistory]
  )

  const updateElement = useCallback(
    (id: string, updates: Partial<MugElement>) => {
      setState(prevState => {
        const newState = {
          ...prevState,
          elements: prevState.elements.map(element =>
            element.id === id ? { ...element, ...updates } : element
          ),
        }
        return saveToHistory(newState)
      })
    },
    [saveToHistory]
  )

  const deleteElement = useCallback(
    (id: string) => {
      setState(prevState => {
        const newState = {
          ...prevState,
          elements: prevState.elements.filter(element => element.id !== id),
          selectedElementId:
            prevState.selectedElementId === id
              ? null
              : prevState.selectedElementId,
        }
        return saveToHistory(newState)
      })
    },
    [saveToHistory]
  )

  const selectElement = useCallback((id: string | null) => {
    setState(prevState => ({
      ...prevState,
      selectedElementId: id,
    }))
  }, [])

  const updateMugConfig = useCallback((config: Partial<MugConfig>) => {
    setState(prevState => ({
      ...prevState,
      mugConfig: { ...prevState.mugConfig, ...config },
    }))
  }, [])

  const setViewSide = useCallback((side: 'front' | 'back') => {
    setState(prevState => ({
      ...prevState,
      viewSide: side,
    }))
  }, [])

  const undo = useCallback(() => {
    setState(prevState => {
      if (prevState.historyIndex > 0) {
        const newIndex = prevState.historyIndex - 1
        const historyState = prevState.history[newIndex]
        return {
          ...historyState,
          history: prevState.history,
          historyIndex: newIndex,
        }
      }
      return prevState
    })
  }, [])

  const redo = useCallback(() => {
    setState(prevState => {
      if (prevState.historyIndex < prevState.history.length - 1) {
        const newIndex = prevState.historyIndex + 1
        return {
          ...prevState.history[newIndex],
          history: prevState.history,
          historyIndex: newIndex,
        }
      }
      return prevState
    })
  }, [])

  const clearAll = useCallback(() => {
    setState(prevState => {
      const newState = {
        ...prevState,
        elements: [],
        selectedElementId: null,
      }
      return saveToHistory(newState)
    })
  }, [saveToHistory])

  const duplicateElement = useCallback(
    (id: string) => {
      setState(prevState => {
        const element = prevState.elements.find(el => el.id === id)
        if (!element) return prevState

        const newElement = {
          ...element,
          id: `${element.id}-copy-${Date.now()}`,
          position: {
            x: element.position.x + 20,
            y: element.position.y + 20,
          },
        }

        const newState = {
          ...prevState,
          elements: [...prevState.elements, newElement],
          selectedElementId: newElement.id,
        }
        return saveToHistory(newState)
      })
    },
    [saveToHistory]
  )

  const changeElementZIndex = useCallback(
    (id: string, direction: 'up' | 'down') => {
      setState(prevState => {
        const elements = [...prevState.elements]
        const elementIndex = elements.findIndex(el => el.id === id)

        if (elementIndex === -1) return prevState

        const element = elements[elementIndex]
        const newZIndex =
          direction === 'up' ? element.zIndex + 1 : element.zIndex - 1

        const newState = {
          ...prevState,
          elements: elements.map(el =>
            el.id === id ? { ...el, zIndex: newZIndex } : el
          ),
        }
        return saveToHistory(newState)
      })
    },
    [saveToHistory]
  )

  return {
    state,
    actions: {
      addElement,
      updateElement,
      deleteElement,
      selectElement,
      updateMugConfig,
      setViewSide,
      undo,
      redo,
      clearAll,
      duplicateElement,
      changeElementZIndex,
    },
  }
}
