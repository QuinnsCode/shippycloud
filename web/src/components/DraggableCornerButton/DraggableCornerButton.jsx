import React, { useState, useEffect, useRef } from 'react'

import { ChevronDownIcon, ChevronUpIcon, X } from 'lucide-react'

import ShippyCloudLogo from '../shippyUi/ShippyCloudLogo/ShippyCloudLogo'
const DraggableCornerButton2 = ({
  children,
  position: externalPosition,
  onPositionChange,
  defaultPosition = { x: 0, y: 0 },
}) => {
  //
  // Corner positions and snap threshold
  const SNAP_THRESHOLD = 24
  const val = 64
  const corners = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: window.innerWidth - val, y: 0 },
    bottomLeft: { x: 0, y: window.innerHeight - val },
    bottomRight: { x: window.innerWidth - val, y: window.innerHeight - val },
  }
  //
  const buttonRef = useRef(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  //

  const [position, setPosition] = useState(externalPosition || defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  //

  // Update internal position when external position changes
  useEffect(() => {
    if (externalPosition && !isDragging) {
      setPosition(externalPosition)
    }
  }, [externalPosition, isDragging])

  // Update corner positions on window resize
  useEffect(() => {
    const handleResize = (e) => {
      corners.topRight.x = window.innerWidth - val
      corners.bottomLeft.y = window.innerHeight - val
      corners.bottomRight.x = window.innerWidth - val
      corners.bottomRight.y = window.innerHeight - val

      // Ensure button stays within bounds after resize
      snapToNearestCorner(e.clientX, e.clientY)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [position])

  // Find nearest corner based on current position
  const findNearestCorner = (x, y) => {
    let nearestCorner = null
    let minDistance = Infinity

    Object.entries(corners).forEach(([key, corner]) => {
      const distance = Math.sqrt(
        Math.pow(x - corner.x, 2) + Math.pow(y - corner.y, 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        nearestCorner = corner
      }
    })

    return { corner: nearestCorner, distance: minDistance }
  }

  // Snap to nearest corner if within threshold
  const snapToNearestCorner = (x, y) => {
    const { corner, distance } = findNearestCorner(x, y)
    // console.log('snapToNearestCorner', { x }, { y }, { corner })
    const newPosition = { x, y }
    setPosition(newPosition)
    onPositionChange?.(newPosition)
  }

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    const rect = buttonRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: e.clientX - 0.1 * rect.left,
      y: e.clientY - 0.1 * rect.top,
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    // console.log('handleMouseMove', e.clientX, e.clientY)
    const newX = e.clientX - dragOffset.current.x
    const newY = e.clientY - dragOffset.current.y

    // Constrain to window bounds
    const x = Math.max(0, Math.min(window.innerWidth - val, newX))
    const y = Math.max(0, Math.min(window.innerHeight - val, newY))

    setPosition({ x: e.clientX - val, y: e.clientY - val })
    onPositionChange?.({ x, y })
  }

  const handleMouseUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    const { x, y } = position
    snapToNearestCorner({ x: x, y: y })
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true)
    const touch = e.touches[0]
    const rect = buttonRef.current.getBoundingClientRect()
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    const newX = touch.clientX - dragOffset.current.x
    const newY = touch.clientY - dragOffset.current.y

    // Constrain to window bounds
    const x = Math.max(0, Math.min(window.innerWidth - val, newX))
    const y = Math.max(0, Math.min(window.innerHeight - val, newY))

    setPosition({ x, y })
    onPositionChange?.({ x, y })
  }

  const findPanelPosition = () => {
    return position.x < window.innerWidth / 2 ? 'left-0' : 'right-0'
  }

  const handleTouchEnd = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    // snapToNearestCorner(position.x, position.y)
    snapToNearestCorner(e.clientX, e.clientY)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
  }
  return (
    <>
      <div
        ref={buttonRef}
        className={`fixed z-30 w-32 h-16 rounded-[36px] mb-4 bg-blue-500 text-whit border-[5px] border-white shadow-lg cursor-move transition-shadow ${isDragging ? 'shadow-xl' : ''} active:shadow-sm active:scale-95 inline-flex items-center justify-center`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          touchAction: 'none',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <ShippyCloudLogo />

        <button
          onClick={togglePanel}
          className="inline-flex items-center justify-center space-x-2 text-white"
        >
          {isPanelOpen ? (
            <ChevronDownIcon className="animate-bounce text-white mr-3" />
          ) : (
            <ChevronUpIcon className="text-white mr-3" />
          )}
        </button>
        {children}
      </div>

      {/* CLOSE THE PANEL WHEN dragging */}
      {isPanelOpen && !isDragging && (
        <div
          className={`fixed top-0 ${findPanelPosition()} opacity-[.92] h-[calc(100vh)] w-[calc(100vw-6rem)] z-20 bg-white shadow-md`}
        >
          {/* The contents of your panel go here */}
          <button
            onClick={togglePanel}
            className="absolute top-4 right-0 m-2 text-red-500"
          >
            <X />
          </button>
        </div>
      )}
    </>
  )
}

const DraggableCornerButton = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  return (
    <DraggableCornerButton2
      buttonPosition={buttonPosition}
      onButtonPositionChange={setButtonPosition}
    />
  )
}

export default DraggableCornerButton
