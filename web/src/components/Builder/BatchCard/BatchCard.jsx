import React, { useState } from 'react'

import { ExternalLink, Package, Clock } from 'lucide-react'

import BatchItemsDisplay from 'src/components/Builder/BatchItemsDisplay/BatchItemsDisplay'
import ShippyCloudSkyBanner from 'src/components/shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'
import { Badge } from 'src/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from 'src/components/ui/table'

const BatchCard = ({
  batch,
  isSelected,
  onSelect,
  onDelete,
  onRemoveItem,
  orderCardDisplaySettings,
}) => {
  const [isExpanded, setIsExpanded] = useState(isSelected)

  // Handle clicking the card
  const handleClick = () => {
    setIsExpanded(!isExpanded)
    onSelect()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Count orders and shipments
  const orders = batch.items.filter((item) => item.type === 'order').length
  const shipments = batch.items.filter(
    (item) => item.type === 'shipment'
  ).length

  return (
    <div className="space-y-6 border-sky-100 border-2 border-solid p-2">
      <Card className={isSelected ? 'border-sky-500' : ''}>
        <button onClick={handleClick} className="w-full">
          <CardHeader className="w-full">
            <ShippyCloudSkyBanner>{batch.name}</ShippyCloudSkyBanner>
            <div className="flex justify-between items-center">
              <div className="flex-grow px-2"></div>
              <div className="flex space-x-2">
                {orders > 0 && (
                  <Badge variant="secondary">
                    {orders} ORDER{orders !== 1 ? 'S' : ''}
                  </Badge>
                )}
                {shipments > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-sky-100 text-sky-800 border-sky-300"
                  >
                    {shipments} SHIPMENT{shipments !== 1 ? 'S' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </button>

        {isExpanded && (
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Batch ID</TableCell>
                  <TableCell>{batch.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Created</TableCell>
                  <TableCell>{formatDate(batch.createdAt)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      {/* Display batch items using the BatchItemsDisplay component */}
      {isExpanded && (
        <>
          <BatchItemsDisplay
            batch={batch}
            onRemoveItem={onRemoveItem}
            orgOrderCardDisplaySettings={orderCardDisplaySettings}
          />

          <div className="w-full h-12">
            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(batch.id)
                }}
                className="rw-button bg-gradient-to-br text-white from-red-500 via-red-600 to-red-500 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-700 hover:to-red-700 focus:bg-white shadow-md shadow-slate-400 inline-flex rounded-xl w-[15rem] mx-0.5 items-center justify-center"
              >
                Delete Batch
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BatchCard
