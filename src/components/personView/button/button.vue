<!--
 *  created by haojie.li
 *  Date: 2021/8/17
 *  Time: 10:18
 *  For:
-->
<script lang="ts">
import { defineComponent, toRefs } from 'vue'

const button = defineComponent({
  props: {
    type: {
      type:String,
      default:'primary'
    }
  },
  setup(props) {
    const type = toRefs(props)
  }
})

export default button

</script>

<template>
  <button v-if="type === 'primary' " class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    <slot/>
  </button>
  <button v-if="type === 'success' " class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    <slot/>
  </button>
</template>

<style lang='scss' scoped>

</style>
