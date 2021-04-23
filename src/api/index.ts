
import  { Request ,baseUrl}   from '@/service'

const request =Request.getInstance()


// 用户登录
export const userLogin = (params) => request.post(`/platform/v1/plt/oauth/login`,params )

export {
  applyList
} from  './form'

