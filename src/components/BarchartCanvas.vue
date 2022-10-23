<template>
  <div ref="canvas"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import p5 from 'p5'

import { SortingSnapshot } from '@/lib/domain/Sorter'
import {
  BarchartBar,
  BarchartViewModel,
} from '@/lib/view-models/BarchartViewModel'

const CANVAS_SIZE = { width: 900, height: 400 }
const CANVAS_PADDING = 6
const BAR_PADDING = 2

const DRAWABLE_AREA = {
  width: CANVAS_SIZE.width - CANVAS_PADDING * 2,
  height: CANVAS_SIZE.height - CANVAS_PADDING * 2,
}

type ComponentData = {
  canvas?: p5
}

export default defineComponent({
  name: 'BarchartCanvas',
  props: {
    snapshot: { type: Object as PropType<SortingSnapshot>, required: true },
  },

  data(): ComponentData {
    return {}
  },

  mounted() {
    this.canvas = this.createCanvas(this.$refs.canvas as HTMLElement)
  },

  computed: {
    maxValue() {
      return Math.max(...this.dataPoints)
    },

    dataPoints() {
      return this.snapshot.data
    },
  },

  watch: {
    snapshot() {
      this.canvas?.redraw()
    },
  },

  methods: {
    createCanvas(el: HTMLElement) {
      const s = (p: p5) => {
        p.setup = () => {
          p.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height)
          p.noLoop()
        }
        p.draw = this.draw
      }
      return new p5(s, el)
    },

    draw() {
      if (!this.canvas) return
      this.canvas.background(220)
      this.drawBarchart(this.canvas)
    },

    pickValueColor(canvas: p5, index: number, value: number) {
      const hue = (255 * value) / this.maxValue
      const brightness = index < this.snapshot.currentIndex ? 100 : 50
      return canvas.color(`hsb(${hue.toFixed(0)}, 100%, ${brightness}%)`)
    },

    drawBarchart(canvas: p5) {
      const viewModel = new BarchartViewModel(this.snapshot, CANVAS_SIZE.width)
      viewModel.spaceBetweenBars = BAR_PADDING

      for (let i = 0; i < this.dataPoints.length; i++) {
        this.drawValueAsBar(canvas, i, this.dataPoints[i], viewModel.bars)
      }
    },

    drawValueAsBar(canvas: p5, i: number, value: number, bars: BarchartBar[]) {
      const barHeight = (DRAWABLE_AREA.height * value) / this.maxValue

      const startY = CANVAS_SIZE.height - barHeight - CANVAS_PADDING

      const color = this.pickValueColor(canvas, i, value)
      canvas.stroke(color)
      canvas.fill(color)

      canvas.rect(bars[i].x, startY, bars[i].width, barHeight)
    },
  },
})
</script>
