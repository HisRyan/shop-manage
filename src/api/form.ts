
import {Request, baseUrl} from "@/service";

const request = Request.getInstance()

//获取报名项
export const applyList = (activityId:number,projectId:number) => request.get('/customer/open/customer/api/apply/manage/buildFormMenu',{activityId,projectId})

//报名枚举
export const applyEnum = () => request.get('/customer/open/api/constants/list')
