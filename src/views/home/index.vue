
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Layout, Menu, Dropdown} from "ant-design-vue";
import MenuSlier from '@/components/MenuSilder/index.vue';
import { DownOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons-vue";
import * as echarts from 'echarts'
import Breadcrumb from "../crumbs/index.vue"
const LayoutContent = Layout.Content;
const LayoutHeader = Layout.Header;
const LayoutFooter = Layout.Footer;
const LayoutSider = Layout.Sider;
const home = defineComponent({
  name: "Home",
  components: {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutFooter,
    LayoutSider,
    MenuSlier,
    DownOutlined,
    Dropdown,
    "a-dropdown": Dropdown,
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    Breadcrumb,
    LoginOutlined,
    UserOutlined
  },
  setup() {
    const router = useRouter();
    const exitLogin = () => {
      router.replace({
        name: "signup",

      });
    };
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      exitLogin,
    };
  },
});

export default home;
</script>

<template>
  <layout>
    <layout-sider
      v-model:collapsed="collapsed"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        color: 'white',
        paddingTop: '70px',
        background: 'rgb(255,255,255)',
      }"
      :trigger="null"
      collapsible
    >
      <MenuSlier />
    </layout-sider>
    <layout style="min-height: 100vh">
      <layout-header
        :style="{
          position: 'fixed',
          zIndex: 99,
          width: '100%',
          height: '70px',
          color: 'white',
          display: 'flex',
          flexDirection: 'row-reverse',
        }"
      >
        <a-dropdown>
          <a
            class="ant-dropdown-link"
            style="height: 40px"
            @click.prevent
          >
            Hover me
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <UserOutlined />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item>
                <LoginOutlined />
                <span @click="exitLogin">退出登陆</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <div>
          <img
            src="@/assets/img/logo.png"
            alt=""
            style="width:40px;height:40px;margin-right:10px"
          >
        </div>
      </layout-header>
      <layout-content
        :style="{
          margin: '24px 16px 0',
          overflow: 'initial',
          padding: '50px 0px 80px 200px',
        }"
      >
        <div style="margin: 16px 20px; font-size: 15px">
          <Breadcrumb />
        </div>
      </layout-content>
      <layout-footer :style="{ textAlign: 'center',width:'700px',margin:'auto' }">

      </layout-footer>
    </layout>
  </layout>
</template>

<style lang="scss" scoped></style>
