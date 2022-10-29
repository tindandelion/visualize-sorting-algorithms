import { Index } from '../Sorter'

export function swap(array: unknown[], i: Index, j: Index) {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
}
