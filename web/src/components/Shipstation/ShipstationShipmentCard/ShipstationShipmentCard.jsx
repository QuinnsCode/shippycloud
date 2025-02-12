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

const ShipstationShipmentCard = ({ data }) => {
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
                <TableCell>{data.shipmentId}</TableCell>
                <TableCell className="font-medium">Order Number</TableCell>
                <TableCell>{data.orderNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Create Date</TableCell>
                <TableCell>{formatDate(data.createDate)}</TableCell>
                <TableCell className="font-medium">Ship Date</TableCell>
                <TableCell>{data.shipDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tracking Number</TableCell>
                <TableCell>{data.trackingNumber}</TableCell>
                <TableCell className="font-medium">Carrier</TableCell>
                <TableCell>{data.carrierCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Service</TableCell>
                <TableCell>{data.serviceCode}</TableCell>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>{data.voided ? 'Voided' : 'Active'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Shipment Cost</TableCell>
                <TableCell>{formatCurrency(data.shipmentCost)}</TableCell>
                <TableCell className="font-medium">Insurance Cost</TableCell>
                <TableCell>{formatCurrency(data.insuranceCost)}</TableCell>
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
                <TableCell>{data.shipTo.name}</TableCell>
                <TableCell className="font-medium">Company</TableCell>
                <TableCell>{data.shipTo.company || 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell colSpan="3">
                  {data.shipTo.street1}
                  {data.shipTo.street2 && <br />}
                  {data.shipTo.street2}
                  <br />
                  {data.shipTo.city}, {data.shipTo.state}{' '}
                  {data.shipTo.postalCode}
                  <br />
                  {data.shipTo.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell>{data.shipTo.phone}</TableCell>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell>{data.customerEmail}</TableCell>
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
                  {data.weight.value} {data.weight.units}
                </TableCell>
                <TableCell className="font-medium">Dimensions</TableCell>
                <TableCell>
                  {data.dimensions.length} x {data.dimensions.width} x{' '}
                  {data.dimensions.height} {data.dimensions.units}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Insurance Provider
                </TableCell>
                <TableCell>
                  {data.insuranceOptions.provider || 'None'}
                </TableCell>
                <TableCell className="font-medium">Insured Value</TableCell>
                <TableCell>
                  {formatCurrency(data.insuranceOptions.insuredValue)}
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
