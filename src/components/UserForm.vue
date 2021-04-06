<script lang='ts'>
import { defineComponent } from "vue";
import component from "*.vue";

const UserForm = defineComponent({
  setup() {
   component:{
        
   }
    return {
      wrapperCol: { span: 14 },
      labelCol: { span: 3 },
    };
  },
});

export default UserForm;
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>
</style>