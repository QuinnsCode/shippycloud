import { useState, useEffect } from 'react'

import { Search, Settings, X } from 'lucide-react'

import { Form } from '@redwoodjs/forms'

import { useDebounce } from 'src/hooks/useDebouncedValue'

const ShippyCloudSearchBar = ({
  masterData,
  setSearchResults,
  isSearching,
  setIsSearching,
  searchType,
}) => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, 140)

  const shipstationTagsFilter = () => {
    const filteredResults = masterData.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
    )
    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  const shipstationStoresFilter = () => {
    const filteredResults = masterData.filter((store) => {
      if (!store?.storeName) return
      else {
        return store.storeName
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase())
      }
    })
    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  const shipstationOrdersFilter = () => {
    const filteredResults = masterData.filter((order) => {
      if (!order?.orderNumber) return
      else {
        return order.orderNumber
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase())
      }
    })
    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  const shipstationEventsFilter = () => {
    const filteredResults = masterData.filter((event) => {
      if (!event?.resource_type) return
      else {
        return event.resource_type
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase())
      }
    })
    setSearchResults(filteredResults)
    setIsSearching(false)
  }

  const shipstationShipmentsFilter = () => {
    const filteredResults = masterData.filter((shipment) => {
      if (!shipment?.orderNumber) return
      else {
        return shipment.orderNumber
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase())
      }
    })
    setSearchResults(filteredResults)
    setIsSearching(false)
  }
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const filterData = () => {
      if (debouncedSearchText !== '') {
        setIsSearching(true)

        if (searchType === 'shipstationTags') {
          shipstationTagsFilter()
        } else if (searchType === 'shipstationStores') {
          shipstationStoresFilter()
        } else if (searchType === 'shipstationOrders') {
          shipstationOrdersFilter()
        } else if (searchType === 'shipstationEvents') {
          shipstationEventsFilter()
        } else if (searchType === 'shipstationShipments') {
          shipstationShipmentsFilter()
        }
      } else {
        setSearchResults(masterData)
      }
    }

    filterData()
    // Only react to changes in debouncedSearchText
  }, [debouncedSearchText])

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleSettingsClick = (e) => {
    e.preventDefault()
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <>
      <div className="h-[2rem] w-full items-center justify-center inline-flex">
        <Form
          onSubmit={(e) => e.preventDefault()}
          onReset={(e) => {
            e.preventDefault()
            setSearchText('')
            document.getElementById('shippyCloudSearchBar').focus()
          }}
          className="items-center justify-center inline-flex border-2 border-slate-300 rounded-xl px-4 py-2 bg-sky-200"
        >
          <input
            id="shippyCloudSearchBar"
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search..."
            className="pl-3 py-0.5 text-lg shadow-sm shadow-slate-700"
          />
          <button type="submit" className="mx-1">
            <Search />
          </button>
          <button type="reset">
            <X />
          </button>
          <button
            onClick={handleSettingsClick}
            className={`mx-1 ${isSettingsOpen ? 'z-30 animate-spin duration-[30s] ' : ''}`}
          >
            <Settings />
          </button>
        </Form>

        {isSearching && (
          <p>
            <div className="">Searching...</div>
          </p>
        )}
      </div>

      {isSettingsOpen ? (
        <div className="absolute top-[1rem] z-20 w-full h-[80vh]  opacity-[.95]">
          <div className="px-2 py-6 bg-gray-100 rounded-md w-full h-full">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                {/* TODO: make this a dropdown */}
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="list-goes-top-to-bottom"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="list-goes-top-to-bottom"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    List goes top to bottom
                  </label>
                </div>
                <div className="inline-flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="add-new-to-top"
                    className="h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-500"
                  />
                  <label
                    htmlFor="add-new-to-top"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Add new to top
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ShippyCloudSearchBar
