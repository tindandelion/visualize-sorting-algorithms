import { SortingSnapshot } from './Sorter'

type SorterFactory = (data: number[]) => Generator<SortingSnapshot<number>>

export class NumberSorter {
  private readonly data: number[]
  private readonly generator: Generator<SortingSnapshot<number>>
  private currentResult: IteratorResult<SortingSnapshot<number>>

  constructor(data: number[], factory: SorterFactory) {
    this.data = [...data]
    this.generator = factory(this.data)
    this.currentResult = this.generator.next()
  }

  step() {
    this.currentResult = this.generator.next()
  }

  takeSnapshot(): SortingSnapshot<number> {
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
