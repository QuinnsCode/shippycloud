import React, { useState, useEffect, useRef } from 'react'

import HoverExpand from 'src/components/HoverExpand/HoverExpand'
const VirtualScrolling = ({
  items,
  setItems,
  itemHeight,
  renderItem,
  containerHeight,
  overscan = 0,
  renderedTopToBottom = true,
  addNewToTop = true,
  scrollToTop = false, // New prop to signal scrolling to top
  containerRef,
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const prevItemsLengthRef = useRef(items.length)

  const visibleItemCount = Math.ceil(containerHeight / itemHeight)
  const totalHeight = items.length * itemHeight

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      if (scrollToTop) {
        container.scrollTop = 0
        setScrollTop(0)
      } else if (addNewToTop) {
        const newItemsCount = items.length - prevItemsLengthRef.current
        container.scrollTop += newItemsCount * itemHeight
        setScrollTop(container.scrollTop)
      }
    }
    prevItemsLengthRef.current = items.length
  }, [items.length, addNewToTop, itemHeight, scrollToTop, containerRef])

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  let startIndex, endIndex
  startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  endIndex = Math.min(
    items.length - 1,
    startIndex + visibleItemCount + 2 * overscan
  )

  const visibleItems = items
    .slice(startIndex, endIndex + 1)
    .map((item, index) => ({
      ...item,
      virtualIndex: startIndex + index,
    }))

  const renderItemWithHover = (item) => {
    const originalContent = renderItem(item)

    // Wrap the content with HoverExpand
    return (
      <HoverExpand
        enabled={item?.enabled || false}
        containerRef={containerRef}
        content={<HoverItemContent item={item} />}
      >
        {originalContent}
      </HoverExpand>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems?.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              position: 'absolute',
              top: item.virtualIndex * itemHeight,
              height: itemHeight,
              width: '99%',
              marginLeft: '1px',
            }}
          >
            {renderItemWithHover(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

const HoverItemContent = ({ item }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg">{item.event}</h3>
      <div className="text-sm">
        <p>
          <span className="font-semibold">Source:</span> {item.source}
        </p>
        <p>
          <span className="font-semibold">Payload:</span>
        </p>
        <pre className="bg-gray-900 text-white p-2 rounded mt-1 overflow-x-auto">
          {JSON.stringify(item.payload, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default VirtualScrolling
