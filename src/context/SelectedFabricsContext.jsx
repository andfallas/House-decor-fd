import { createContext, useContext, useState, useEffect } from 'react'

const SelectedFabricsContext = createContext(null)

export function SelectedFabricsProvider({ children }) {
  const [selectedFabrics, setSelectedFabrics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hd-selected-fabrics')) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('hd-selected-fabrics', JSON.stringify(selectedFabrics))
  }, [selectedFabrics])

  function setFabric(productId, fabric) {
    setSelectedFabrics(prev => ({ ...prev, [productId]: fabric }))
  }

  function clearFabric(productId) {
    setSelectedFabrics(prev => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  function getFabric(productId) {
    return selectedFabrics[productId] ?? null
  }

  return (
    <SelectedFabricsContext.Provider value={{ getFabric, setFabric, clearFabric }}>
      {children}
    </SelectedFabricsContext.Provider>
  )
}

export function useSelectedFabrics() {
  return useContext(SelectedFabricsContext)
}
