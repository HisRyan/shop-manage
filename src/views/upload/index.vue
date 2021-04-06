<script lang='ts'>
import { defineComponent } from "vue";
import { Empty } from "ant-design-vue";
const upload = defineComponent({
  components: {
    "a-empty":Empty
  },
  setup() {
    return {};
  },
});

export default upload;
</script>

<template>
  <div>
      <a-empty />
  </div>
</template>

<style  lang=scss scoped>
</style>