import { QuicksortSorter, SelectionSorter } from '@/lib/domain/sorters'

describe('Selection sorter', () => {
  const array = [5, 3, 4, 1, 2]
  let sorter: SelectionSorter

  beforeEach(() => {
    sorter = new SelectionSorter([...array])
  })

  it('initializes sorter', () => {
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual(array)
    expect(snapshot.highlightedRange).toEqual([0, -1])
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
    const array = [5, 3, 4, 1, 2]
    const sorter = new SelectionSorter(array)

    while (!sorter.isFinished) sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([1, 2, 3, 4, 5])
    expect(snapshot.highlightedRange).toEqual([0, 4])
  })
})

describe(QuicksortSorter, () => {
  const array = [5, 3, 4, 1, 2]
  let sorter: QuicksortSorter

  beforeEach(() => {
    sorter = new QuicksortSorter([...array])
  })

  it('initializes sorter', () => {
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual(array)
    expect(snapshot.highlightedRange).toEqual([0, 4])
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
    const array = [5, 3, 4, 1, 2]
    const sorter = new QuicksortSorter(array)

    while (!sorter.isFinished) sorter.step()
    const snapshot = sorter.takeSnapshot()

    expect(snapshot.data).toEqual([1, 2, 3, 4, 5])
    expect(snapshot.highlightedRange).toEqual([0, 4])
  })
})
