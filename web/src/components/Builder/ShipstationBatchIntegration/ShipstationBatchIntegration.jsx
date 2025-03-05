import React from 'react'

import { Plus } from 'lucide-react'

import { Button } from 'src/components/ui/button'
import { Tooltip } from 'src/components/ui/tooltip'

/**
 * Component to add a ShipStation order or shipment to a batch
 * Automatically detects item type based on properties
 */
const ShipstationBatchIntegration = ({
  item,
  onAddToBatch,
  selectedBatchId,
  batches = [],
}) => {
  // Automatically detect if it's a shipment or an order
  const itemType = detectItemType(item)

  // If there's no selected batch, we need to show that
  const selectedBatch = batches.find((b) => b.id === selectedBatchId)

  // Get item ID based on type
  const itemId = getItemId(item, itemType)

  // Check if this item is already in the selected batch
  const isInSelectedBatch =
    selectedBatchId &&
    selectedBatch?.items.some(
      (batchItem) => batchItem.id === itemId && batchItem.type === itemType
    )

  // Check which batches this item is in
  const containingBatches = batches.filter((batch) =>
    batch.items.some(
      (batchItem) => batchItem.id === itemId && batchItem.type === itemType
    )
  )

  const handleAddToBatch = (e) => {
    e.stopPropagation() // Prevent card expansion if inside a clickable card

    // Create the item object from the ShipStation order/shipment
    const batchItem = {
      id: itemId,
      name: getItemName(item, itemType),
      originalItem: item,
      type: itemType,
    }

    onAddToBatch(batchItem)
  }

  return (
    <div className="inline-flex items-center">
      {selectedBatchId ? (
        <Tooltip
          message={
            isInSelectedBatch
              ? `Already in batch: ${selectedBatch?.name}`
              : `Add to batch: ${selectedBatch?.name}`
          }
        >
          <Button
            onClick={handleAddToBatch}
            disabled={isInSelectedBatch}
            size="sm"
            className={
              isInSelectedBatch
                ? 'bg-green-100 text-green-800 hover:bg-green-100 cursor-default'
                : 'bg-gradient-to-br from-blue-500 via-sky-500 to-sky-600 hover:bg-gradient-to-br hover:from-blue-600 hover:via-sky-600 hover:to-sky-700'
            }
          >
            {isInSelectedBatch ? (
              'Added to Batch ✓'
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" /> Add to Batch
              </>
            )}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip message="Select a batch first">
          <Button
            disabled={true}
            size="sm"
            variant="outline"
            className="border-sky-200 text-gray-400"
          >
            <Plus className="h-4 w-4 mr-1" /> Select Batch First
          </Button>
        </Tooltip>
      )}

      {/* Show which batches contain this item */}
      {containingBatches.length > 0 && (
        <div className="ml-2 text-xs text-gray-500">
          In: {containingBatches.map((b) => b.name).join(', ')}
        </div>
      )}
    </div>
  )
}

/**
 * Detect if the item is a shipment or order based on its properties
 * @param {Object} item - The ShipStation item
 * @returns {string} 'shipment' or 'order'
 */
function detectItemType(item) {
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
 * Get the appropriate ID for the item based on its type
 * @param {Object} item - The ShipStation item
 * @param {string} itemType - 'shipment' or 'order'
 * @returns {string} The item ID
 */
function getItemId(item, itemType) {
  if (itemType === 'shipment') {
    return item.shipmentId || `shipment-${Date.now()}`
  } else {
    return item.orderKey || item.orderNumber || `order-${Date.now()}`
  }
}

/**
 * Get a display name for the item based on its type
 * @param {Object} item - The ShipStation item
 * @param {string} itemType - 'shipment' or 'order'
 * @returns {string} The item display name
 */
function getItemName(item, itemType) {
  if (itemType === 'shipment') {
    return `Shipment #${item.shipmentId || 'New'}`
  } else {
    return `Order #${item.orderNumber || 'New'}`
  }
}

export default ShipstationBatchIntegration
