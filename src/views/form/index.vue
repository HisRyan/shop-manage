<script lang='ts'>
import { applyList,applyEnum} from "@/api";
import { Form, Input, Select,Radio} from "ant-design-vue";
import { RuleObject } from "ant-design-vue/lib/form/interface";
import { log } from "echarts/types/src/util/log";
import { defineComponent, onMounted, reactive, ref } from 'vue'
import Echat from  '@/components/Echart/index.vue'
import UpLoad from '@/components/Upload/index.vue'
import { ApplyMessage, configList} from '@/interface/index'
import PluralRules = Intl.PluralRules;
const form = defineComponent({
  components:{
    Echat,
    'a-input': Input,
    'a-form-item': Form.Item,
    'a-form': Form,
    'a-select': Select,
    'a-select-option': Select.Option,
    UpLoad,
    'a-radio-group':Radio.Group,
    'a-radio':Radio
  },
   setup() {
     //后台返的报名相关信息
     let FormList =  ref<ApplyMessage>({applyMenuConfigList:[],applyMenuSwitch: 0,itemConfigClazzList:[]})
     const apply= ref([])
     const constant = ref({})
     onMounted(async () => {
     await applyList(2196,4154)
       .then((res) => {
         FormList.value = resetList(res.data)
         for(let i=0; i<FormList.value.itemConfigClazzList.length;i++) {
           apply.value[i] = {}
           for(let j=0; j<FormList.value.itemConfigClazzList[i].configItems.length;j++ ) {
             console.log(j)
             FormList.value.itemConfigClazzList[i].configItems[j].rule = [
               {
                 validator: validateName,
                 required: true,
                 trigger: 'change',
                 name: FormList.value.itemConfigClazzList[i].configItems[j].itemName
               }
             ]
           }
         }
         console.log(FormList.value.itemConfigClazzList)
       })
     await applyEnum()
       .then(res => {
         constant.value = res.data
       })
     })
     const sava = (res, name, idx) => {
       apply.value[idx][name] = res
       console.log(apply.value)
     }
     const validateName =  (rule, value: string) => {
       const r = /^\+?[1-9][0-9]*$/
       if(rule.name === '姓名') {
         if(r.test(value)) {
           return Promise.reject('请输入正确的姓名')
         }
       }
       if(rule.name === '是否通过体检') {
         if(value === '0') {
           return Promise.reject('请先参加体检')
         }
       }
       return Promise.resolve()
     }
     const rules = {
           validator: validateName,
           required: true,
           trigger: 'change',
           name:'123'
     }

     const resetList = (arr) => {
         return arr
     }
     const layout = {
       labelCol: { span: 4 },
       wrapperCol: { span: 20 },
     };
     return{
       FormList,
       resetList,
       layout,
       apply,
       sava,
       constant,
       rules
      }
 }

})

export default form

</script>

<template>
  <div>
    <div class="apply">
      <div class="apply-form">
        <div v-for="(itemForm, idx) in (FormList.itemConfigClazzList)" :key="idx">
          <div>
            <span>{{ itemForm.applyItemName }}</span>
            <span>{{ itemForm.optional ? '选填':'' }}</span>
          </div>
          <a-form
            v-bind="layout"
            :model="apply[idx]"
            label-align="left"
          >
            <a-form-item
              v-for="(item, index) in (itemForm.configItems)"
              :key="index"
              :name="item.attributeName"
              :rules="item.rule[0]"
            >
              <!--普通输入框-->
              <template #label>
                <span class="apply-form-label"> {{ item.itemName }}</span>
              </template>
              <div v-if="item.configItemType === 1" class="apply_item">
                <div class="apply_option">
                  <a-input
                    v-model:value="apply[idx][item.attributeName]"
                    :placeholder="'请输入'+item.itemName"
                    size="large"
                    style="border-radius: 5px"
                  />
                </div>
              </div>

              <!--普通下拉框-->
              <div v-if="item.configItemType === 4" class="apply_item">
                <div class="apply_option" style="text-align: left">
                  <a-select size="large" placeholder="请选择">
                    <a-select-option value="jack">
                      1234
                    </a-select-option>
                    <a-select-option value="jackd">
                      12345
                    </a-select-option>
                  </a-select>
                </div>
              </div>

              <!--普通单选框-->
              <div v-if="item.configItemType === 5" class="apply_item">
                <a-radio-group v-model:value="apply[idx][item.attributeName]">
                  <template v-for="(radio, index) in (constant.trueOrFalse)" :key="index">
                    <a-radio :value="index">{{ radio }}</a-radio>
                  </template>
                </a-radio-group>
              </div>

              <!--上传文件-->
              <div v-if="item.configItemType === 9" class="apply_item">
                <div class="apply_option">
                  <UpLoad
                    :image-height="80"
                    :image-width="80"
                    @upload-success="sava($event,item.attributeName,idx)"
                  />
                </div>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <!--    <Echat></Echat>-->
  </div>
</template>

<style lang="scss" scoped>
@import "src/style/mixin";
.apply {
  background-color: rgb(255,255,255);
  padding: 20px;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
  margin: 10px auto;
  &-form {
   width: 600px;
   margin: auto;
  &-label {
   @include fSizeColor(12px,#000);
    }
  .apply_item {
    text-align: left;

   .apply_option {
      width: 300px;
   }
   }
 }
}
.ant-input{
   &::placeholder {
   color:#536080;
   }
}
:global(.ant-form-explain) {
  text-align: left;
}
</style>
