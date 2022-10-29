import { IndexPair, SortingSnapshot } from '../Sorter'
import { swap } from './common'

export function* selectionSorter<T>(array: T[]): Generator<SortingSnapshot<T>> {
  function* findSmallestIndex(start: number) {
    let cur = start
    for (let j = start + 1; j < array.length; j++) {
      yield {
        data: [...array],
        comparedPair: [cur, j] as IndexPair,
        highlightedRange: [0, start - 1] as IndexPair,
      }
      if (array[j] < array[cur]) cur = j
    }
    return cur
  }

  for (let i = 0; i < array.length; i++) {
    const minIndex = yield* findSmallestIndex(i)
    swap(array, i, minIndex)
  }
}
