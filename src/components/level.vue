<script lang="ts">
import { defineComponent, h} from "vue";

const level = defineComponent({
  props: {
    level: Number,
  },
  setup() {
    return () => h('p',{},'Some text comes first.')
  },
});

export default level;
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
