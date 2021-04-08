<script lang="ts">
import { defineComponent} from "vue";
import {Form} from "ant-design-vue"
const UserForm = defineComponent({
  props: {
    formList: Array,
  },
  component: {
    "a-form": Form,
    "a-form-item": Form.Item,
  },
  setup(props) {
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
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <template v-for="(item, index) of formList" :key="index">
        <template>
          <a-form-item :label="item.name" :name="item.name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
        </template>
      </template>
    </a-form>
  </div>
</template>

<style scoped></style>
