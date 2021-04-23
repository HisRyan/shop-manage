<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { Input, Form } from 'ant-design-vue'

const list = defineComponent({
  props: {
    menuArray: {
      required:true
    }
  },
  components :{
    'a-input': Input,
    'a-form-item': Form.Item,
    'a-form': Form,
  },
  setup(props) {
    let menuArray = toRefs(props)
    console.log(menuArray)
    const menuArray2  = [
      {
        name: '姓名',
        type: 1,
      },
      {
        name: '手机号',
        type: 1
      }
    ]
    return {
      menuArray2
    }
  }
})

export default list

</script>

<template>
  <div>
    <a-form>
      <a-form-item v-for="(item, index) of menuArray.itemConfigClazzList" :key="index" :label="item.itemName">
        <!--普通输入框-->
        <div v-if="item.configItemType == 1">
          <a-input  />
        </div>
        <div></div>
      </a-form-item>
    </a-form>

  </div>
</template>

<style lang='scss' scoped>

</style>
