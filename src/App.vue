<template>
  <the-canvas :data-points="dataPoints" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheCanvas from './components/TheCanvas.vue'
import { SelectionSorter } from './lib/SelectionSorter'

function generateDataPoints(n: number, maxValue: number) {
  return [...new Array(n).keys()].map(() => Math.random() * maxValue)
}

export default defineComponent({
  name: 'App',
  components: {
    TheCanvas,
  },

  data() {
    return { dataPoints: generateDataPoints(200, 1) }
  },

  mounted() {
    const interval = setInterval(
      (sorter: SelectionSorter) => {
        sorter.step()
        if (sorter.isFinished) clearInterval(interval)
      },
      100,
      new SelectionSorter(this.dataPoints)
    )
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
