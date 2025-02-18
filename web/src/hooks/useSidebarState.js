// src/hooks/useSidebarState.js
import { useState, useCallback, useEffect } from 'react'

let globalSidebarState = {
  type: null,
  content: null,
  isOpen: false,
}
let listeners = new Set()

const notifyListeners = (newState) => {
  listeners.forEach((listener) => listener(newState))
}

export const useSidebarState = () => {
  const [sidebarState, setSidebarState] = useState(globalSidebarState)

  useEffect(() => {
    const listener = (newState) => {
      setSidebarState(newState)
    }
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const updateSidebar = useCallback((type, content) => {
    globalSidebarState = {
      ...globalSidebarState,
      type,
      content,
      isOpen: false, // Open the sidebar whenever new content is set
    }
    notifyListeners(globalSidebarState)
  }, [])

  const clearSidebarContent = useCallback(() => {
    globalSidebarState = {
      type: null,
      content: null,
      isOpen: true, // Close the sidebar when cleared
    }
    notifyListeners(globalSidebarState)
  }, [])

  const toggleSidebar = useCallback(() => {
    globalSidebarState = {
      ...globalSidebarState,
      isOpen: !globalSidebarState.isOpen,
    }
    notifyListeners(globalSidebarState)
  }, [])

  const setSidebar = useCallback((value) => {
    globalSidebarState = {
      ...globalSidebarState,
      isOpen: value,
    }
    notifyListeners(globalSidebarState)
  }, [])

  return {
    sidebarType: sidebarState.type,
    sidebarContent: sidebarState.content,
    isOpen: sidebarState.isOpen,
    updateSidebar,
    setSidebar,
    clearSidebarContent,
    toggleSidebar,
  }
}
