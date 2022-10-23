import { BarchartCalculator } from '@/lib/view-models/BarchartCalculator'

describe('BarchartViewModel', () => {
  const canvasSize = { width: 30, height: 100 }
  const snapshot = {
    data: [0, 0.5, 1],
    currentIndex: 3,
  }

  let model: BarchartCalculator

  beforeEach(() => {
    model = new BarchartCalculator(snapshot, canvasSize)
  })

  describe('bar horizontal calculations', () => {
    it('calculates the x-position and width of the bars to fit the canvas', () => {
      expect(model.calculateBars()).toMatchObject([
        { x: 0, width: 10 },
        { x: 10, width: 10 },
        { x: 20, width: 10 },
      ])
    })

    it('takes space between bars into account', () => {
      model.withSpaceBetweenBars(2)

      expect(model.calculateBars()).toMatchObject([
        { x: 1, width: 8 },
        { x: 11, width: 8 },
        { x: 21, width: 8 },
      ])
    })
  })

  describe('bar vertical calculations', () => {
    it('calculates the y-position and heidth of the bars to fit the canvas', () => {
      expect(model.calculateBars()).toMatchObject([
        { y: 100, height: 0 },
        { y: 50, height: 50 },
        { y: 0, height: 100 },
      ])
    })
  })

  describe('barchart coloration', () => {
    it('calculates hue from the value', async () => {
      expect(model.calculateBars()).toMatchObject([
        { color: 'hsb(0, 100%, 100%)' },
        { color: 'hsb(128, 100%, 100%)' },
        { color: 'hsb(255, 100%, 100%)' },
      ])
    })

    it('dim yet unsorted values', async () => {
      snapshot.currentIndex = 2
      expect(model.calculateBars()).toMatchObject([
        { color: 'hsb(0, 100%, 100%)' },
        { color: 'hsb(128, 100%, 100%)' },
        { color: 'hsb(255, 30%, 100%)' },
      ])
    })
  })
})
