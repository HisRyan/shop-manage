
import  { Request ,baseUrl, formType}   from '@/service'

const request =Request.getInstance()


// 用户登录
export const userLogin = (params) => request.post(`/platform/v1/plt/oauth/login`,params )

//请求上传token
export const getQiNiuToken = () => request.get('commonality/open/v2/qiniu/upload/token')

//七牛上传
export const qiNiuUpload = (params) => request.post('https://up-z2.qiniup.com', params)

//文字转声音
export const text2Voice  = (text: string) => request.post(`/platform/api/online/marathon/base/textToSpeech`, { text }, formType)

export {
  applyList,
  applyEnum
} from  './form'

