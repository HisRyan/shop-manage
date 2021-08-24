<script lang="ts">
import { defineComponent, onMounted } from 'vue'

const signature = defineComponent({
  setup() {
    const initCanvas = () => {
      const canvas = this.$refs.canvasSignature
    }
    onMounted(() => {
      initCanvas()
    })

  }
})

export default signature

</script>

<template>
  <div class="signature">
    <div ref="canvasBox" class="canvas-box">
      <canvas
        ref="canvasSignature"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      />
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
