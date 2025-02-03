import React, { useState, useEffect, useRef } from 'react'

const VirtualScrolling = ({
  items,
  itemHeight,
  renderItem,
  containerHeight,
  overscan = 5,
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

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              position: 'absolute',
              top: item.virtualIndex * itemHeight,
              height: itemHeight,
              width: '99%',
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VirtualScrolling
