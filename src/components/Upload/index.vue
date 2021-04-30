<script lang="ts">
import { error } from "echarts/types/src/util/log";
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import {Upload as AUpload, message } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined,DeleteOutlined } from '@ant-design/icons-vue';
import  { getQiNiuToken } from "@/api";

interface response {
  hash:string,
  key:string
}
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: response;
  url?: string;
  type?:string;
  size?:number
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const Upload = defineComponent({
  components: {
    'a-upload': AUpload,
    PlusOutlined,
    LoadingOutlined,
    DeleteOutlined
  },
  props: {
    maxNumber: {
      type:Number,
      default:2,
    },
    fileSize: {
      type:Number,
      default:2
    },
    imageWidth: {
      type:Number,
      default:100,
    },
    imageHeight: {
      type:Number,
      default:100,
    }
  },
  emits:['uploadSuccess'],
  setup(props,{emit}) {
    const upToken = reactive({
      token:''
    })
    //允许上传的图片数量
    const { maxNumber, fileSize }  =toRefs(props)
    const imgSrc = ref<Array<string>>([])

    onMounted(() => {
      getQiNiuToken()
      .then((res) => {
        upToken.token = res.data.uploadToken
      })
    })
    //上传后钩子
    const handleChange = (info:FileInfo) => {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        if(maxNumber.value == 1 ){
          imgSrc.value[0] = `https://downloadqn.huodongzhongguo.com/${info.file.response.key}?imageslim`
        } else {

          imgSrc.value.push(`https://downloadqn.huodongzhongguo.com/${info.file.response.key}?imageslim`)
        }
        message.success('上传成功',1);
        // this.$emit('change', this.editor.getContent())
        emit('uploadSuccess',imgSrc.value)
      } else if (info.file.status === 'error') {
        message.error('上传失败，请重新上传');
      }
    };
    //上传前钩子
    const beforeUpload =(file:FileItem) => {
      //文件类型
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
       if(!isJpgOrPng) {
          message.error(`请上传jpg或者png格式文件`)
          return false
       }
       //文件大小
      const isSize = file.size / 1024 / 1024 < fileSize.value;
       if(!isSize) {
         message.error(`文件不能大于${fileSize.value}M`)
         return false
       }
       //达到最多上传数
       if(imgSrc.value.length === maxNumber.value && maxNumber.value != 1) {
         message.error(`最多只能上传${maxNumber.value}张图片`)
         return false
       }
    }
    //移除文件
    const remove = (file) => {
      if(imgSrc.value.length === 1) {
        imgSrc.value = []
      }
       else {
        imgSrc.value = imgSrc.value.filter((item) => {
          return item != file
        })
      }
      emit('uploadSuccess',imgSrc.value)
      message.success('移除成功',1)
    }
    const fileList = ref([]);
    return {
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      handleChange,
      upToken,
      imgSrc,
      beforeUpload,
      remove
    };
  }
})

export default Upload

</script>

<template>
  <div class="upload_main">
    <a-upload
      v-model:file-list="fileList"
      name="file"
      class="avatar-uploader"
      :multiple="false"
      :data="upToken"
      action="https://up-z2.qiniup.com"
      :headers="headers"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      style="height: 50px"
      @change="handleChange"
    >
      <div class="upload_card" :style="{width:imageWidth+'px',height:imageHeight+'px'}">
        <plus-outlined  />
        <div class="ant-upload-text">
          上传图片
        </div>
      </div>
    </a-upload>
    <template v-for="(item, index) in (imgSrc)" :key="index">
      <div class="upload_main-image" :style="{width:imageWidth+'px',height:imageHeight+'px'} ">
        <img :src="item" style="">
        <div class="upload_main-image-cover">
          <DeleteOutlined style="font-size: 30px;color: #ffffff;" @click="remove(item)" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang='scss' scoped>
@import "src/style/mixin";


:global(.ant-upload.ant-upload-select-picture-card){
  width: 20px;
  height: 50px;
}
.upload_card {;
  border: 1px dashed rgb(220,222,226);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ;
  @include flexDisplay(center,center,column);
  margin-right: 10px;
  &:hover {
    border-color:rgb(24,144,255);
  }
}
.upload_main {
  display: flex;
  &-image {
    margin-right:10px;
    cursor: pointer;
    border: 1px solid #ccc;
    padding: 5px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-cover {
      @include absolute(0,0,0,0);
      background: rgba(0,0,0,.6);
      transition: all .3s;
      opacity: 0;
      @include flexDisplay(center,center)
    }
    &:hover &-cover {
      opacity: 1;
    }
  }
}

</style>
