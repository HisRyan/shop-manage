<script lang="ts">
import Upload from './'

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
          <DeleteOutlined style="font-size: 30px;color: #ffffff;" @click="remove(index)" />
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
