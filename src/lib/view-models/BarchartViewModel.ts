import { SortingSnapshot } from '../domain/Sorter'

function mapWithIndex<T, R>(array: T[], mapFn: (index: number, elem: T) => R) {
  const results = []
  for (let i = 0; i < array.length; i++) {
    results.push(mapFn(i, array[i]))
  }
  return results
}

export interface BarchartBar {
  x: number
  width: number
}

export class BarchartViewModel {
  public spaceBetweenBars = 0

  constructor(
    private readonly snapshot: SortingSnapshot,
    private readonly canvasWidth: number
  ) {}

  get bars(): BarchartBar[] {
    const barWidth =
      this.canvasWidth / this.snapshot.data.length - this.spaceBetweenBars
    return mapWithIndex(this.snapshot.data, (i, el) => ({
      x: this.spaceBetweenBars / 2 + i * (barWidth + this.spaceBetweenBars),
      width: barWidth,
    }))
  }
}
