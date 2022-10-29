<template>
  <barchart-canvas
    v-for="(snapshot, index) in snapshots"
    :snapshot="snapshot"
    :key="index"
    class="barchart-canvas"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BarchartCanvas from './components/BarchartCanvas.vue'
import { NumberSorter } from './lib/domain/NumberSorter'
import { SelectionSorter, QuicksortSorter } from './lib/domain/sorters'
import { bubblesortSorter } from './lib/domain/sorting-algorithms/bubblesort'

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

const SORT_INTERVAL = 50

export default defineComponent({
  name: 'App',
  components: {
    BarchartCanvas,
  },

  setup() {
    const dataPoints = generateDataPoints(200, 1)
    const sorters = [
      new NumberSorter(dataPoints, bubblesortSorter),
      new SelectionSorter(dataPoints),
      new QuicksortSorter(dataPoints),
    ]
    const snapshots = ref(takeSnapshots(sorters))

    onMounted(() => {
      const interval = setInterval(() => {
        makeStep(sorters)
        snapshots.value = takeSnapshots(sorters)
        if (allFinished(sorters)) clearInterval(interval)
      }, SORT_INTERVAL)
    })

    return { snapshots }
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
  min-height: 300px;
  background-color: #f0f0f0;
  padding: 12px;
}
</style>
