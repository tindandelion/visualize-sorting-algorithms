<template>
  <div class="container">
    <template v-for="(snapshot, index) in snapshots" :key="index">
      <div class="row mt-3">
        <div
          class="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center"
        >
          <h1 class="text-center text-lg-end">{{ labels[index] }}</h1>
        </div>
        <div class="col-12 col-lg-9">
          <barchart-canvas :snapshot="snapshot" class="barchart-canvas" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BarchartCanvas from './components/BarchartCanvas.vue'
import { NumberSorter } from './lib/domain/NumberSorter'
import { bubblesortSorter } from './lib/domain/sorting-algorithms/bubblesort'
import { quicksortSorter } from './lib/domain/sorting-algorithms/quicksort'
import { selectionSorter } from './lib/domain/sorting-algorithms/selection-sort'

function generateDataPoints(n: number, maxValue: number) {
  return [...new Array(n).keys()].map(() => Math.random() * maxValue)
}

function makeStep(sorters: NumberSorter[]) {
  sorters.forEach((s) => {
    if (!s.isFinished) s.step()
  })
}

function takeSnapshots(sorters: NumberSorter[]) {
  return sorters.map((s) => s.takeSnapshot())
}

function allFinished(sorters: NumberSorter[]) {
  return sorters.every((s) => s.isFinished)
}

const SORT_INTERVAL = 25
const SORTER_ALGORITHMS = [
  { name: 'Bubblesort', sorter: bubblesortSorter },
  { name: 'Selection sort', sorter: selectionSorter },
  { name: 'Quicksort', sorter: quicksortSorter },
]

export default defineComponent({
  name: 'App',
  components: {
    BarchartCanvas,
  },

  setup() {
    const dataPoints = generateDataPoints(200, 1)
    const sorters = SORTER_ALGORITHMS.map(
      ({ sorter }) => new NumberSorter(dataPoints, sorter)
    )
    const snapshots = ref(takeSnapshots(sorters))
    const labels = SORTER_ALGORITHMS.map(({ name }) => name)

    onMounted(() => {
      const interval = setInterval(() => {
        makeStep(sorters)
        snapshots.value = takeSnapshots(sorters)
        if (allFinished(sorters)) clearInterval(interval)
      }, SORT_INTERVAL)
    })

    return { snapshots, labels }
  },
})
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.barchart-canvas {
  min-height: 200px;
  background-color: #f0f0f0;
  padding: 12px;
}
</style>
