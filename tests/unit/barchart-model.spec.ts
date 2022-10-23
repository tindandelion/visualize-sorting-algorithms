import { SortingSnapshot } from '@/lib/domain/Sorter'
import { BarchartViewModel } from '@/lib/view-models/BarchartViewModel'

describe('BarchartViewModel', () => {
  const canvasWidth = 30
  const canvasHeight = 100
  const snapshot: SortingSnapshot = {
    data: [0, 0.5, 1],
    currentIndex: 0,
  }

  it('creates a model with bars for each data point', async () => {
    const model = new BarchartViewModel(snapshot, canvasWidth, canvasHeight)
    expect(model.bars).toMatchObject([
      { value: 0 },
      { value: 0.5 },
      { value: 1 },
    ])
  })

  describe('bar horizontal calculations', () => {
    it('calculates the x-position and width of the bars to fit the canvas', () => {
      const model = new BarchartViewModel(snapshot, canvasWidth, canvasHeight)
      expect(model.bars).toMatchObject([
        { x: 0, width: 10 },
        { x: 10, width: 10 },
        { x: 20, width: 10 },
      ])
    })

    it('takes space between bars into account', () => {
      const model = new BarchartViewModel(snapshot, canvasWidth, canvasHeight)
      model.spaceBetweenBars = 2

      expect(model.bars).toMatchObject([
        { x: 1, width: 8 },
        { x: 11, width: 8 },
        { x: 21, width: 8 },
      ])
    })
  })

  describe('bar vertical calculations', () => {
    it('calculates the y-position and heidth of the bars to fit the canvas', () => {
      const model = new BarchartViewModel(snapshot, canvasWidth, canvasHeight)
      expect(model.bars).toMatchObject([
        { y: 100, height: 0 },
        { y: 50, height: 50 },
        { y: 0, height: 100 },
      ])
    })
  })
})
