<template>
  <div ref="canvas"></div>
</template>

<script lang="ts">
import p5 from 'p5'
import { defineComponent } from 'vue'

const CANVAS_SIZE = { width: 600, height: 400 }

type ComponentData = {
  canvas: p5 | undefined
}

const values = [1, 2, 3, 4, 5]

export default defineComponent({
  name: 'MainCanvas',

  data(): ComponentData {
    return { canvas: undefined }
  },

  mounted() {
    this.canvas = this.createCanvas()
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

    draw() {
      if (!this.canvas) return
      this.canvas.background(220)
      this.drawBarchart()
    },

    drawBarchart() {},
  },
})
</script>
