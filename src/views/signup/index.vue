<script lang="ts">
import { defineComponent, ref, UnwrapRef, reactive } from "vue";
import { Input, Form, Button, Spin } from "ant-design-vue";
import { useRouter } from "vue-router";
import { RuleObject } from "node_modules/ant-design-vue/lib/form/interface";
import { $base64 } from "../../utils";
import {fetch } from "../../api"
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
interface FormState {
  name: string;
  age: number | null;
}
const signup = defineComponent({
  components: {
    "a-input": Input,
    "a-form-item": Form.Item,
    "a-form": Form,
    "a-button": Button,
    "a-spin": Spin
  },
  setup() {
    const formRef = ref();
    const voiceText = ref<string>("");
    const router = useRouter();
    const spinning = ref<Boolean>(false)
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      age: null,
    });
    const submit = function() {
      formRef.value.validate()
      .then( () => {
        console.log($base64(formState.name));
        spinning.value = true
        setTimeout(() => {
        fetch("http://rap2api.taobao.org/app/mock/279673/login/1616051665730",{id:1})
        .then(() => {
          router.push({
            name: 'home'
          })
        })  
        }, 1500);
      })
      .catch( (error: ValidateErrorEntity<FormState>) => {
         console.log(error.errorFields);
         
      })
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };
    
    const register = () => {
      localStorage.setItem("user", "123");
      router.push({
        name: "register",
        params: {
          userId: 123,
        },
      });
    };
    let validateName = async (rule: RuleObject, value: string) => {
      var r = /^\+?[1-9][0-9]*$/;
      if (!r.test(value)) {
        return Promise.reject("账号只能输入数字");
      }
      return Promise.resolve();
    };
    const rules = {
      name: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        { validator: validateName, trigger: "blur" },
      ],
      age: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        { max: 10, message: "密码最多输入10位", trigger: "blur" },
      ],
    };
    return {
      voiceText,
      rules,
      formRef,
      formState,
      wrapperCol: { span: 14 },
      labelCol: { span: 3 },
      submit,
      resetForm,
      register,
      spinning
    };
  },
});

export default signup;
</script>

<template>
  <div style="padding-top:100px">
    <div class="main">
      <a-spin size="large" tip="登陆中" :spinning="spinning">
      <p class="text">后台登录系统</p>
      <a-form
        :model="formState"
        :rules="rules"
        ref="formRef"
        :wrapper-col="wrapperCol"
        :label-col="labelCol"
      >
        <a-form-item label="账号" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="密码" name="age">
          <a-input v-model:value="formState.age" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24, offset: 4 }">
          <a-button type="primary" @click="submit">登录</a-button>
          <a-button style="margin-left: 10px" @click="resetForm">清除</a-button>
          <span class="toRes" @click="register">没有账号点我注册</span>
        </a-form-item>
      </a-form>
        </a-spin>
    </div>
  </div>
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
