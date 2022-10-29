export type Index = number

export type IndexPair = [Index, Index]

export interface SortingSnapshot<T> {
  readonly data: T[]
  readonly comparedPair: IndexPair
  readonly highlightedRange?: IndexPair
}
