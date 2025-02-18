import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'src/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table'

const ShipstationShipmentCard = ({ shipment }) => {
  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Shipment ID</TableCell>
                <TableCell>{shipment?.shipmentId}</TableCell>
                <TableCell className="font-medium">Order Number</TableCell>
                <TableCell>{shipment.orderNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Create Date</TableCell>
                <TableCell>{formatDate(shipment.createDate)}</TableCell>
                <TableCell className="font-medium">Ship Date</TableCell>
                <TableCell>{shipment.shipDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tracking Number</TableCell>
                <TableCell>{shipment.trackingNumber}</TableCell>
                <TableCell className="font-medium">Carrier</TableCell>
                <TableCell>{shipment.carrierCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Service</TableCell>
                <TableCell>{shipment.serviceCode}</TableCell>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>{shipment.voided ? 'Voided' : 'Active'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Shipment Cost</TableCell>
                <TableCell>{formatCurrency(shipment.shipmentCost)}</TableCell>
                <TableCell className="font-medium">Insurance Cost</TableCell>
                <TableCell>{formatCurrency(shipment.insuranceCost)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{shipment.shipTo.name}</TableCell>
                <TableCell className="font-medium">Company</TableCell>
                <TableCell>{shipment.shipTo.company || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell colSpan="3">
                  {shipment.shipTo.street1}
                  {shipment.shipTo.street2 && <br />}
                  {shipment.shipTo.street2}
                  <br />
                  {shipment.shipTo.city}, {shipment.shipTo.state}{' '}
                  {shipment.shipTo.postalCode}
                  <br />
                  {shipment.shipTo.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{shipment.shipTo.phone}</TableCell>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{shipment.customerEmail}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Package Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Weight</TableCell>
                <TableCell>
                  {shipment.weight.value} {shipment.weight.units}
                </TableCell>
                <TableCell className="font-medium">Dimensions</TableCell>
                <TableCell>
                  {shipment.dimensions.length} x {shipment.dimensions.width} x{' '}
                  {shipment.dimensions.height} {shipment.dimensions.units}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Insurance Provider
                </TableCell>
                <TableCell>
                  {shipment.insuranceOptions.provider || 'None'}
                </TableCell>
                <TableCell className="font-medium">Insured Value</TableCell>
                <TableCell>
                  {formatCurrency(shipment.insuranceOptions.insuredValue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShipstationShipmentCard
