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

const ShipstationOrderCard = ({ order, orgOrderCardDisplaySettings }) => {
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

  // Extract Boxify summary if it exists
  const boxifySummary = order?.customerNotes?.match(
    /\[Boxify Packing Summary\](.*?)\[End Packing Summary\]/s
  )?.[1]

  const prettyJSON = JSON.stringify(order, null, 2)
  const prettyJSONwArray = prettyJSON.replace(/}/g, '},\n')

  return (
    <div className="space-y-6 border-sky-100 border-2 border-solid p-2">
      <Card className="">
        <button onClick={() => setIsExpanded(!isExpanded)} className="w-full">
          <CardHeader className="w-full">
            <ShippyCloudSkyBanner>{order.orderNumber}</ShippyCloudSkyBanner>
            <div className="flex justify-between items-center">
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
                {!orgOrderCardDisplaySettings?.showOrderKey ? null : (
                  <TableRow>
                    <TableCell className="font-medium">Order Key</TableCell>
                    <TableCell>{order?.orderKey}</TableCell>
                  </TableRow>
                )}
                {orgOrderCardDisplaySettings?.showCreateDate ||
                orgOrderCardDisplaySettings?.showShipByDate ? (
                  <TableRow>
                    {orgOrderCardDisplaySettings?.showCreateDate ? (
                      <>
                        <TableCell className="font-medium">
                          Create Date
                        </TableCell>
                        <TableCell>{formatDate(order?.createDate)}</TableCell>
                      </>
                    ) : null}
                    {orgOrderCardDisplaySettings?.showShipByDate ? (
                      <>
                        <TableCell className="font-medium">
                          Ship By Date
                        </TableCell>
                        <TableCell>{formatDate(order?.shipByDate)}</TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ) : null}
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

      {isExpanded && orgOrderCardDisplaySettings?.showFinancialDetails ? (
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
      ) : null}

      {isExpanded && orgOrderCardDisplaySettings?.showCustomerInfo ? (
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
      ) : null}

      {isExpanded && order?.items?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              <Badge>
                <Badge>{order?.orderNumber}</Badge>: Items
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full gap-2">
              {order.items.map((item) => (
                <ItemDisplay key={item.itemId} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isExpanded &&
      boxifySummary &&
      orgOrderCardDisplaySettings?.showBoxifySummary ? (
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
      ) : null}

      {isExpanded &&
      order?.tagIds?.length > 0 &&
      orgOrderCardDisplaySettings?.showTags ? (
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
      ) : null}
      {isExpanded && (
        <div className="w-full h-12">
          <div className="flex-grow"></div>
          <button
            onClick={() => {
              updateSidebar(
                'shipstation-event',
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

export default ShipstationOrderCard

const ItemDisplay = ({ item }) => {
  const { updateSidebar } = useSidebarState()
  const prettyJSON = JSON.stringify(item, null, 2)
  const prettyJSONwArray = prettyJSON.replace(/}/g, '},\n')
  return (
    <div className="my-1 items-center justify-center overflow-x-clip border-b-2 border-slate-300 hover:bg-sky-100">
      {/* Column 1 - give nice left margin and align right */}
      <div className="inline-flex text-center px-2 w-[24rem] items-center justify-center">
        <Badge
          className={
            'bg-gradient-to-br from-blue-500 via-sky-600 to-sky-600  items-center justify-center'
          }
        >
          {item.name}
        </Badge>
      </div>

      {/* column 2 - give nice right margin and align left */}
      <div className="inline-flex px-2 overflow-x-clip flex-grow">
        <ItemOptions options={item?.options} />
      </div>

      {/* column 3 - give nice right margin and align left */}
      <div className="inline-flex px-2 overflow-x-clip w-[8rem] items-center justify-center">
        <div className="flex-grow"></div>
        <button
          className="rw-button px-2 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 text-white hover:bg-gradient-to-br hover:from-sky-700 hover:via-sky-700 hover:to-sky-500 hover:text-white rounded-xl"
          onClick={() =>
            updateSidebar(
              'shipstation-event',
              <div className="p-2 whitespace-pre-wrap rounded-[2rem] font-thin font-sans bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 text-blue-900 h-[calc(100vh-10rem)] overflow-scroll">
                {prettyJSONwArray.replace(/\[/g, '\n[')}
              </div>
            )
          }
        >
          <div className="inline-flex w-full items-center justify-center">
            <ExternalLink />
          </div>
        </button>
      </div>
    </div>
  )
}
const ItemOptionRow = ({ option, subtleButtonStyle }) => {
  const [showCopied, handleDoubleClick] = useDoubleClickCopy(option.value)

  return (
    <TableRow className="hover:bg-white/70 transition-colors relative">
      <TableCell className="font-thin text-slate-900 text-justify pr-4 hover:bg-white h-12 max-w-[20rem] hover:z-40 overflow-clip hover:overflow-visible">
        {option.name}
      </TableCell>
      <TableCell className="text-left z-20">
        <div
          onDoubleClick={handleDoubleClick}
          className={`inline-block px-4 py-0.5 rounded-[6px] ${subtleButtonStyle} relative`}
        >
          <span className="z-10">{option.value}</span>
          <CopiedOverlay show={showCopied} />
        </div>
      </TableCell>
    </TableRow>
  )
}

const ItemOptions = ({ options }) => {
  const subtleButtonStyle =
    'bg-gradient-to-br from-blue-50 via-sky-50 to-white hover:bg-gradient-to-br hover:from-sky-50 hover:via-white hover:to-sky-100 text-black font-thin border border-sky-200 shadow-sm shadow-white'

  return (
    <div className="w-full max-h-[300px] overflow-y-auto rounded-lg bg-gradient-to-b from-sky-50 to-white">
      <Table>
        <TableBody>
          {options?.map((option, index) => (
            <ItemOptionRow
              key={index}
              option={option}
              subtleButtonStyle={subtleButtonStyle}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const CopiedOverlay = ({ show }) => {
  return show ? (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-800 via-sky-700 to-gray-500 opacity-50 rounded-[6px]">
      <span className="text-white font-bold">~ C O P I E D</span>
    </div>
  ) : null
}
