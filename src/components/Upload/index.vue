<script lang="ts">
import { defineComponent,ref } from 'vue'
import {Upload as AUpload, message ,Button} from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const Upload = defineComponent({
  components: {
    'a-upload': AUpload,
    'a-button':Button,
    PlusOutlined,
    LoadingOutlined
  },
  setup() {
    const handleChange = (info: FileInfo) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        console.log(fileList.value)
      }
    };

    const fileList = ref([]);
    return {
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      handleChange,
    };
  }
})

export default Upload

</script>

<template>
  <div>
    <a-upload
      v-model:file-list="fileList"
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      :multiple="false"
      action="https://up-z2.qiniup.com"
      :headers="headers"
      @change="handleChange"
    >
      <div class="upload_main">
        <plus-outlined style="font-size: 20px "></plus-outlined>
        <div class="ant-upload-text">上传图片</div>
      </div>
    </a-upload>
  </div>
</template>

<style lang='scss' scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

</style>
