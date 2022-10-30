import { bubblesortSorter } from '@/lib/domain/sorting-algorithms/bubblesort'

describe('Bubblesort imlementation', () => {
  it('handles the empty array', () => {
    const array: number[] = []
    for (let _ of bubblesortSorter(array));
    expect(array).toEqual([])
  })

  it('sorts the array', () => {
    const array = [0, 5, 4, 3, 2, 1]
    for (let _ of bubblesortSorter(array));
    expect(array).toEqual([0, 1, 2, 3, 4, 5])
  })
})
