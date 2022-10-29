type Index = number

function swap(array: unknown[], i: number, j: number) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}

function scanFromStart<T>(data: T[], start: Index, end: Index, pivot: T) {
  let i = start
  while (data[i] < pivot && i < end) i++
  return i
}

function scanFromEnd<T>(data: T[], start: number, end: number, pivot: T) {
  let i = end
  while (pivot < data[i] && i > start) i--
  return i
}

function partition<T>(data: T[], start: Index, end: Index) {
  const pivot = data[start]
  let i = start + 1
  let j = end
  while (true) {
    i = scanFromStart(data, i, end, pivot)
    j = scanFromEnd(data, start, j, pivot)
    if (i >= j) break
    swap(data, i, j)
  }
  swap(data, start, j)
  return j
}

function quicksort<T>(data: T[], start: Index, end: Index) {
  if (end <= start) return
  const i = partition(data, start, end)
  quicksort(data, start, i - 1)
  quicksort(data, i + 1, end)
}

describe('Quicksort implementation', () => {
  it('does the partitioning in one go', () => {
    const data = [...'KRATELEPUIMQCXOS']

    let index = partition(data, 0, data.length - 1)
    expect(toString(data)).toEqual('ECAIEKLPUTMQRXOS')
    expect(index).toEqual(5)
  })

  it('sorts the subranges', () => {
    const data = [...'KRATELEPUIMQCXOS']
    quicksort(data, 0, data.length - 1)
    expect(toString(data)).toEqual('ACEEIKLMOPQRSTUX')
  })
})

function toString(array: any[]) {
  return array.join('')
}
