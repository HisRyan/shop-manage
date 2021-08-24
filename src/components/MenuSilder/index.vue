<script lang="ts">
import { defineComponent, ref, VNodeChild, watch } from "vue";
import { Menu } from "ant-design-vue";
import { endArray } from '@/utils'
import { useRoute, useRouter } from "vue-router";
import {
  EditOutlined,
  ContainerOutlined,
  ProjectOutlined,
  CloudUploadOutlined,
  UploadOutlined,
  FormOutlined,
  StarOutlined,
  InsertRowBelowOutlined,
  DashboardOutlined,
  AlertOutlined
} from "@ant-design/icons-vue";
interface itemEvent {
  key: string;
  keyPath: string[];
  item: VNodeChild;
  domEvent: MouseEvent;
}
const MenuSider = defineComponent({
  components: {
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    "a-sub-menu": Menu.SubMenu,
    EditOutlined,
    ContainerOutlined,
    ProjectOutlined,
    CloudUploadOutlined,
    UploadOutlined,
    FormOutlined,
    StarOutlined,
    InsertRowBelowOutlined,
    DashboardOutlined,
    AlertOutlined
  },
  setup() {
    const router = useRouter();
    const menuList: Array<any> = [
      // {
      //   key: 1,
      //   title: "提交表单",
      //   icon: "ContainerOutlined",
      //   children: [
      //     {
      //       key: "form",
      //       title: "自定义表单",
      //       icon: "ProjectOutlined",
      //     },
      //   ],
      // },
      {
        key: "edit",
        title: "富文本",
        icon: "EditOutlined",
        children: [
          {
              key: "edit",
              title:"富文本编辑器",
              icon:'FormOutlined'
          }
        ]
      },
      {
        key: "upload",
        title: "上传文件",
        icon: "CloudUploadOutlined",
        children: [
          {
            key: "upload",
            title: "上传图片",
            icon: "UploadOutlined",
          },
        ],
      },
      {
        key: "table",
        title: "自定义",
        icon: "StarOutlined",
        children: [
          {
            key: "table",
            title: "自定义表格",
            icon: "InsertRowBelowOutlined",
          },
        ],
      },
      {
        key: "receive",
        title: "预约系统",
        icon: "DashboardOutlined",
        children: [
          {
            key: "receive",
            title: "预约领物",
            icon: "AlertOutlined",
          },
        ],
      },
    ];
    const route = useRoute();
    const selectedKeys = ref([])
    const openKeys = ref([])
    watch(
        () => route.matched,
        () => {
          const routeName = route.matched[route.matched.length-1].name
          selectedKeys.value = [routeName]
          if(!openKeys.value.includes(routeName)) {
            openKeys.value.push(routeName)
          }

        },
        {
          immediate: true,
        }
    );
    const toMenu = (e: itemEvent) => {
      router.push({
        name: e.key,
      });
    };

    return {
      selectedKeys,
      menuList,
      toMenu,
      endArray,
      openKeys
    };
  },
});

export default MenuSider;
</script>

<template>
  <div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      theme="light"
      mode="inline"
      @click="toMenu"
    >
      <template
        v-for="item in menuList"
        :key="item.key"
      >
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <component :is="item.icon" />
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="item.key">
            <template #title>
              <component :is="item.icon" />
              <span>
                <span>{{ item.title }}</span>
              </span>
            </template>
            <div
              v-for="itemto in item.children"
              :key="itemto.key"
            >
              <a-menu-item :key="itemto.key">
                <component :is="itemto.icon" />
                <span>{{ itemto.title }}</span>
              </a-menu-item>
            </div>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<style scoped></style>
