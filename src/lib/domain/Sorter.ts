export interface SortingSnapshot {
  readonly data: number[]
  readonly comparedPair: [number, number]
  readonly highlightedRange?: [number, number]
}
