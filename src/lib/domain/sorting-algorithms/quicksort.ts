import { Index, SortingSnapshot } from '../Sorter'
import { swap } from './common'

export function* partition<T>(
  data: T[],
  start: Index,
  end: Index
): Generator<SortingSnapshot<T>> {
  function* compare(k: Index, l: Index): Generator<SortingSnapshot<T>> {
    yield {
      data: [...data],
      comparedPair: [k, l],
      highlightedRange: [start, end],
    }
    return data[k] < data[l]
  }

  let i = start + 1
  let j = end
  while (true) {
    while ((yield* compare(i, start)) && i < end) i++
    while ((yield* compare(start, j)) && j > start) j--
    if (i >= j) break
    swap(data, i, j)
  }
  swap(data, start, j)
  return j
}

export function* quicksort<T>(
  data: T[],
  start: Index,
  end: Index
): Generator<SortingSnapshot<T>> {
  if (end <= start) return
  const i = yield* partition(data, start, end)
  yield* quicksort(data, start, i - 1)
  yield* quicksort(data, i + 1, end)
}

export function* quicksortSorter<T>(data: T[]) {
  yield* quicksort(data, 0, data.length - 1)
}
