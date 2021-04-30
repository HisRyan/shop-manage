<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Edit from  '@/components/Edit/index.vue'
import { Button,message } from  "ant-design-vue"
const edit = defineComponent({
  components :{
    Edit,
    'a-button':Button,
    message
  },
   setup() {
     const hy = ref(null);
    //保存内容
    const savaEdit = () => {
      //获取编辑器内容
      console.log(hy.value.getValue())
      //清空编辑器
      hy.value.empty()
      message.success('保存成功')

    }
     return{
       savaEdit,
       hy
      }
 }

})

export default edit

</script>

<template>
  <div>
    <Edit ref="hy" />
    <a-button class="sava_button" type="primary" @click="savaEdit">
      保存
    </a-button>
  </div>
</template>

<style  scoped>
.sava_button {
  margin-top: 10px;
}
</style>
