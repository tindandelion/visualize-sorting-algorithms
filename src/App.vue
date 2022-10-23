<template>
  <the-canvas :snapshot="snapshot" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheCanvas from './components/BarchartCanvas.vue'
import { SelectionSorter } from './lib/SelectionSorter'

function generateDataPoints(n: number, maxValue: number) {
  return [...new Array(n).keys()].map(() => Math.random() * maxValue)
}

const SORT_INTERVAL = 100

export default defineComponent({
  name: 'App',
  components: {
    TheCanvas,
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
