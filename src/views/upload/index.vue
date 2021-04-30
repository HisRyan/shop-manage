<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import UpLoad from '@/components/Upload/index.vue'
const upload = defineComponent({
    components: {
      UpLoad
    },
    setup() {
      const Sava = (res) =>{
        console.log(res)
      }
        return {
          Sava
        }
    },
})

export default upload
</script>

<template>
  <div>
    <div class="upload_text">
      <UpLoad @uploadSuccess="Sava"></UpLoad>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload_text{
  text-align: left;
}
</style>
