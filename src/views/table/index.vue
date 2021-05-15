<script lang="ts">
import { defineComponent, onMounted,ref } from 'vue'
import { table } from  './index'
import { Button, Checkbox } from 'ant-design-vue'
const Table = defineComponent({
  components:{
    Button,
    'a-checkbox-group':Checkbox.Group,
    'a-checkbox':Checkbox
  },
  setup() {
    //确定的2个报名项
    const confirmList = ref([
      {
        name:'姓名',
      },
      {
        name:'手机号',
      }
    ])
    const  tableList = ref([
      {
        name: '号码布'
      },
      {
        name: '性别'
      },
      {
        name: '国家'
      },
      {
        name: '身份证号'
      },
    ])
    //合并后的数组
    const MangeList = ref([])
    const addApply = ref([])
    const addList = () => {
      console.log(addApply.value)
      for(let i=0 ;i<addApply.value.length;i++) {

        confirmList.value.push({name:addApply.value[i]})
      }

      tableList.value = tableList.value.filter(item => {
        return addApply.value.indexOf(item.name) == -1
      })
      console.log(tableList.value)
      addApply.value = []
    }
    const moveUP = (index) => {
      let upDate = tableList.value[index - 1];
      tableList.value.splice(index - 1, 1);
      tableList.value.splice(index,0, upDate);
    }
    onMounted(() => {
      MangeList.value = confirmList.value.concat(tableList.value)
    })
    return {
      MangeList,
      confirmList,
      tableList,
      addApply,
      addList,
      moveUP
    }
  }
})

export default Table

</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<template>
  <div>
    <div v-for="item in confirmList" :key="item.index">
      <div>{{ item.name }}</div>
    </div>
    <div style="text-align: left">
      <a-checkbox-group v-model:value="addApply">
        <transition name="list-complete" tag="p">
          <div v-for="(item,index) in tableList" :key="index">
            <a-checkbox :value="item.name">
              {{ item.name }}
            </a-checkbox>
            <span v-show="index !== 0" @click="moveUP(index)">上移</span>
            <span v-show="index != (tableList.length-1)" @click="moveDown(index)">下移</span>
          </div>
        </transition>
      </a-checkbox-group>
      <div>
        <Button style="margin-top: 20px" @click="addList">
          确定
        </Button>
      </div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import "src/style/mixin";
.table_columns {
  @include fSizeColor(15px,#000);
  @include flexDisplay(center,center);
  div {
    @include wh(70px,50px);
    @include flexDisplay(center,center);
  }

}
</style>
