import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import { deepEqual } from '../lib/helpers'

function deepCompareSignal(deps: DependencyList) {
  const depsRef = useRef<DependencyList>()
  const signal = useRef<number>(0)

  if (!deepEqual(deps, depsRef.current)) {
    depsRef.current = deps
    signal.current += 1
  }
  return [signal.current]
}

export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList
) {
  return useEffect(callback, deepCompareSignal(dependencies))
}
