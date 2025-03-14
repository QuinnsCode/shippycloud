/**
 * Example Usage:
 *
 * import { useEscapeKey } from 'app/hooks/useEscapeKey';
 *
 * const myComponent = () => {
 *   const handleClose = () => { console.log('close'); };
 *   useEscapeKey(handleClose);
 *
 *   return <button onClick={handleClose}>Press ESC to close</button>
 * }
 */

import { useCallback, useEffect } from 'react'

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'

export function useEscapeKey(handleClose) {
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey])
}
