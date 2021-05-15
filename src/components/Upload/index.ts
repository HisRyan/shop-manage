/**
 *  created by haojie.li
 *  Date: 2021/5/11
 *  Time: 10:31
 *  Version: 1.0
 *  For:
 */
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import {Upload as AUpload, message, Input  } from 'ant-design-vue'
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
    DeleteOutlined,

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
    const remove = (number) => {
      if(imgSrc.value.length === 1) {
        imgSrc.value = []
      }
      else {
        imgSrc.value = imgSrc.value.filter((item,index) => {
          return number != index
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


