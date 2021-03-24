import { RefObject, useEffect } from 'react'

function useOutsideAlerter(
  ref: RefObject<any>,
  onClick: (e: MouseEvent) => void
) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      onClick(event)
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('scroll', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleClickOutside)
    }
  }, [handleClickOutside])
}

export default useOutsideAlerter
