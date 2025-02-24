import { useEffect, useState, useCallback } from 'react'

const useDoubleClickCopy = (value) => {
  const [showCopied, setShowCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }, [value])

  const handleDoubleClick = useCallback(() => {
    handleCopy()
  }, [handleCopy])

  return [showCopied, handleDoubleClick]
}

export default useDoubleClickCopy
