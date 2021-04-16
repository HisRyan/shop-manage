<script lang="ts">
import { defineComponent } from "vue";

const register = defineComponent({
  setup() {
    return {};
  },
});

export default register;
</script>

<template>
  <div class="main">
    <p class="text">
      注册界面
    </p>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 500px;
  margin: 100px auto;
  .text {
    font-size: 20px;
    color: rgb(51, 51, 51);
    font-weight: 700;
    width: 370px;
    text-align: center;
  }
}
</style>
