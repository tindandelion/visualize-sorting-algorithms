import { NumberSorter } from '@/lib/domain/NumberSorter'
import { quicksortSorter } from '@/lib/domain/sorting-algorithms/quicksort'
import { selectionSorter } from '@/lib/domain/sorting-algorithms/selection-sort'

describe('Selection sorter', () => {
  const array = [5, 3, 4, 1, 2]
  let sorter: NumberSorter

  beforeEach(() => {
    sorter = new NumberSorter(array, selectionSorter)
  })

  it('initializes sorter', () => {
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual(array)
    expect(snapshot.highlightedRange).toEqual([0, array.length - 1])
    expect(sorter.isFinished).toEqual(false)
  })

  it('makes a single step', () => {
    sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([5, 3, 4, 1, 2])
    expect(snapshot.comparedPair).toEqual([1, 2])
    expect(sorter.isFinished).toEqual(false)
  })

  it('sorts the entire array', () => {
    while (!sorter.isFinished) sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([1, 2, 3, 4, 5])
    expect(snapshot.highlightedRange).toEqual([0, array.length - 1])
  })
})

describe('Quicksort sorter', () => {
  const array = [5, 3, 4, 1, 2]
  let sorter: NumberSorter

  beforeEach(() => {
    sorter = new NumberSorter(array, quicksortSorter)
  })

  it('initializes sorter', () => {
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual(array)
    expect(snapshot.highlightedRange).toEqual([0, array.length - 1])
    expect(sorter.isFinished).toEqual(false)
  })

  it('makes a single step', () => {
    sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([5, 3, 4, 1, 2])
    expect(snapshot.comparedPair).toEqual([2, 0])
    expect(sorter.isFinished).toEqual(false)
  })

  it('sorts the entire array', () => {
    while (!sorter.isFinished) sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([1, 2, 3, 4, 5])
    expect(snapshot.highlightedRange).toEqual([0, array.length - 1])
  })
})
