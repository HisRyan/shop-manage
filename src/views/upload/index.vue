<script lang="ts">
import { defineComponent} from 'vue'
import Upload from '@/components/Upload/index.vue'
const upload = defineComponent({
    components: {
      Upload
    },
    setup() {

        return {
        }
    },
})

export default upload
</script>

<template>
  <div>
  <!--上传一张照片-->
    <div class="upload_text">
      <Upload></Upload>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload_text{
  text-align: left;
}
</style>
