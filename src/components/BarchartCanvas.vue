<template>
  <div class="canvas-container">
    <div ref="canvas" class="canvas"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import p5 from 'p5'

import { SortingSnapshot } from '@/lib/domain/Sorter'
import {
  BarchartBar,
  BarchartCalculator,
} from '@/lib/view-models/BarchartCalculator'

function calculateBars(snapshot: SortingSnapshot, canvas: p5) {
  return new BarchartCalculator(snapshot, canvas)
    .withSpaceBetweenBars(2)
    .calculateBars()
}

function drawSingleBar(canvas: p5, bar: BarchartBar) {
  const color = canvas.color(bar.color)
  canvas.stroke(color)
  canvas.fill(color)
  canvas.rect(bar.x, bar.y, bar.width, bar.height)
}

function createCanvas(el: HTMLElement, snapshot: () => SortingSnapshot) {
  const s = (p: p5) => {
    p.setup = () => {
      p.createCanvas(el.clientWidth, el.clientHeight)
      p.noLoop()
    }
    p.draw = () => {
      p.clear(0, 0, 0, 0)
      calculateBars(snapshot(), p).forEach((bar) => drawSingleBar(p, bar))
    }
  }
  return new p5(s, el)
}

export default defineComponent({
  name: 'BarchartCanvas',
  props: {
    snapshot: { type: Object as PropType<SortingSnapshot>, required: true },
  },

  setup(props) {
    const canvasEl = ref()
    const snapshot = () => props.snapshot

    onMounted(() => {
      const canvas = createCanvas(canvasEl.value, snapshot)
      watch(snapshot, () => canvas.redraw())
    })

    return { canvas: canvasEl }
  },
})
</script>

<style scoped>
.canvas-container {
  display: flex;
  align-items: stretch;
}
.canvas {
  flex-grow: 1;
}
</style>
