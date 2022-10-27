<template>
  <barchart-canvas :snapshot="snapshot" class="barchart-canvas" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarchartCanvas from './components/BarchartCanvas.vue'
import { SelectionSorter } from './lib/domain/SelectionSorter'

function generateDataPoints(n: number, maxValue: number) {
  return [...new Array(n).keys()].map(() => Math.random() * maxValue)
}

const SORT_INTERVAL = 50

export default defineComponent({
  name: 'App',
  components: {
    BarchartCanvas,
  },

  data() {
    const dataPoints = generateDataPoints(200, 1)
    const sorter = new SelectionSorter(dataPoints)
    return { sorter, snapshot: sorter.takeSnapshot() }
  },

  mounted() {
    const interval = setInterval(() => {
      this.sorter.step()
      this.snapshot = this.sorter.takeSnapshot()
      if (this.sorter.isFinished) clearInterval(interval)
    }, SORT_INTERVAL)
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
  min-height: 400px;
  background-color: #f0f0f0;
  padding: 12px;
}
</style>
