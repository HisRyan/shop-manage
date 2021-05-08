<script lang="ts">
import { defineComponent } from 'vue'
import Home from '@/views/home/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const index = defineComponent({
  components :{
    Home,
    'a-config-provider':ConfigProvider
  },
  setup() {
    return {
      locale: zhCN,
    }
  }
})

export default index

</script>

<template>
  <div>
    <!--国际化配置 -->
    <a-config-provider :locale="locale">
      <Home></Home>
    </a-config-provider>
  </div>
</template>

<style lang='scss' scoped>

</style>
