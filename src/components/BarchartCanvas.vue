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
const BAR_PADDING = 2

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
    viewModel(): BarchartViewModel {
      const viewModel = new BarchartViewModel(this.snapshot, CANVAS_SIZE)
      viewModel.spaceBetweenBars = BAR_PADDING
      return viewModel
    },

    bars() {
      return this.viewModel.bars
    },
  },

  watch: {
    bars() {
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
        p.draw = () => {
          p.background(220)
          this.viewModel.bars.forEach(this.drawSingleBar.bind(this, p))
        }
      }
      return new p5(s, el)
    },

    drawSingleBar(canvas: p5, bar: BarchartBar) {
      const color = canvas.color(bar.color)
      canvas.stroke(color)
      canvas.fill(color)
      canvas.rect(bar.x, bar.y, bar.width, bar.height)
    },
  },
})
</script>
