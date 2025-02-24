import { ExternalLink } from 'lucide-react'

import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'
import { Badge } from 'src/components/ui/badge'
import { ShipstationQueries } from 'src/gql/shipstation'
import { useSidebarState } from 'src/hooks/useSidebarState'
export const QUERY = ShipstationQueries.GET_SHIPSTATION

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ shipders }) => {
  const shipdersData = JSON.parse(shipders?.data)
  const { products } = shipdersData

  return (
    <>
      <ShippyCloudBanner>Products</ShippyCloudBanner>
      <ul className="mx-24 my-2 py-2 h-[calc(100vh-15rem)] overflow-y-scroll rounded-xl">
        {products && <ProductsDisplay products={products} />}
      </ul>
    </>
  )
}

const ProductsDisplay = ({ products }) => {
  return (
    <div className="">
      {products?.map((product) => (
        <ProductDisplay key={product.productId} product={product} />
      ))}
    </div>
  )
}

const ProductDisplay = ({ product }) => {
  const { updateSidebar } = useSidebarState()
  const prettyJSON = JSON.stringify(product, null, 2)
  const prettyJSONwArray = prettyJSON.replace(/}/g, '},\n')
  return (
    <div className="my-1 items-center justify-center overflow-x-clip border-b-2 border-slate-300 h-12 hover:bg-sky-100">
      <div className="inline-flex text-right px-2 w-[10rem] items-center justify-center">
        <Badge
          className={'bg-gradient-to-br from-blue-500 via-sky-600 to-sky-600 '}
        >
          {product.productId}
        </Badge>
      </div>
      <div className="inline-flex px-2 overflow-x-clip w-[40rem]">
        {product.name}
      </div>
      <div className="inline-flex px-2 overflow-x-clip w-[8rem] items-center justify-center">
        <button
          className="rw-button  bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 text-white hover:bg-gradient-to-br hover:from-sky-700 hover:via-sky-700 hover:to-sky-500 hover:text-white rounded-xl"
          onClick={() =>
            updateSidebar(
              'shipstation-event',
              <div className="p-2 whitespace-pre-wrap rounded-[2rem] font-thin font-sans bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 text-blue-900 h-[calc(100vh-10rem)] overflow-scroll">
                {prettyJSONwArray.replace(/\[/g, '\n[')}
              </div>
            )
          }
        >
          <ExternalLink className="inline-flex h-6" />
        </button>
      </div>
    </div>
  )
}
