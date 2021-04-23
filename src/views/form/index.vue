<script lang='ts'>
import { applyList } from "@/api";
import { defineComponent, onMounted, reactive, ref } from 'vue'
import  list from  '@/components/List/index.vue'
const form = defineComponent({
  components:{
    list
  },
   setup() {
     //后台返的报名项列表
     let FormList  =  reactive({})
     let flag =ref<Boolean>(false)
     onMounted(async () => {
     await applyList(2188,4146)
       .then((res) => {
       //重构表单，便于渲染
       FormList = resetList(res.data)
         console.log(typeof(FormList) )
         flag.value = true
         console.log(FormList)
       })
     })

     const resetList = (arr) => {
         return arr
     }
     return{
       FormList,
       resetList,
       flag
      }
 }

})

export default form

</script>

<template>
  <div>
    自定义表单
    <list :menuArray="FormList" v-if="flag"></list>
  </div>
</template>

<style scoped>

</style>
