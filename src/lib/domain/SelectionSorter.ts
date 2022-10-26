import { SortingSnapshot } from './Sorter'

function swap<T>(array: T[], i: number, j: number) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

export class IterationContext<T> {
  constructor(readonly array: T[], readonly startIndex: number) {}

  nextIteration() {
    return new IterationContext(this.array, this.startIndex + 1)
  }
}

export class ComparisonStep<T> {
  static startIteration<T>(context: IterationContext<T>): ComparisonStep<T> {
    return new ComparisonStep(
      context,
      context.startIndex,
      context.startIndex + 1
    )
  }
  constructor(
    readonly context: IterationContext<T>,
    readonly accum: number,
    readonly current: number
  ) {}

  get isEvaluable() {
    return this.current <= this.context.array.length
  }

  eval(): ComparisonStep<T> {
    if (this.current === this.context.array.length) {
      return this.startNewIteration()
    } else return this.continueComparing()
  }

  private compare() {
    return this.context.array[this.current] < this.context.array[this.accum]
  }

  private startNewIteration() {
    swap(this.context.array, this.accum, this.context.startIndex)
    return ComparisonStep.startIteration(this.context.nextIteration())
  }

  private continueComparing() {
    return new ComparisonStep(
      this.context,
      this.compare() ? this.current : this.accum,
      this.current + 1
    )
  }
}

export class SelectionSorter {
  private currentStep: ComparisonStep<number>
  constructor(readonly data: number[]) {
    this.currentStep = ComparisonStep.startIteration(
      new IterationContext(data, 0)
    )
  }

  step() {
    this.currentStep = this.currentStep.eval()
  }

  takeSnapshot(): SortingSnapshot {
    return {
      data: [...this.data],
      comparedPair: [this.currentStep.accum, this.currentStep.current],
      currentIndex: this.currentStep.context.startIndex,
    }
  }

  get isFinished() {
    return !this.currentStep.isEvaluable
  }
}
