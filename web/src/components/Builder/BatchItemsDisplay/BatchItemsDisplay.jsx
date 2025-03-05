import React from 'react'

import { Cross } from 'lucide-react'

import ShipstationOrderCard from 'src/components/Shipstation/ShipstationOrderCard/ShipstationOrderCard'
import { Badge } from 'src/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'

/**
 * Component to display batch items using the existing ShipstationOrderCard
 */
const BatchItemsDisplay = ({
  batch,
  onRemoveItem,
  orgOrderCardDisplaySettings = {},
}) => {
  // Default display settings if none provided
  const defaultSettings = {
    showCustomerInfo: false,
    showOrderKey: false,
    showCreateDate: false,
    showShipByDate: true,
    showFinancialDetails: false,
    showService: true,
    showCarrier: true,
    showTags: false,
    showItems: true,
    showBoxifySummary: false,
  }

  const displaySettings = { ...defaultSettings, ...orgOrderCardDisplaySettings }

  // If we have an empty batch
  if (!batch?.items || batch.items.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500 border border-dashed border-gray-300 rounded-lg">
        <p>No items in this batch yet</p>
      </div>
    )
  }

  // Group items by type
  const orders = batch.items.filter((item) => item.type === 'order')
  const shipments = batch.items.filter((item) => item.type === 'shipment')

  return (
    <div className="space-y-6">
      {/* Orders Section */}
      {orders.length > 0 && (
        <Card className="border-sky-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                <Badge variant="secondary" className="mr-2">
                  {orders.length}
                </Badge>
                Orders
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((item) => (
                <div key={item.id} className="relative">
                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(batch.id, item.id)}
                    className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove from batch"
                  >
                    <Cross className="h-4 w-4" />
                  </button>

                  {/* Render using the original item */}
                  <ShipstationOrderCard
                    order={item.originalItem}
                    orgOrderCardDisplaySettings={displaySettings}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipments Section */}
      {shipments.length > 0 && (
        <Card className="border-sky-200">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>
                <Badge variant="secondary" className="mr-2">
                  {shipments.length}
                </Badge>
                Shipments
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipments.map((item) => (
                <div key={item.id} className="relative">
                  {/* Remove button */}
                  <button
                    onClick={() => onRemoveItem(batch.id, item.id)}
                    className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Remove from batch"
                  >
                    <Cross className="h-4 w-4" />
                  </button>

                  {/* For shipments, use ShipstationOrderCard but modify the props */}
                  <ShipstationOrderCard
                    order={convertShipmentToOrderFormat(item.originalItem)}
                    orgOrderCardDisplaySettings={displaySettings}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/**
 * Helper function to convert a shipment object to a format compatible with ShipstationOrderCard
 * @param {Object} shipment - The ShipStation shipment object
 * @returns {Object} A format compatible with ShipstationOrderCard
 */
function convertShipmentToOrderFormat(shipment) {
  return {
    // Use shipment properties for order-compatible display
    orderNumber: `Shipment #${shipment.shipmentId || 'Unknown'}`,
    orderStatus: shipment.shipmentStatus || 'unknown',
    createDate: shipment.createDate || shipment.shipDate,
    shipByDate: shipment.shipDate,
    serviceCode: shipment.serviceCode,
    carrierCode: shipment.carrierCode,
    orderTotal: shipment.shipmentCost,

    // If shipment has items, convert them to order items format
    items:
      shipment.shipmentItems?.map((item) => ({
        itemId: item.lineItemKey || `item-${Date.now()}`,
        name: item.name || 'Shipment Item',
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        options: item.options || [],
      })) || [],

    // Add the original shipment data too
    originalShipment: shipment,
  }
}

export default BatchItemsDisplay
