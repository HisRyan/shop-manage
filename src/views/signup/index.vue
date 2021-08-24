<script lang="ts">
import { defineComponent, ref, UnwrapRef, reactive, watchEffect, onMounted , getCurrentInstance, } from 'vue'
import { Input, Form, Button, Spin, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { RuleObject } from 'node_modules/ant-design-vue/lib/form/interface'
import {  userLogin, applyList } from "../../api"
import {$base64} from "@/utils";
import china  from '../../assets/china.json';
import myButton from "@/components/personView/button/button.vue"

interface FormState {
    name: string | null
    password: string | null
}
const signup = defineComponent({
    components: {
        'a-input': Input,
        'a-form-item': Form.Item,
        'a-form': Form,
        'a-button': Button,
        'a-spin': Spin,
         myButton
    },
    setup() {
        const formRef = ref()
        const chart = ref(null);
        let { proxy } = getCurrentInstance();
        const voiceText = ref<string>('')
        const number = ref(1)
        const router = useRouter()
        const spinning = ref<Boolean>(false)
        const formState: UnwrapRef<FormState> = reactive({
            name: null,
            password: null,
        })
      onMounted(() => {

      });
        watchEffect(() =>  {
          console.log(number.value)
        })
        function clickNumber() {
          number.value ++
        }
        //登录按钮
        const submit = function() {
            formRef.value
                //验证表单
                .validate()
                .then(() => {
                   spinning.value = true;
                   const params  = {
                     username: $base64(formState.name),
                     password: $base64(formState.password),
                     data :{
                        0: new Date()
                     }
                   }
                   userLogin(params)
                    .then((res) => {
                      localStorage.setItem("loginTk",res.data.accessToken)
                      localStorage.setItem('menuList',JSON.stringify(res.data.menus) )
                      localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
                        router.replace({
                          name:'home'
                        })
                    })
                    .catch((error) => {
                        message.error(error)
                        spinning.value = false
                    })
                })

        }

        const resetForm = () => {
            formRef.value.resetFields()
        }

        const register = () => {

        }
        let validateName = async (rule: RuleObject, value: string) => {
            // const r = /^\+?[1-9][0-9]*$/
            // if (!r.test(value)) {
            //     return Promise.reject('账号只能输入数字')
            // }
            return Promise.resolve()
        }
        const rules = {
            name: [
                {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur',
                },
                {
                    validator: validateName,
                    trigger: 'blur',
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur',
                },
                {
                    max: 10,
                    message: '密码最多输入10位',
                    trigger: 'blur',
                },
            ],
        }
        return {
            voiceText,
            rules,
            formRef,
            formState,
            wrapperCol: {
                span: 14,
            },
            labelCol: {
                span: 3,
            },
            submit,
            resetForm,
            register,
            spinning,
            clickNumber,
        }
    },
})

export default signup
</script>

<template>
  <div style="padding-top: 100px">
    <div class="main">
      <a-spin
        size="large"
        tip="登陆中"
        :spinning="spinning"
      >
        <p class="text">
          后台登录系统
        </p>
        <a-form
          ref="formRef"
          :model="formState"
          :wrapper-col="wrapperCol"
          :label-col="labelCol"
        >
          <a-form-item label="账号" name="name" :rules="rules.name">
            <a-input v-model:value="formState.name" @keyup.enter="submit" />
          </a-form-item>
          <a-form-item label="密码" name="password" :rules="rules.password">
            <a-input v-model:value="formState.password" type="password" @keyup.enter="submit" />
          </a-form-item>
          <a-form-item :wrapper-col="{span: 24,offset: 4,}">
            <a-button type="primary" @click="submit">
              登录
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm">
              清除
            </a-button>
            <span class="toRes" @click="register">没有账号点我注册</span>
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <my-button type="success" @click="clickNumber">
        确定
      </my-button>
      <a-button @click="clickNumber">
        数字
      </a-button>
    </div>
    <h1 class="pri-color md:text-color">
      dawd1
    </h1>
    <div class="h-24 bg-gradient-to-r from-red-500" />
  </div>
  <div id="myMap" ref="myMap" class="border"></div>
</template>
<style lang="scss" scoped>
.main {
    width: 500px;
    margin: auto;
    .text {
        font-size: 20px;
        color: rgb(51, 51, 51);
        font-weight: 700;
        width: 370px;
        text-align: center;
    }
    .toRes {
        margin-left: 10px;
        font-size: 12px;
        cursor: pointer;
        &:hover {
            color: rgb(0, 111, 235);
        }
    }
}
</style>
