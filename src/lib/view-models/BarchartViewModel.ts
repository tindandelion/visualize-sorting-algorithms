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

export class BarchartViewModel {
  public spaceBetweenBars = 0

  private readonly maxValue: number
  private readonly heightScaleFactor: number

  constructor(
    private readonly snapshot: SortingSnapshot,
    private readonly canvasSize: Size
  ) {
    this.maxValue = Math.max(...this.snapshot.data)
    this.heightScaleFactor = this.canvasSize.height / this.maxValue
  }

  get bars(): BarchartBar[] {
    const barWidth = this.calcBarWidth()
    return this.snapshot.data.map((value, index) => {
      const barHeight = value * this.heightScaleFactor
      return {
        x: this.calcPosX(index, barWidth),
        y: this.canvasSize.height - barHeight,
        width: barWidth,
        height: barHeight,
        color: this.pickBarColor(value, index),
      }
    })
  }

  private calcBarWidth() {
    return (
      this.canvasSize.width / this.snapshot.data.length - this.spaceBetweenBars
    )
  }

  private pickBarColor(value: number, index: number) {
    const hue = (value / this.maxValue) * 255
    const brightness = index < this.snapshot.currentIndex ? 100 : 50
    return `hsb(${hue.toFixed(0)}, 100%, ${brightness}%)`
  }

  private calcPosX(barIndex: number, barWidth: number) {
    return (
      this.spaceBetweenBars / 2 + barIndex * (barWidth + this.spaceBetweenBars)
    )
  }
}
