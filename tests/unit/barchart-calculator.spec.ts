import { SortingSnapshot } from '@/lib/domain/Sorter'
import { BarchartCalculator } from '@/lib/view-models/BarchartCalculator'

describe('BarchartViewModel', () => {
  const canvasSize = { width: 30, height: 100 }
  const snapshot: SortingSnapshot<number> = {
    data: [0, 0.5, 1],
    comparedPair: [-1, -1] as [number, number],
    highlightedRange: [-1, -1] as [number, number],
  }

  describe('bar horizontal calculations', () => {
    let model: BarchartCalculator

    beforeEach(() => {
      model = new BarchartCalculator(snapshot, canvasSize)
    })

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
      const model = new BarchartCalculator(snapshot, canvasSize)
      expect(model.calculateBars()).toMatchObject([
        { y: 100, height: 0 },
        { y: 50, height: 50 },
        { y: 0, height: 100 },
      ])
    })
  })

  describe('barchart coloration', () => {
    it('calculates hue from the value', () => {
      const model = new BarchartCalculator(snapshot, canvasSize)
      expect(model.calculateBars()).toMatchObject([
        { color: 'hsb(50, 50%, 100%)' },
        { color: 'hsb(153, 50%, 100%)' },
        { color: 'hsb(255, 50%, 100%)' },
      ])
    })

    it('highlights compared elements in red', () => {
      const s: SortingSnapshot<number> = { ...snapshot, comparedPair: [0, 2] }
      const model = new BarchartCalculator(s, canvasSize)

      expect(model.calculateBars()).toMatchObject([
        { color: 'hsb(0, 100%, 100%)' },
        { color: 'hsb(153, 50%, 100%)' },
        { color: 'hsb(0, 100%, 100%)' },
      ])
    })

    it('highlights the specified range with 100% saturation', () => {
      const s: SortingSnapshot<number> = {
        ...snapshot,
        highlightedRange: [0, 1],
      }
      const model = new BarchartCalculator(s, canvasSize)

      expect(model.calculateBars()).toMatchObject([
        { color: 'hsb(50, 100%, 100%)' },
        { color: 'hsb(153, 100%, 100%)' },
        { color: 'hsb(255, 50%, 100%)' },
      ])
    })
  })
})
