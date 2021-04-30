<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue'
import { qrcanvas } from 'qrcanvas'

const QRCode = defineComponent({
  props :{
    options:{
      required:true,
      type:Object,
    }
  },
  setup(props) {
    const {options} = toRefs(props)
    onMounted(() => {
      const {url, size , bg} = options.value
      if(url) {
        const canvas = qrcanvas({
          data: url,
          size:  size || 100,
          background: bg || ''
        })
        document.getElementById('qrcode')!.appendChild(canvas)
      }
    })
  }
})

export default QRCode

</script>

<template>
  <div id="qrcode">
  </div>
</template>

<style lang='scss' scoped>

</style>
