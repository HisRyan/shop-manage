import { log } from "echarts/types/src/util/log";
import { defineComponent, ref, toRefs, withModifiers,unref, PropType } from 'vue'
import { Form, Input, Select, DatePicker, InputNumber, Col, Cascader, Switch, Radio } from 'ant-design-vue'

const componentMap = new Map()
componentMap
  .set('InputNumber', InputNumber)
  .set('Input',Input)
  .set('InputTextArea', Input.TextArea)
  .set('Select', Select)
  .set('DatePicker', DatePicker)
  .set('RangePicker', DatePicker.RangePicker)
  .set('Cascader', Cascader)
  .set('Switch', Switch)
  .set('Radio', Radio)
  .set('RadioGroup', Radio.Group)

const FormItem = defineComponent({
  inheritAttrs: false,
  props: {
    schema:{
      type: Object,
      required: true
    },
    disabled: {
      required: false,
      type: Boolean,
    }
  },
  setup (props) {
    const { schema, disabled }  = toRefs(props)
    const count = ref(0);
    const inc = (number,nu) => {
      count.value++;
    };
    function getItemProps() {
      return {
        filed: schema.value.filed,
        labelCol: schema.value.lableCol,
        wrapperCol :schema.value.wrapperCol
      }
    }

    function getComponent(schema) {
      const Component = componentMap.get(schema.component)
      return (
        <div>
        <Component
          placeholder= {schema.placeholder}
          {...schema.componentProps}
        />

        </div>
      )
    }
    function renderItem() {
      const { field, label, fieldName } = schema.value
      return (
        <Form.Item
          name={field === false ? null : field}
          label={label}
          { ...getItemProps()  }
        >
          {
            getComponent(unref(schema))
          }
        </Form.Item>
      )
    }
    return () => {
      const getItem = () => {
        return renderItem()
      }
      return(
        <Col>
          { () => getItem() }
        </Col>
      )
    }
  },



})

export default FormItem



