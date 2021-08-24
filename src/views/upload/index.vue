<script lang="ts">
import { GroupList } from "@/interface";
import { defineComponent, CSSProperties, ref, computed, onMounted, Ref} from 'vue'
import UpLoad from '@/components/Upload/index.vue'
import html2canvas from 'html2canvas';
import { Moment } from 'moment';
import { Button, message, DatePicker, Input, Cascader } from 'ant-design-vue'
import  { SmileOutlined } from '@ant-design/icons-vue'
import city from "@/assets/js/city.js"
import time from "@/assets/js/time.js"
enum nameDraw {
  success,
  fail,
  wait
}

const nameDrawMap = new Map()
nameDrawMap.set(nameDraw.success,'成功')
nameDrawMap.set(nameDraw.fail,'失败')
nameDrawMap.set(nameDraw.wait,'等待')

const upload = defineComponent({
    components: {
      UpLoad,
      Button,
      message,
      'a-data-picker':DatePicker,
      SmileOutlined,
      'a-textarea':Input.TextArea,
      'a-cascader': Cascader
    },
    setup() {
      const Sava = (res) =>{
        console.log(res)
      }
      const Demo = ref("111")
      const list: GroupList[] = [
        { name:'ad', id: 1 }
      ]
      const list2 = ref<GroupList[]>([{name:"tom", id: 2}])
      const add = <T> (number: Array<T>): Array<T> => {
        return  number
      }

      const list3: [number, string] = [1,'2']
      onMounted(() => {
        add([1,3,4])
      })
      const src = ref('')
      const imageHtml = () => {
        // html2canvas(document.body, {
        //   backgroundColor: '#ffffff',
        //   width:500,
        //   height:600
        // }).then(canvas => {
        //   const imgData = canvas.toDataURL("image/png");
        //   console.log(imgData)
        //   src.value = imgData
        //   fileDownload(imgData);
        //   message.success('导出成功')
        //
        // })
        window.open('https://www.huya.com/','_black')
      }
      const fileDownload =(downloadUrl) => {
        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = downloadUrl;
        aLink.download = "页面.png";
        // 触发点击-然后移除
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      }

      const getCurrentStyle = (current: Moment) => {
        const style: CSSProperties = {};

        if (current.date() === 1) {
          style.border = '1px solid #1890ff';
          style.borderRadius = '50%';
        }
        return style;
      }
        return {
          Sava,
          imageHtml,
          getCurrentStyle,
          nameDrawMap,
          src,
          add,
          value: ref<string[]>([]),
          city,
          time,
        }
    },
})

export default upload
</script>

<template>
  <div>
    <div class="upload_text">
      <UpLoad @uploadSuccess="Sava" />
      <Button
        style="margin: 30px"
        type="danger"
        @click="imageHtml"
      >
        导出当前界面
      </Button>
      <img :src="src">
      <div>
        <a-data-picker placeholder="请选择开始日期">
          <template #suffixIcon>
            <SmileOutlined />
          </template>
        </a-data-picker>
      </div>
    </div>
    <a-cascader v-model:value="value" :options="time" placeholder="Please select" />
  </div>
</template>
