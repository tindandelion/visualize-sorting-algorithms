import { SortingSnapshot } from './Sorter'

function swap(array: unknown[], i: number, j: number) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function* selectionSorter<T>(array: T[]): Generator<SortingSnapshot> {
  function* findSmallestIndex(start: number) {
    let cur = start
    for (let j = start + 1; j < array.length; j++) {
      yield {
        data: [...array],
        comparedPair: [cur, j],
        highlightedRange: [0, start - 1],
      } as SortingSnapshot
      if (array[j] < array[cur]) cur = j
    }
    return cur
  }

  for (let i = 0; i < array.length; i++) {
    const minIndex = yield* findSmallestIndex(i)
    swap(array, i, minIndex)
  }
}

export class SelectionSorter {
  private readonly data: number[]
  private readonly generator: Generator<SortingSnapshot>
  private currentResult: IteratorResult<SortingSnapshot>

  constructor(data: number[]) {
    this.data = [...data]
    this.generator = selectionSorter(this.data)
    this.currentResult = this.generator.next()
  }

  step() {
    this.currentResult = this.generator.next()
  }

  takeSnapshot(): SortingSnapshot {
    return this.isFinished ? this.finalSnapshot : this.currentResult.value
  }

  get isFinished() {
    return this.currentResult.done
  }

  private get finalSnapshot() {
    return {
      data: [...this.data],
      comparedPair: [-1, -1],
      highlightedRange: [0, this.data.length - 1],
    }
  }
}
