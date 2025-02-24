import { useState } from 'react'

import { ExternalLink } from 'lucide-react'

import ShippyCloudBanner from 'src/components/shippyUi/ShippyCloudBanner/ShippyCloudBanner'
import ShippyCloudSearchBar from 'src/components/shippyUi/ShippyCloudSearchBar/ShippyCloudSearchBar'
import { Badge } from 'src/components/ui/badge'
import { ShipstationQueries } from 'src/gql/shipstation'
export const QUERY = ShipstationQueries.GET_SHIPSTATION

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ shipders }) => {
  const shipdersData = JSON.parse(shipders?.data)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  return (
    <>
      <ShippyCloudBanner>Tags</ShippyCloudBanner>
      <ShippyCloudSearchBar
        masterData={shipdersData}
        setSearchResults={setSearchResults}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        searchType={'shipstationTags'}
      />
      <ul className="mx-6 lg:mx-24 my-2 py-2 h-[calc(100vh-15rem)] overflow-y-scroll rounded-[3rem]">
        <TagsDisplay tags={searchResults} />
      </ul>
    </>
  )
}

const TagsDisplay = ({ tags }) => {
  return (
    <div className="">
      {tags?.map((tag) => (
        <TagDisplay key={tag.tagId} tag={tag} />
      ))}
    </div>
  )
}

const TagDisplay = ({ tag }) => {
  return (
    <div className="my-1 items-center justify-center overflow-x-clip border-b-2 border-slate-300 h-12 hover:bg-sky-100 inline-flex w-full">
      <div className="inline-flex text-right px-0 w-[10rem] items-center justify-center">
        <Badge
          className={'bg-gradient-to-br from-blue-500 via-sky-600 to-sky-600 '}
        >
          {tag.tagId}
        </Badge>
      </div>
      <div className="inline-flex px-2 overflow-x-clip w-[40rem]">
        {tag.name}
      </div>
      <div className="inline-flex px-2 overflow-x-clip w-[8rem] items-center justify-center">
        {/* <div className="rw-button  bg-gradient-to-br from-sky-500 via-sky-600 to-sky-500 text-white hover:bg-gradient-to-br hover:from-sky-700 hover:via-sky-700 hover:to-sky-500 hover:text-white rounded-xl">
          <ExternalLink className="inline-flex h-6" />
        </div> */}
      </div>
    </div>
  )
}
