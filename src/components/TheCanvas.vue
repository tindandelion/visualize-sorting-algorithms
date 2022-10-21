<template>
  <div id="canvas"></div>
</template>

<script lang="ts">
import p5 from 'p5'

export default {
  name: 'MainCanvas',
  mounted() {
    const s = (p: p5) => {
      p.setup = function () {
        p.createCanvas(700, 410)
      }

      p.draw = function () {
        p.background(0)
        p.fill(255)
        p.rect(100, 100, 50, 50)
      }
    }

    const myp5 = new p5(s)
  },
}
</script>
