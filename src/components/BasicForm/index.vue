<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import FormItem from './FormItem'
import { Form } from 'ant-design-vue'
const BasicForm = defineComponent({
  components: {
    'a-form': Form,
    FormItem,
  },
  props: {
    basicProps: {
      type: Object ,
      default: () => {
        return {
          schemas: [],
          labelCol: { span: 6 },
          wrapperCol: { span: 20 },
          layout: 'vertical',
          disabled: false
        }
      }
    }
  },
  setup(props) {
    const basicProps = toRefs(props)
    console.log(basicProps)
    return {

    }

  }
})

export default BasicForm

</script>

<template>
  <a-form>
    <form-item
      v-for="(schema, index) of basicProps"
      :key="index"
      :schema="schema"
    />
  </a-form>
</template>

<style lang='scss' scoped>

</style>
