<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute, RouteLocationMatched } from "vue-router";
import { CloseOutlined } from "@ant-design/icons-vue";
import { Breadcrumb, Button } from "ant-design-vue";
import { remove } from "../../utils";

const crumbs = defineComponent({
  name: "Crumbs",
  components: {
    "a-breadcrumb": Breadcrumb,
    "a-breadcrumb-item": Breadcrumb.Item,
    CloseOutlined,
    Button,
  },
  setup() {
    const route = useRoute();
    const breadcrumbs = ref<RouteLocationMatched[]>([]);
    // 添加面包屑
    const setbreadcrumbs = (route: RouteLocationMatched[]) => {
      route.forEach((value) => {
        if (value.meta.breadcrumb && !breadcrumbs.value.includes(value))
          breadcrumbs.value.push(value);
      });
    };
    const router = useRouter();
    //跳转面包屑
    function breadcrumbRedirect(routeMatched: any) {
      router.replace(routeMatched);
    }
    //删除面包屑
    function delbread(item: any, index: number) {
      breadcrumbs.value = remove(breadcrumbs.value, item);
      //删除的是最后一项，跳转到前一个面包屑
      if (breadcrumbs.value[index]) {
        breadcrumbRedirect(breadcrumbs.value[index].path);
      } else {
        breadcrumbRedirect(breadcrumbs.value[index - 1].path);
      }
    }
    watch(
      () => route.matched,
      () => {
        setbreadcrumbs(route.matched);
      },
      {
        immediate: true,
      }
    );
    return {
      setbreadcrumbs,
      breadcrumbs,
      breadcrumbRedirect,
      route,
      delbread,
    };
  },
});

export default crumbs;
</script>

<template>
  <div class="bread">
    <template v-for="(item, index) of breadcrumbs" :key="index">
      <div
        style="margin-right: 10px"
        class="btn"
        :class="String(item.path) === String(route.path) ? 'route-crumbs' : 'crumbs'"
        @click="breadcrumbRedirect(item)"
      >
        {{ item.meta.name }}
        <span
          v-if="item.name != 'home'"
          style="margin-left: 5px"
          @click.stop="delbread(item, index)"
        >
          <CloseOutlined />
        </span>
      </div>
    </template>
  </div>
  <div class="content">
    <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
  </div>
</template>

<style lang="scss" >
@import  '../../style/transtion';
.bread {
  display: flex;
  .btn {
    background-color: #fff;
    color: #808695;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
  }
  .crumbs {
    &:hover {
      color: #000;
    }
  }
  .route-crumbs {
    color: #2d8cf0;
  }
}
.content {
  margin-top: 20px;
  text-align: center;
}

</style>
