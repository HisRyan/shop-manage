/**
 *  created by haojie.li
 *  Date: 2021/4/25
 *  Time: 10:58
 *  Version: 1.0
 *  For:
 */
export  interface mealField {
  activityId: number,
  allowProjectId: string,
  createTime: string,
  enable: string
  id: number,
  image: string,
  menuDepict :string,
  menuName: string,
  price: number
  remainNum: number
  saleNum :number
  salesNum: number
  stockNum: number
  stockType: number
  updateTime: string
}

export interface configList {
  activityId: number
  activityProjectId: number
  applyItemId :number
  attributeName: string
  //配置项类型 1单行文本，2多行文本，3数字输入框，4下拉选择框，5单选框，6多选框，7日期，9上传文件
  configItemType : number
  dataItemNum : string
  dataSources : Array<any>
  englishName? : string
  id :number
  imageNum : number
  itemName : string
  itemNumParamList : Array<any>
  maximumLimit: string
  minimumLimit :string
  number : number
  promptMessage: number
  relevantList: Array<any>
  relevantListVo: Array<any>
  remark :string
  //是否必填
  requiredOrNot :number
  sameTimeMaxNum: number
  verifySms: number,
  rule:Article

}
interface Article {

}
export interface allocationList {
  activityId: number
  activityProjectId: number
  applyItemName: string
  applyItemNameEnglish: string
  bilingual: number
  configItems: Array<configList>
  id: number
  //是否选填
  optional :number
  projectName :string
}
export interface ApplyMessage {
  applyMenuConfigList : Array<mealField> | Array<[]>
  //报名套餐开关 0关1开
  applyMenuSwitch :number
  //报名项配置列表
  itemConfigClazzList: Array<allocationList>
}

export interface GroupList {
  name: String,
  id: number
}
