import { SelectionSorter } from '@/lib/SelectionSorter'

describe('Selection sorter', () => {
  const array = [5, 3, 4, 1, 2]
  let sorter: SelectionSorter

  beforeEach(() => {
    sorter = new SelectionSorter([...array])
  })

  it('initializes sorter', () => {
    expect(sorter.data).toEqual(array)
    expect(sorter.currentIndex).toEqual(0)
    expect(sorter.isFinished).toEqual(false)
  })

  it('makes a single step', () => {
    sorter.step()

    expect(sorter.data).toEqual([1, 3, 4, 5, 2])
    expect(sorter.currentIndex).toEqual(1)
    expect(sorter.isFinished).toEqual(false)
  })

  it('sorts the entire array', () => {
    while (!sorter.isFinished) sorter.step()

    expect(sorter.data).toEqual([1, 2, 3, 4, 5])
    expect(sorter.currentIndex).toEqual(5)
  })
})
