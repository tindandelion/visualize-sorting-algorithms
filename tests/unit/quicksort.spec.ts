type Index = number

function swap(array: any[], i: Index, j: Index) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function* partition<T>(data: T[], start: Index, end: Index) {
  function* compare(k: Index, l: Index) {
    yield [k, l]
    return data[k] < data[l]
  }

  let i = start + 1
  let j = end
  while (true) {
    while ((yield* compare(i, start)) && i < end) i++
    while ((yield* compare(start, j)) && j > start) j--
    if (i >= j) break
    swap(data, i, j)
  }
  swap(data, start, j)
  return j
}

function* quicksort<T>(
  data: T[],
  start: Index,
  end: Index
): Generator<number[]> {
  if (end <= start) return
  const i = yield* partition(data, start, end)
  yield* quicksort(data, start, i - 1)
  yield* quicksort(data, i + 1, end)
}

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
