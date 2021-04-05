<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter} from "vue-router";
import { Layout, Menu, Dropdown } from "ant-design-vue";
import MenuSlier from "../../components/MenuSider.vue";
import { DownOutlined, } from '@ant-design/icons-vue';
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
    DownOutlined,
    Dropdown,
    'a-dropdown':Dropdown,
    'a-menu':Menu,
    'a-menu-item':Menu.Item

  },
  setup() {
    const router = useRouter();
    const exitLogin = () => {
      router.push({
        name: 'signup'
      })
    }
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      exitLogin
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
          display:'flex',
          flexDirection: 'row-reverse'
        }"
      > 
        <a-dropdown >
          <a class="ant-dropdown-link" @click.prevent style="height:40px">
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item>
                <span @click="exitLogin">退出登陆</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </layout-header>
      <layout-content
        :style="{
          margin: '24px 16px 0',
          overflow: 'initial',
          padding: '80px 0px 80px 200px',
          textAlign: 'center',
        }"
      >
        <router-view />
      </layout-content>
      <layout-footer :style="{ textAlign: 'center' }">@李小杰</layout-footer>
    </layout>
  </layout>
</template>

<style lang="scss" scoped></style>
