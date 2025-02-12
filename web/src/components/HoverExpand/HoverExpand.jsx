import React, { useState, useRef, useEffect } from 'react'

import { createPortal } from 'react-dom'

const HoverExpand = ({ children, content, containerRef, enabled }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)

  useEffect(() => {
    const updatePosition = () => {
      if (triggerRef.current && isHovered) {
        const trigger = triggerRef.current.getBoundingClientRect()
        const container = containerRef.current.getBoundingClientRect()

        setPosition({
          top: trigger.top - container.top + containerRef.current.scrollTop,
          left: trigger.right - container.left + 10, // 10px offset from trigger
        })
      }
    }

    updatePosition()

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', updatePosition)
      window.addEventListener('resize', updatePosition)

      return () => {
        containerRef.current?.removeEventListener('scroll', updatePosition)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [isHovered, containerRef])

  const HoverContent = () => {
    if (!isHovered || !enabled) return null

    return createPortal(
      <div
        className="fixed bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 z-50"
        style={{
          top: `${position.top + 220}px`,
          left: `${position.left * 0.2}px`,
          maxWidth: '80vw',
          height: '',
          transform: 'translateY(-50%)',
        }}
      >
        {content}
      </div>,
      document.body
    )
  }

  return (
    <div
      ref={triggerRef}
      className="inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <HoverContent />
    </div>
  )
}

export default HoverExpand
