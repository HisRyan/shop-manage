
import  { Request ,baseUrl}   from '@/service'

const request =Request.getInstance()


// 用户登录
export const userLogin = (params) => request.post(`/platform/v1/plt/oauth/login`,params )
//请求上传token
export const getQiNiuToken = () => request.get('commonality/open/v2/qiniu/upload/token')

export const qiNiuUpload = (params) => request.post('https://up-z2.qiniup.com', params)

export {
  applyList,
  applyEnum
} from  './form'

