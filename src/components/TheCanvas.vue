<template>
  <div ref="canvas"></div>
</template>

<script lang="ts">
import p5 from 'p5'
import { defineComponent } from 'vue'

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
    dataPoints: { type: Array<number>, required: true },
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

    barWidth() {
      return DRAWABLE_AREA.width / this.dataPoints.length - BAR_PADDING
    },
  },

  methods: {
    createCanvas() {
      const s = (p: p5) => {
        p.setup = () => {
          p.createCanvas(CANVAS_SIZE.width, CANVAS_SIZE.height)
        }
        p.draw = this.draw
      }
      return new p5(s, this.$refs.canvas as HTMLElement)
    },

    forEachDataPoint(callback: (index: number, value: number) => void) {
      for (let i = 0; i < this.dataPoints.length; i++) {
        callback(i, this.dataPoints[i])
      }
    },

    draw() {
      if (!this.canvas) return
      this.canvas.background(220)

      this.drawBarchart(this.canvas)
    },

    pickValueColor(canvas: p5, value: number) {
      const hue = (255 * value) / this.maxValue
      return canvas.color(`hsb(${hue.toFixed(0)}, 100%, 100%)`)
    },

    drawBarchart(canvas: p5) {
      this.forEachDataPoint((i, value) => {
        const startX = CANVAS_PADDING + i * (this.barWidth + BAR_PADDING)
        const barHeight = (DRAWABLE_AREA.height * value) / this.maxValue

        const startY = CANVAS_SIZE.height - barHeight - CANVAS_PADDING

        const color = this.pickValueColor(canvas, value)
        canvas.stroke(color)
        canvas.fill(color)

        canvas.rect(startX, startY, this.barWidth, barHeight)
      })
    },
  },
})
</script>
