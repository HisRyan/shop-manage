<script lang="ts">
import { RuleObject } from "ant-design-vue/lib/form/interface";
import { defineComponent, toRefs, PropType, reactive, ref } from 'vue'
import { Input, Form, Select } from 'ant-design-vue'
import { ApplyMessage } from '@/interface/index'
import UpLoad from '@/components/Upload/index.vue'

const list = defineComponent({
  props: {
    menuArray: {
      type:Object as PropType<ApplyMessage>,
      required:true
    }
  },
  components :{
    'a-input': Input,
    'a-form-item': Form.Item,
    'a-form': Form,
    'a-select': Select,
    'a-select-option': Select.Option,
    UpLoad
  },
  setup(props) {
    const formRef = ref()
    const validateName =  (rule: RuleObject, value: string) => {
      const r = /^\+?[1-9][0-9]*$/
      if (!r.test(value)) {
          return Promise.reject('账号只能输入数字')
      }
      return Promise.resolve()
    }
    const rules = {
      phone: [
        {
          validator: validateName,
          required: true,
          trigger: 'change',
        },
      ],
    }
    const apply = reactive({})
    const sava = (res,name) => {
      apply[name] = res
      console.log(apply)
    }
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return {
      layout,
      sava,
      apply,
      rules,
      formRef
    }
  }
})

export default list

</script>

<template>
  <div class="apply">
    <div class="apply-form">
      <a-form
        v-bind="layout"
        :model="apply"
        ref="formRef"
        label-align="left"
      >
        <a-form-item
          v-for="(item, index) in (menuArray.itemConfigClazzList[0].configItems)"
          :key="index"
          :rules="rules.phone"
          :name="item.attributeName"
        >
          <!--普通输入框-->
          <template #label>
            <span class="apply-form-label"> {{ item.itemName }}</span>
          </template>
          <div v-if="item.configItemType === 1" class="apply_item">
            <div class="apply_option">
              <a-input
                v-model:value="apply[item.attributeName]"
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

          <!--上传文件-->
          <div v-if="item.configItemType === 9" class="apply_item">
            <div class="apply_option">
              <UpLoad
                :image-height="80"
                :image-width="80"
                :max-number="item.imageNum"
                @upload-success="sava($event,item.attributeName)"
              />
            </div>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang='scss' scoped>

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
