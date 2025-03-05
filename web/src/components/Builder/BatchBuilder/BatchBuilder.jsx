import { useState } from 'react'

import { Plus, Loader2 } from 'lucide-react'

import BatchCard from 'src/components/Builder/BatchCard/BatchCard'
import ShipderList from 'src/components/Builder/ShipderList/ShipderList'
import { Alert, AlertDescription } from 'src/components/ui/alert'
import { Badge } from 'src/components/ui/badge'
import { Button } from 'src/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'
import { Input } from 'src/components/ui/input'
import { useBatchManager } from 'src/hooks/useBatchManager'

const BatchBuilder = () => {
  const {
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
    clearError,
  } = useBatchManager()

  const [isCreatingBatch, setIsCreatingBatch] = useState(false)
  const [newBatchName, setNewBatchName] = useState('')

  // Display settings for ShipstationOrderCard
  const orderCardDisplaySettings = {
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

  // Handle creating a new batch
  const handleCreateBatch = () => {
    if (isCreatingBatch) {
      const batchName = newBatchName.trim() || `Batch #${batches.length + 1}`
      createBatch({ name: batchName })
      setNewBatchName('')
      setIsCreatingBatch(false)
    } else {
      setIsCreatingBatch(true)
    }
  }

  // Handle adding items to the selected batch
  // This now automatically detects if it's a shipment or order
  const handleAddItem = (item) => {
    if (!selectedBatchId) {
      alert('Please select a batch first')
      return
    }
    addItemToBatch(selectedBatchId, item)
  }

  // Handle removing an item from a batch
  const handleRemoveItem = (batchId, itemId) => {
    removeItemFromBatch(batchId, itemId)
  }

  // Handle deleting a batch
  const handleDeleteBatch = (batchId) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      deleteBatch(batchId)
    }
  }

  // Handle batch selection
  const handleBatchSelect = (batchId) => {
    selectBatch(batchId === selectedBatchId ? null : batchId)
  }

  return (
    <div className="h-full w-full space-y-6">
      {/* Batch management header */}
      <Card className="border-sky-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                ShipStation Batch Manager
              </span>
              {stats?.totalBatches > 0 && (
                <Badge variant="outline" className="ml-3">
                  {stats.totalBatches} Batch
                  {stats.totalBatches !== 1 ? 'es' : ''}
                </Badge>
              )}
              {stats?.totalItems > 0 && (
                <Badge variant="outline" className="ml-2">
                  {stats.totalItems} Item{stats.totalItems !== 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
            <Button
              onClick={handleCreateBatch}
              className="rw-button text-white bg-gradient-to-br from-blue-500 via-sky-500 to-sky-600 hover:bg-gradient-to-br hover:from-blue-500 hover:via-sky-700 hover:to-sky-700 items-center justify-center"
            >
              {isCreatingBatch ? (
                'Save Batch'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Batch
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* New batch form */}
          {isCreatingBatch && (
            <div className="mb-4">
              <Input
                type="text"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                placeholder="Enter batch name"
                className="border-sky-200 focus:border-sky-500"
              />
            </div>
          )}

          {/* Error message display */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error}
                <Button
                  variant="link"
                  className="ml-2 p-0 h-auto text-red-700"
                  onClick={clearError}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-sky-500" />
            </div>
          )}

          {/* No batches message */}
          {!loading && batches.length === 0 && (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-sky-200 rounded-lg">
              <p className="mb-2">No batches created yet.</p>
              <p>
                Create your first batch to start organizing shipments and
                orders.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch list */}
      <div className="grid grid-cols-1 gap-6">
        {batches.map((batch) => (
          <BatchCard
            key={batch.id}
            batch={batch}
            isSelected={selectedBatchId === batch.id}
            onSelect={() => handleBatchSelect(batch.id)}
            onDelete={handleDeleteBatch}
            onRemoveItem={handleRemoveItem}
            orderCardDisplaySettings={orderCardDisplaySettings}
          />
        ))}
      </div>

      {/* Shipment/Order List */}
      <div className="items-center justify-center border-t-2 border-sky-100 pt-6">
        <Card className="border-sky-200">
          <CardHeader>
            <CardTitle>
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Add Items to{' '}
                {selectedBatchId
                  ? `Batch: "${batches.find((b) => b.id === selectedBatchId)?.name}"`
                  : 'Batch'}
              </span>
              {!selectedBatchId && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-300"
                >
                  Select a batch first
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ShipderList
              onAddItem={handleAddItem}
              selectedBatchId={selectedBatchId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BatchBuilder
