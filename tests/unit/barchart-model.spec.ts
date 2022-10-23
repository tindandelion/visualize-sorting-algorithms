import { SortingSnapshot } from '@/lib/domain/Sorter'
import { BarchartViewModel } from '@/lib/view-models/BarchartViewModel'

describe('BarchartViewModel', () => {
  it('creates a model', () => {
    const snapshot: SortingSnapshot = {
      data: [0, 0.5, 1],
      currentIndex: 0,
    }
    const model = new BarchartViewModel(snapshot, 10)
    expect(model.bars.length).toEqual(3)
  })

  describe('bar horizontal calculations', () => {
    const canvasWidth = 30
    const snapshot: SortingSnapshot = {
      data: [0, 0.5, 1],
      currentIndex: 0,
    }

    it('calculates the x-position and width of the bars to fit the canvas', () => {
      const model = new BarchartViewModel(snapshot, canvasWidth)
      expect(model.bars).toMatchObject([
        { x: 0, width: 10 },
        { x: 10, width: 10 },
        { x: 20, width: 10 },
      ])
    })

    it('takes space between bars into account', () => {
      const model = new BarchartViewModel(snapshot, canvasWidth)
      model.spaceBetweenBars = 2

      expect(model.bars).toMatchObject([
        { x: 1, width: 8 },
        { x: 11, width: 8 },
        { x: 21, width: 8 },
      ])
    })
  })
})
