import { SortingSnapshot } from '../Sorter'
import { swap } from './common'

export function* bubblesortSorter<T>(data: T[]): Generator<SortingSnapshot<T>> {
  for (let n = data.length; n > 0; n--) {
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
    if (!swapped) break
  }
}
