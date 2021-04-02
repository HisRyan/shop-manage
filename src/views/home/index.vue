<script lang="ts">
import { defineComponent, ref } from "vue";
import { Layout, Menu } from "ant-design-vue";
import MenuSlier from "../../components/MenuSider.vue";
const LayoutContent = Layout.Content;
const LayoutHeader = Layout.Header;
const LayoutFooter = Layout.Footer;
const LayoutSider = Layout.Sider;
const home = defineComponent({
  name: "home",
  components: {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutFooter,
    LayoutSider,
    MenuSlier,
  },
  setup() {
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
    };
  },
});

export default home;
</script>

<template>
  <layout>
    <layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        color: 'white',
        paddingTop: '70px',
        background: 'rgb(255,255,255)',
      }"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <MenuSlier />
    </layout-sider>
    <layout style="min-height: 100vh">
      <layout-header
        :style="{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          height: '70px',
          color: 'white',
        }"
      >
        Header
      </layout-header>
      <layout-content
        :style="{ margin: '24px 16px 0', overflow: 'initial', padding: '80px 200px',textAlign: 'center'}"
      >
      <router-view/>
      </layout-content>
      <layout-footer :style="{ textAlign: 'center' }">@李小杰</layout-footer>
    </layout>
  </layout>
</template>

<style lang="scss" scoped></style>
