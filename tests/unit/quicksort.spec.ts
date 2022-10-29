import { partition, quicksort } from '@/lib/domain/sorting-algorithms/quicksort'

describe('Quicksort implementation', () => {
  it('does the partitioning in one go', () => {
    const data = [...'KRATELEPUIMQCXOS']

    for (let x of partition(data, 0, data.length - 1));
    expect(toString(data)).toEqual('ECAIEKLPUTMQRXOS')
  })

  it('sorts the subranges', () => {
    const data = [...'KRATELEPUIMQCXOS']
    for (let x of quicksort(data, 0, data.length - 1));
    expect(toString(data)).toEqual('ACEEIKLMOPQRSTUX')
  })
})

function toString(array: any[]) {
  return array.join('')
}
