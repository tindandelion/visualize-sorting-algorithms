import { SortingSnapshot } from '../domain/Sorter'

export interface BarchartBar {
  color: string
  x: number
  y: number
  width: number
  height: number
}

interface Size {
  width: number
  height: number
}

export class BarchartCalculator {
  private readonly startHue = 50
  private spaceBetweenBars = 0
  private barWidth = 0

  private readonly maxValue: number
  private readonly heightScaleFactor: number

  constructor(
    private readonly snapshot: SortingSnapshot<number>,
    private readonly canvasSize: Size
  ) {
    this.maxValue = Math.max(...this.snapshot.data)
    this.heightScaleFactor = this.canvasSize.height / this.maxValue
    this.withSpaceBetweenBars(0)
  }

  withSpaceBetweenBars(value: number): this {
    this.spaceBetweenBars = value
    this.barWidth =
      this.canvasSize.width / this.snapshot.data.length - this.spaceBetweenBars
    return this
  }

  calculateBars() {
    return this.snapshot.data.map((value, index) => {
      const barHeight = value * this.heightScaleFactor
      return {
        x: this.calcPosX(index),
        y: this.canvasSize.height - barHeight,
        width: this.barWidth,
        height: barHeight,
        color: this.pickBarColor(value, index),
      }
    })
  }

  private pickBarColor(value: number, index: number) {
    if (this.isBeingCompared(index)) return `hsb(0, 100%, 100%)`

    const hue = (value / this.maxValue) * (255 - this.startHue) + this.startHue
    const saturation = this.isInHighlightedRange(index) ? 100 : 25
    return `hsb(${hue.toFixed(0)}, ${saturation}%, 100%)`
  }

  isInHighlightedRange(index: number) {
    if (!this.snapshot.highlightedRange) return 0
    const [start, end] = this.snapshot.highlightedRange
    return start <= index && end >= index
  }

  isBeingCompared(index: number) {
    return this.snapshot.comparedPair.includes(index)
  }

  private calcPosX(barIndex: number) {
    return (
      this.spaceBetweenBars / 2 +
      barIndex * (this.barWidth + this.spaceBetweenBars)
    )
  }
}
