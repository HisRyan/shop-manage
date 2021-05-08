<script>
import { getQiNiuToken, qiNiuUpload } from '@/api'
import { message, Upload, Button } from 'ant-design-vue'
import { formatTime, guid } from '@/utils'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    'a-upload': Upload,
    Editor,
    Button
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    height: {
      type: Number,
      default:600
    }
  },
  data() {
    return {
      val: '',
      uploadData: {
        token: '',
        key: ''
      },
      upDomain: '',
      init: {},
      editor: null,
      editorId: `tiny-${ guid() }`,
    }
  },
  watch: {
    disabled(val) {
      this.editor.setMode(val ? 'readonly' : 'design')
    },
    value() {
      if (this.editor && this.value !== this.editor.getContent()) {
        this.editor.setContent(this.value)
      }
    }
  },
  async created() {
    this.initConfig()
   await getQiNiuToken()
    .then((res) => {
      const { uploadToken,cdn }  = res.data
      this.uploadData.token = uploadToken
      this.upDomain = cdn
    })
  },
  beforeUnmount() {
    this.editor && (this.editor.destroy())
  },
  mounted() {
  },
  methods: {
    initConfig() {
      this.init = {
        selector: `#${ this.editorId }`,
        content_css: '/tinymce/skins/content/default/content.min.css',
        skin_url: '/tinymce/skins/ui/oxide', // skin路径
        language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        height: this.height, // 编辑器高度
        branding: false, // 去水印
        paste_data_images: true, // 允许粘贴图像
        toolbar_mode: 'wrap',
        key:'',
        draggable_modal:true,
        menubar: false, // 隐藏最上方menu
        plugins: 'code advlist table lists paste preview fullscreen link',
        // eslint-disable-next-line max-len
        toolbar: 'redo undo fontselect fontsizeselect forecolor h2 h3 blockquote backcolor | styleselect formatselect indent2em lineheight | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload videoUpload link code | table numlist bullist | preview fullscreen',
        /**
         * tinymce添加自定义插入图片按钮
         */
        setup: editor => {
          editor.on('input Change Undo Redo ExecCommand', () => {
            // if (this.editor) {
            //   this.$emit('update:value', this.editor.getContent())
            //   this.$emit('change', this.editor.getContent())
            // }
          })
          editor.ui.registry.addButton('imageUpload', {
            tooltip: '插入图片',
            icon: 'image',
            onAction: () => {
              document.getElementsByClassName('editor-upload')[0].children[0].children[0].click()
            }
          })
          editor.ui.registry.addButton('videoUpload', {
            tooltip: '插入视频',
            icon: 'embed',
            onAction: () => {
              document.getElementsByClassName('editor-upload')[1].children[0].children[0].click()
            }
          })
        },
      }
    },
    initEditor(e) {
      this.editor = e.target
      this.editor.setContent(this.value || '')
      this.editor.setMode(this.disabled ? 'readonly' : 'design')
    },
    beforeUpload(file) {
      const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp']
      const res = types.includes(file.type)
      if (!res) {
        message.error('请上传.png,.jpg,.jpeg,.bmp格式的图片')
      }
      return res
    },
    beforeVideoUpload(file) {
      const types = ['video/mp4', 'video/wav', 'video/rmvb']
      const res = types.includes(file.type)
      if (!res) {
        message.error('请上传.mp4,.wav,.rmvb格式的视频')
      }
      return res
    },
    /**
     * 必须通过custom request实现，不然上传的key会重复
     * @param file
     * @param type
     * @returns {Promise<void>}
     */
    async customUpload({ file }, type) {
      const formData = new FormData()

      formData.append('token', this.uploadData.token)
      formData.append('file', file)
      formData.append('key', `${ formatTime(new Date(), 'YYYY/MM/DD/HH/mm/ss/SSS') }-${ guid() }`)
      // 返回的key

       await qiNiuUpload(formData)
         .then((res) => {
           this.key =res.key
         })
      // 存储地址
      const src = `${ this.upDomain }/${ this.key }?imageslim`
      // 插入图片或者视频
      if (type === 'img') {
        this.editor.execCommand('mceInsertContent', false, `<img src=${ src } alt="">`)
      } else {
        this.editor.execCommand('mceInsertContent', false, `<video controls src=${ src }>`)
      }
    },
    //获取编辑内内容
    getValue() {
      return this.editor.getContent()
    },
    //清空编辑器内容
    empty() {
      this.editor.setContent('')
    },
  },
}
</script>

<template>
  <div>
    <slot></slot>
    <editor
      :id="editorId"
      :init="init"
      api-key="cuhvsr1pp0tr5ejyjwteig3u5nzux3o33uh6xi4eccoomuaw"
      @init="initEditor"
    />
    <a-upload
      :custom-request="$event => customUpload($event, 'img')"
      :before-upload="beforeUpload"
      multiple
      :show-upload-list="false"
      accept=".png,.jpg,.jpeg,.bmp"
      style="display:none"
      class="editor-upload"
    />
    <a-upload
      :custom-request="$event => customUpload($event, 'video')"
      :before-upload="beforeVideoUpload"
      multiple
      :show-upload-list="false"
      accept=".mp4,.wav,.rmvb"
      style="display:none"
      class="editor-upload"
    />
  </div>
</template>

<style lang='scss' scoped>

</style>
