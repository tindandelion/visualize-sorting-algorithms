export class SelectionSorter {
  private _currentIndex: number = 0
  constructor(readonly data: number[]) {}

  step() {
    const smallestIndex = this.findNextSmallestIndex()
    this.swapCurrentElement(smallestIndex)
    this._currentIndex++
  }

  get currentIndex() {
    return this._currentIndex
  }

  get isFinished() {
    return this._currentIndex >= this.data.length
  }

  private findNextSmallestIndex() {
    let smallestIndex = this._currentIndex
    for (let i = this._currentIndex + 1; i < this.data.length; i++) {
      if (this.data[i] < this.data[smallestIndex]) {
        smallestIndex = i
      }
    }
    return smallestIndex
  }

  private swapCurrentElement(otherIndex: number) {
    const temp = this.data[this.currentIndex]
    this.data[this._currentIndex] = this.data[otherIndex]
    this.data[otherIndex] = temp
  }
}
