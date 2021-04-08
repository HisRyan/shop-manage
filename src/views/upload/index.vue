<script lang='ts'>
import { defineComponent } from "vue";
import { Empty } from "ant-design-vue";
import level from "../../components/level.vue"
const upload = defineComponent({
  components: {
    "a-empty":Empty,
    level
  },
  setup() {
    return {};
  },
});

export default upload;
</script>

<template>
  <div>
      <level></level>
      <a-empty />
  </div>
</template>

<style  lang=scss scoped>
</style>