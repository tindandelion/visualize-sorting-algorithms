import { SortingSnapshot } from '../Sorter'
import { swap } from './common'

export function* bubblesortSorter<T>(data: T[]): Generator<SortingSnapshot<T>> {
  let n = data.length
  while (true) {
    let swapped = false
    for (let i = 1; i < n; i++) {
      if (data[i - 1] > data[i]) {
        swap(data, i - 1, i)
        swapped = true
      }
      yield {
        data: [...data],
        comparedPair: [i - 1, i],
        highlightedRange: [0, n - 1],
      }
    }
    n--
    if (!swapped) break
  }
}
