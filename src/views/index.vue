<script lang="ts">
import { defineComponent, ref } from 'vue'
import Home from '@/views/home/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { GroupList } from "@/interface/index"

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
