<script lang="ts">
import { defineComponent, CSSProperties } from 'vue'
import UpLoad from '@/components/Upload/index.vue'
import html2canvas from 'html2canvas';
import { Moment } from 'moment';
import { Button, message, DatePicker } from 'ant-design-vue'
import  { SmileOutlined } from '@ant-design/icons-vue'
const upload = defineComponent({
    components: {
      UpLoad,
      Button,
      message,
      'a-data-picker':DatePicker,
      SmileOutlined
    },
    setup() {
      const Sava = (res) =>{
        console.log(res)


      }
      const imageHtml = () => {
        html2canvas(document.body, {
          backgroundColor: '#ffffff',
          width:500,
          height:600
        }).then(canvas => {
          const imgData = canvas.toDataURL("image/png");
          fileDownload(imgData);
          message.success('导出成功')

        })
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
        }
    },
})

export default upload
</script>

<template>
  <div>
    <div class="upload_text">
      <UpLoad @uploadSuccess="Sava" />
      <Button style="margin: 30px" @click="imageHtml">
        导出当前界面
      </Button>
      <div>
        <a-data-picker  placeholder='请选择开始日期'>
          <template #suffixIcon>
            <SmileOutlined />
          </template>
          <template  #dateRender="{ current, today }">
            <div class="ant-calendar-date" :style="getCurrentStyle(current, today)">
              {{ current.date() }}
            </div>
          </template>
        </a-data-picker>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload_text{
  text-align: left;
}
</style>
