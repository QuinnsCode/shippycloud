import { useState, useCallback, useEffect } from 'react'

/**
 * Custom hook to manage ShipStation batches, shipments, and orders
 * @returns {Object} Batch management methods and state
 */
export function useBatchManager() {
  // State for storing all batches
  const [batches, setBatches] = useState([])
  // State for tracking the currently selected/open batch
  const [selectedBatchId, setSelectedBatchId] = useState(null)
  // Loading state for async operations
  const [loading, setLoading] = useState(false)
  // Error state
  const [error, setError] = useState(null)
  // Stats for the batches
  const [stats, setStats] = useState({
    totalBatches: 0,
    totalItems: 0,
    itemsByType: {
      shipment: 0,
      order: 0,
    },
  })

  /**
   * Create a new batch
   * @param {Object} batchData - Initial batch data
   * @returns {string} The ID of the newly created batch
   */
  const createBatch = useCallback(
    (batchData = {}) => {
      const newBatch = {
        id: `batch-${Date.now()}`, // Generate a unique ID
        name: batchData.name || `Batch #${batches.length + 1}`,
        createdAt: new Date().toISOString(),
        items: [], // Will contain shipments or orders
        ...batchData,
      }

      setBatches((prevBatches) => [...prevBatches, newBatch])
      return newBatch.id
    },
    [batches.length]
  )

  /**
   * Add a shipment or order to a batch
   * @param {string} batchId - The ID of the batch to add to
   * @param {Object} item - The shipment or order to add
   * @param {string} itemType - Either 'shipment' or 'order' (optional, will auto-detect)
   * @returns {boolean} Success status
   */
  const addItemToBatch = useCallback((batchId, item, itemType) => {
    if (!item || !batchId) {
      setError('Missing required batch ID or item data')
      return false
    }

    // Auto-detect the item type if not provided
    const detectedType = itemType || detectItemType(item)

    setBatches((prevBatches) =>
      prevBatches.map((batch) => {
        if (batch.id === batchId) {
          // Check if item already exists in batch
          const itemExists = batch.items.some(
            (existingItem) =>
              existingItem.id === item.id && existingItem.type === detectedType
          )

          if (itemExists) {
            setError(`This ${detectedType} is already in the batch`)
            return batch
          }

          return {
            ...batch,
            items: [
              ...batch.items,
              {
                ...item,
                type: detectedType,
                addedAt: new Date().toISOString(),
              },
            ],
          }
        }
        return batch
      })
    )

    return true
  }, [])

  /**
   * Detect if the item is a shipment or order based on its properties
   * @param {Object} item - The ShipStation item
   * @returns {string} 'shipment' or 'order'
   */
  const detectItemType = (item) => {
    // Check for shipment properties
    if (
      item.shipmentId ||
      item.shipmentItems ||
      item.shipmentCost !== undefined ||
      (Array.isArray(item.shipments) && item.shipments.length > 0)
    ) {
      return 'shipment'
    }

    // Check for order properties
    if (
      item.orderNumber ||
      item.items ||
      item.orderKey ||
      (Array.isArray(item.orders) && item.orders.length > 0)
    ) {
      return 'order'
    }

    // Default to order if we can't determine
    return 'order'
  }

  /**
   * Remove an item from a batch
   * @param {string} batchId - The ID of the batch
   * @param {string} itemId - The ID of the item to remove
   * @returns {boolean} Success status
   */
  const removeItemFromBatch = useCallback((batchId, itemId) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) => {
        if (batch.id === batchId) {
          return {
            ...batch,
            items: batch.items.filter((item) => item.id !== itemId),
          }
        }
        return batch
      })
    )

    return true
  }, [])

  /**
   * Delete an entire batch
   * @param {string} batchId - The ID of the batch to delete
   */
  const deleteBatch = useCallback(
    (batchId) => {
      setBatches((prevBatches) =>
        prevBatches.filter((batch) => batch.id !== batchId)
      )
      if (selectedBatchId === batchId) {
        setSelectedBatchId(null)
      }
    },
    [selectedBatchId]
  )

  /**
   * Select a batch to view/edit
   * @param {string} batchId - The ID of the batch to select
   */
  const selectBatch = useCallback((batchId) => {
    setSelectedBatchId(batchId)
  }, [])

  /**
   * Get the currently selected batch
   * @returns {Object|null} The selected batch or null
   */
  const getSelectedBatch = useCallback(() => {
    return batches.find((batch) => batch.id === selectedBatchId) || null
  }, [batches, selectedBatchId])

  /**
   * Get all items in a specific batch
   * @param {string} batchId - The ID of the batch
   * @returns {Array} Array of items in the batch
   */
  const getBatchItems = useCallback(
    (batchId) => {
      const batch = batches.find((b) => b.id === batchId)
      return batch ? batch.items : []
    },
    [batches]
  )

  /**
   * Update batch information
   * @param {string} batchId - The ID of the batch to update
   * @param {Object} updates - The properties to update
   */
  const updateBatch = useCallback((batchId, updates) => {
    setBatches((prevBatches) =>
      prevBatches.map((batch) => {
        if (batch.id === batchId) {
          return { ...batch, ...updates }
        }
        return batch
      })
    )
  }, [])

  /**
   * Clear any error messages
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load batches from localStorage on initial mount
  useEffect(() => {
    try {
      const savedBatches = localStorage.getItem('shipstation-batches')
      if (savedBatches) {
        setBatches(JSON.parse(savedBatches))
      }
    } catch (err) {
      console.error('Error loading batches from localStorage:', err)
    }
  }, [])

  // Update stats whenever batches change
  useEffect(() => {
    const totalItems = batches.reduce(
      (total, batch) => total + batch.items.length,
      0
    )
    const shipments = batches.reduce((count, batch) => {
      return (
        count + batch.items.filter((item) => item.type === 'shipment').length
      )
    }, 0)
    const orders = batches.reduce((count, batch) => {
      return count + batch.items.filter((item) => item.type === 'order').length
    }, 0)

    setStats({
      totalBatches: batches.length,
      totalItems,
      itemsByType: {
        shipment: shipments,
        order: orders,
      },
    })
  }, [batches])

  // Save batches to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('shipstation-batches', JSON.stringify(batches))
    } catch (err) {
      console.error('Error saving batches to localStorage:', err)
    }
  }, [batches])

  /**
   * Search for items across all batches
   * @param {string} searchTerm - The term to search for
   * @returns {Array} Matching items with their batch information
   */
  const searchItems = useCallback(
    (searchTerm) => {
      if (!searchTerm) return []

      const searchLower = searchTerm.toLowerCase()
      const results = []

      batches.forEach((batch) => {
        batch.items.forEach((item) => {
          // If the item name or ID includes the search term
          if (
            (item.name && item.name.toLowerCase().includes(searchLower)) ||
            (item.id && item.id.toLowerCase().includes(searchLower))
          ) {
            results.push({
              ...item,
              batchId: batch.id,
              batchName: batch.name,
            })
          }
        })
      })

      return results
    },
    [batches]
  )

  /**
   * Export batches to a JSON file for backup
   */
  const exportBatches = useCallback(() => {
    const dataStr = JSON.stringify(batches, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `shipstation-batches-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }, [batches])

  /**
   * Import batches from a JSON file
   * @param {File} file - The JSON file to import
   * @returns {Promise<boolean>} Success status
   */
  const importBatches = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const importedBatches = JSON.parse(e.target.result)

          if (!Array.isArray(importedBatches)) {
            setError('Invalid batch data format')
            reject(new Error('Invalid batch data format'))
            return
          }

          setBatches(importedBatches)
          resolve(true)
        } catch (err) {
          setError('Failed to parse batch data')
          reject(err)
        }
      }

      reader.onerror = () => {
        setError('Failed to read file')
        reject(new Error('Failed to read file'))
      }

      reader.readAsText(file)
    })
  }, [])

  return {
    batches,
    selectedBatchId,
    loading,
    error,
    stats,
    createBatch,
    addItemToBatch,
    removeItemFromBatch,
    deleteBatch,
    selectBatch,
    getSelectedBatch,
    getBatchItems,
    updateBatch,
    clearError,
    searchItems,
    exportBatches,
    importBatches,
  }
}
