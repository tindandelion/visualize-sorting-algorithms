<template>
  <div ref="canvas"></div>
</template>

<script lang="ts">
import { SortingSnapshot } from '@/lib/Sorter'
import p5 from 'p5'
import { defineComponent, PropType } from 'vue'

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
  name: 'MainCanvas',
  props: {
    snapshot: { type: Object as PropType<SortingSnapshot>, required: true },
  },

  data(): ComponentData {
    return {
      canvas: undefined,
    }
  },

  mounted() {
    this.canvas = this.createCanvas()
  },

  computed: {
    maxValue() {
      return Math.max(...this.dataPoints)
    },

    dataPoints() {
      return this.snapshot.data
    },

    barWidth() {
      return DRAWABLE_AREA.width / this.dataPoints.length - BAR_PADDING
    },
  },

  watch: {
    snapshot() {
      this.canvas?.redraw()
    },
  },

  methods: {
    createCanvas() {
      const s = (p: p5) => {
        p.setup = () => {
          p.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height)
          p.noLoop()
        }
        p.draw = this.draw
      }
      return new p5(s, this.$refs.canvas as HTMLElement)
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
      for (let i = 0; i < this.dataPoints.length; i++) {
        this.drawValueAsBar(canvas, i, this.dataPoints[i])
      }
    },

    drawValueAsBar(canvas: p5, i: number, value: number) {
      const startX = CANVAS_PADDING + i * (this.barWidth + BAR_PADDING)
      const barHeight = (DRAWABLE_AREA.height * value) / this.maxValue

      const startY = CANVAS_SIZE.height - barHeight - CANVAS_PADDING

      const color = this.pickValueColor(canvas, i, value)
      canvas.stroke(color)
      canvas.fill(color)

      canvas.rect(startX, startY, this.barWidth, barHeight)
    },
  },
})
</script>
