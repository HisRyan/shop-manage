import axios ,{ AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import  { HTTP_STATUS } from '@/enum';

export const baseUrl = '/app/mock/279673'

const successCode = [HTTP_STATUS.ACCEPTED, HTTP_STATUS.CREATED, HTTP_STATUS.SUCCESS]

const serverErrorCode = [HTTP_STATUS.BAD_REQUEST]

import { message } from 'ant-design-vue'



import qs from 'qs'

export const formType = {
  'content-type': 'application/x-www-form-urlencoded'
}

export  class Request {
  //唯一实例
  private static instance: undefined | Request

  //定义请求对象
  private service: AxiosInstance

  //单例获取
  public static getInstance(): Request {
     this.instance || (this.instance = new Request())
     return this.instance
  }
 //构造器
  constructor() {
    this.service = axios.create({
        // @ts-ignore
       baseURL: process.env.VUE_APP_BASE_API,
       // @ts-ignore
       timeout: Number.parseInt(process.env.VUE_APP_TIME!, 10)
    })
    this.requestInterceptors()
    this.responseInterceptors()
  }

  // 请求拦截
  protected requestInterceptors(): void {
    this.service.interceptors.request.use(
       (config: AxiosRequestConfig) => {
          return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // 响应拦截
  protected responseInterceptors(): void {
    console.log( process.env)
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        //七牛上传
        if (response.config.url.includes('up-z2.qiniup.com')) {
          console.log(response.data.code);
          return response.data
        }
        //请求正常
        if(successCode.indexOf(response.status) != -1) {
          //接口返回200
          if(response.data.code === HTTP_STATUS.SUCCESS) {
            return Promise.resolve(response.data)
          }
          return Promise.reject(response.data.message)
        }

      },
      (error: AxiosError) => {
        message.error('网络错误')
        return Promise.reject(error)
      }

    )
  }

  // get请求
  public async get(url:string, params:any = {}, config: object = {}) :Promise<any> {
    return await this.service.get(url,{
      ...config,
      params,
    })
  }

  //post请求
  public async post(url:string, data:any = {} ,header: object = {}) :Promise<any> {
     if(header['content-type']) {
       data = qs.stringify(data)
     }
     return await this.service.post(url,data, {
       headers:header
     })
  }

}


