import { useState } from 'react'

import ShippyCloudSkyBanner from 'src/components/shippyUi/ShippyCloudSkyBanner/ShippyCloudSkyBanner'
import { Badge } from 'src/components/ui/badge'
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

const ShipstationOrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false)
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

  const formatCurrency = (value) => {
    if (value == null) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  // Extract Boxify summary if it exists
  const boxifySummary = order?.customerNotes?.match(
    /\[Boxify Packing Summary\](.*?)\[End Packing Summary\]/s
  )?.[1]

  return (
    <div className="space-y-6 border-sky-100 border-2 border-solid p-2">
      <Card className="">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          <CardHeader className="w-full">
            <ShippyCloudSkyBanner>{order.orderNumber}</ShippyCloudSkyBanner>
            <div className="flex justify-between items-center">
              <CardTitle>Order Information</CardTitle>
              <div className="flex-grow px-2"></div>
              {order?.orderStatus && (
                <Badge variant="secondary">
                  {order.orderStatus.replace(/_/g, ' ').toUpperCase()}
                </Badge>
              )}
            </div>
          </CardHeader>
        </button>
        {isExpanded && (
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Order Number</TableCell>
                  <TableCell>{order?.orderNumber}</TableCell>
                  <TableCell className="font-medium">Order Key</TableCell>
                  <TableCell>{order?.orderKey}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Create Date</TableCell>
                  <TableCell>{formatDate(order?.createDate)}</TableCell>
                  <TableCell className="font-medium">Ship By Date</TableCell>
                  <TableCell>{formatDate(order?.shipByDate)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Service</TableCell>
                  <TableCell>
                    {order?.serviceCode?.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell className="font-medium">Carrier</TableCell>
                  <TableCell>
                    {order?.carrierCode?.replace(/_/g, ' ')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      {isExpanded && (
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Order Total</TableCell>
                  <TableCell>{formatCurrency(order?.orderTotal)}</TableCell>
                  <TableCell className="font-medium">Amount Paid</TableCell>
                  <TableCell>{formatCurrency(order?.amountPaid)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Shipping Amount</TableCell>
                  <TableCell>{formatCurrency(order?.shippingAmount)}</TableCell>
                  <TableCell className="font-medium">Tax Amount</TableCell>
                  <TableCell>{formatCurrency(order?.taxAmount)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isExpanded && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{order?.shipTo?.name}</TableCell>
                  <TableCell className="font-medium">Company</TableCell>
                  <TableCell>{order?.shipTo?.company || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell colSpan="3">
                    {order?.shipTo?.street1}
                    {order?.shipTo?.street2 && <br />}
                    {order?.shipTo?.street2}
                    <br />
                    {order?.shipTo?.city}, {order?.shipTo?.state}{' '}
                    {order?.shipTo?.postalCode}
                    <br />
                    {order?.shipTo?.country}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>{order?.shipTo?.phone || 'N/A'}</TableCell>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{order?.customerEmail || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isExpanded && boxifySummary && (
        <Card>
          <CardHeader>
            <CardTitle>Boxify Packing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
              {boxifySummary.trim()}
            </pre>
          </CardContent>
        </Card>
      )}

      {isExpanded && order?.tagIds?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {order.tagIds.map((tagId) => (
                <Badge key={tagId} variant="outline">
                  {tagId}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ShipstationOrderCard
