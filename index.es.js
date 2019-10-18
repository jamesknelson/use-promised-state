import { useState, useRef, useEffect, useCallback } from 'react'

// Like `useState()`, but allows you to set state a single time
// after the component has unmounted without complaining.
export default function usePromisedState(initial) {
  let [state, setState] = useState(initial)
  let counterRef = useRef(-1)
  useEffect(() => () => counterRef.current = 0, [])
  let silentState =
    useCallback(nextState => {
      if (counterRef.current !== 0) {
        setState(nextState)
      }
      if (counterRef.current > -1) {
        counterRef.current++
      }
    }, [setState])
  return [state, silentState]
}