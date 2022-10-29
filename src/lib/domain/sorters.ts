import { NumberSorter } from './NumberSorter'
import { quicksortSorter } from './sorting-algorithms/quicksort'
import { selectionSorter } from './sorting-algorithms/selection-sort'

export class SelectionSorter extends NumberSorter {
  constructor(data: number[]) {
    super(data, selectionSorter)
  }
}

export class QuicksortSorter extends NumberSorter {
  constructor(data: number[]) {
    super(data, quicksortSorter)
  }
}
