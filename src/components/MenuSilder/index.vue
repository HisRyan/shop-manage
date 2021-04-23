<script lang="ts">
import { defineComponent, ref, VNodeChild } from "vue";
import { Menu } from "ant-design-vue";
import { useRouter } from "vue-router";
import {
  EditOutlined,
  ContainerOutlined,
  ProjectOutlined,
  CloudUploadOutlined,
  UploadOutlined,
  FormOutlined
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
    FormOutlined
  },
  setup() {
    const router = useRouter();
    const menuList: Array<any> = [
      {
        key: 1,
        title: "提交表单",
        icon: "ContainerOutlined",
        children: [
          {
            key: "form",
            title: "自定义表单",
            icon: "ProjectOutlined",
          },
        ],
      },
      {
        key: "2",
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
        key: 3,
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
    ];

    const newMenuList = localStorage.getItem("menuList")
    const toMenu = (e: itemEvent) => {
      console.log(e.key);
      router.push({
        name: e.key,
      });
    };

    return {
      selectedKeys: ref<string[]>(["1"]),
      menuList,
      toMenu,
      newMenuList
    };
  },
});

export default MenuSider;
</script>

<template>
  <div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
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
