import { useRef, useState } from 'react'

import { ExternalLink } from 'lucide-react'

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
import useDoubleClickCopy from 'src/hooks/useDoubleClickCopy'
import { useSidebarState } from 'src/hooks/useSidebarState'

const productCardDisplaySettings = {
  showProductDetails: true,
  showDimensions: true,
  showShippingDefaults: true,
  showInternationalDefaults: true,
  showCustomsInfo: true,
  showTags: true,
}

const ShipstationProductCard = ({
  product,
  orgProductCardDisplaySettings = productCardDisplaySettings,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { updateSidebar } = useSidebarState()

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

  // Style for null/undefined values
  const emptyValueStyle = 'text-slate-400 italic font-thin text-sm'

  // Helper function to display values with proper formatting for nulls
  const displayValue = (value, formatter = null) => {
    if (value === null || value === undefined) {
      return <span className={emptyValueStyle}>Not specified</span>
    }
    return formatter ? formatter(value) : value
  }

  const prettyJSON = JSON.stringify(product, null, 2)
  const prettyJSONwArray = prettyJSON.replace(/}/g, '},\n')

  return (
    <div className="space-y-6 border-sky-100 border-2 border-solid p-2">
      <Card className="">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          <CardHeader className="w-full">
            <ShippyCloudSkyBanner>
              {product?.name || 'Unnamed Product'}
            </ShippyCloudSkyBanner>
            <div className="flex justify-between items-center">
              <div className="flex-grow px-2">
                <span className="font-medium text-slate-700">
                  SKU:{' '}
                  {product?.sku || (
                    <span className={emptyValueStyle}>No SKU</span>
                  )}
                </span>
                {product?.fulfillmentSku && (
                  <span className="ml-4 text-slate-600">
                    Fulfillment SKU: {product.fulfillmentSku}
                  </span>
                )}
                {product?.aliases && (
                  <span className="ml-4 text-slate-600">
                    Aliases: {product.aliases}
                  </span>
                )}
              </div>
              <Badge
                variant="secondary"
                className={product?.active ? 'bg-green-100' : 'bg-red-100'}
              >
                {product?.active ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
            </div>
          </CardHeader>
        </button>
        {isExpanded && (
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Product ID</TableCell>
                  <TableCell>{displayValue(product?.productId)}</TableCell>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell>
                    {displayValue(product?.price, formatCurrency)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Created</TableCell>
                  <TableCell>
                    {displayValue(product?.createDate, formatDate)}
                  </TableCell>
                  <TableCell className="font-medium">Modified</TableCell>
                  <TableCell>
                    {displayValue(product?.modifyDate, formatDate)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Category</TableCell>
                  <TableCell>
                    {displayValue(product?.productCategory?.name)}
                  </TableCell>
                  <TableCell className="font-medium">Product Type</TableCell>
                  <TableCell>{displayValue(product?.productType)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location</TableCell>
                  <TableCell>
                    {displayValue(product?.warehouseLocation)}
                  </TableCell>
                  <TableCell className="font-medium">Default Cost</TableCell>
                  <TableCell>
                    {displayValue(product?.defaultCost, formatCurrency)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Internal Notes</TableCell>
                  <TableCell colSpan="3">
                    {displayValue(product?.internalNotes)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      {isExpanded && orgProductCardDisplaySettings?.showDimensions && (
        <Card>
          <CardHeader>
            <CardTitle>Dimensions & Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Dimensions</TableCell>
                  <TableCell>
                    {product?.length !== undefined &&
                    product?.width !== undefined &&
                    product?.height !== undefined ? (
                      `${product.length} × ${product.width} × ${product.height} inches`
                    ) : (
                      <span className={emptyValueStyle}>
                        Dimensions not specified
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">Weight</TableCell>
                  <TableCell>
                    {product?.weightOz !== undefined ? (
                      `${product.weightOz} oz`
                    ) : (
                      <span className={emptyValueStyle}>
                        Weight not specified
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isExpanded && orgProductCardDisplaySettings?.showShippingDefaults && (
        <Card>
          <CardHeader>
            <CardTitle>Shipping Defaults</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Carrier</TableCell>
                  <TableCell>
                    {product?.defaultCarrierCode ? (
                      product.defaultCarrierCode.replace(/_/g, ' ')
                    ) : (
                      <span className={emptyValueStyle}>Not specified</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">Service</TableCell>
                  <TableCell>
                    {product?.defaultServiceCode ? (
                      product.defaultServiceCode.replace(/_/g, ' ')
                    ) : (
                      <span className={emptyValueStyle}>Not specified</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Package</TableCell>
                  <TableCell>
                    {product?.defaultPackageCode ? (
                      product.defaultPackageCode.replace(/_/g, ' ')
                    ) : (
                      <span className={emptyValueStyle}>Not specified</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">Confirmation</TableCell>
                  <TableCell>
                    {product?.defaultConfirmation ? (
                      product.defaultConfirmation.replace(/_/g, ' ')
                    ) : (
                      <span className={emptyValueStyle}>Not specified</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isExpanded &&
        orgProductCardDisplaySettings?.showInternationalDefaults && (
          <Card>
            <CardHeader>
              <CardTitle>International Shipping Defaults</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Int'l Carrier</TableCell>
                    <TableCell>
                      {product.defaultIntlCarrierCode?.replace(/_/g, ' ') ||
                        'N/A'}
                    </TableCell>
                    <TableCell className="font-medium">Int'l Service</TableCell>
                    <TableCell>
                      {product.defaultIntlServiceCode?.replace(/_/g, ' ') ||
                        'N/A'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Int'l Package</TableCell>
                    <TableCell>
                      {product.defaultIntlPackageCode?.replace(/_/g, ' ') ||
                        'N/A'}
                    </TableCell>
                    <TableCell className="font-medium">
                      Int'l Confirmation
                    </TableCell>
                    <TableCell>
                      {product.defaultIntlConfirmation?.replace(/_/g, ' ') ||
                        'N/A'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

      {isExpanded && orgProductCardDisplaySettings?.showCustomsInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Customs Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Customs Description
                  </TableCell>
                  <TableCell>{product.customsDescription || 'N/A'}</TableCell>
                  <TableCell className="font-medium">Customs Value</TableCell>
                  <TableCell>
                    {product.customsValue
                      ? formatCurrency(product.customsValue)
                      : 'N/A'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tariff Number</TableCell>
                  <TableCell>{product.customsTariffNo || 'N/A'}</TableCell>
                  <TableCell className="font-medium">
                    Country of Origin
                  </TableCell>
                  <TableCell>{product.customsCountryCode || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {isExpanded &&
        product.tags &&
        product.tags.length > 0 &&
        orgProductCardDisplaySettings?.showTags && (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag.tagId} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      {isExpanded && (
        <div className="w-full h-12">
          <div className="flex-grow"></div>
          <button
            onClick={() => {
              updateSidebar(
                'shipstation-product',
                <div className="px-2 whitespace-pre-wrap rounded-[2rem] font-thin font-sans bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 text-blue-900 h-[calc(100vh-10rem)] overflow-scroll">
                  {prettyJSONwArray.replace(/\[/g, '\n[')}
                </div>
              )
            }}
            className="rw-button bg-gradient-to-br text-white from-blue-500 via-sky-500 to-sky-600 hover:bg-gradient-to-br hover:from-blue-500 hover:via-sky-700 hover:to-sky-700 focus:bg-white shadow-md shadow-slate-400 inline-flex rounded-xl w-[15rem] mx-0.5"
          >
            <ExternalLink className="inline-flex h-6" />
            Open sidebar
          </button>
        </div>
      )}
    </div>
  )
}

export default ShipstationProductCard

const CopiedOverlay = ({ show }) => {
  return show ? (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-800 via-sky-700 to-gray-500 opacity-50 rounded-[6px]">
      <span className="text-white font-bold">~ C O P I E D</span>
    </div>
  ) : null
}
