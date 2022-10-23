import { SortingSnapshot } from '../domain/Sorter'

function mapWithIndex<T, R>(array: T[], mapFn: (index: number, elem: T) => R) {
  const results = []
  for (let i = 0; i < array.length; i++) {
    results.push(mapFn(i, array[i]))
  }
  return results
}

export interface BarchartBar {
  value: number
  x: number
  y: number
  width: number
  height: number
}

type ForEachBarAction = (index: number, bar: BarchartBar) => void

export class BarchartViewModel {
  public spaceBetweenBars = 0

  constructor(
    private readonly snapshot: SortingSnapshot,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number
  ) {}

  forEachBar(action: ForEachBarAction) {
    mapWithIndex(this.bars, action)
  }

  get bars(): BarchartBar[] {
    const barWidth =
      this.canvasWidth / this.snapshot.data.length - this.spaceBetweenBars

    const maxValue = Math.max(...this.snapshot.data)
    const heightScaleFactor = this.canvasHeight / maxValue

    return mapWithIndex(this.snapshot.data, (i, value) => {
      const barHeight = value * heightScaleFactor
      return {
        value,
        x: this.spaceBetweenBars / 2 + i * (barWidth + this.spaceBetweenBars),
        y: this.canvasHeight - barHeight,
        width: barWidth,
        height: barHeight,
      }
    })
  }
}
