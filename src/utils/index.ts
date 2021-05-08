import { message } from "ant-design-vue";
import dayjs from 'dayjs'
import html2canvas from "html2canvas";
// base64加密
export function $base64(t: string): void {
  return require("js-base64").Base64.encode(t);
}

//确定数据在数组的位置
function arrayPlace(arr: Array<any>, val: any) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val){
      return i;
    }
  }
  return -1;
};

//删除数组指定元素
export function remove(arr: Array<any>,val:any) {
  let index = arrayPlace(arr,val)
  if(index === -1) {
    return arr
  }
  arr.splice(index, 1)
  return arr;
}


export function formatTime(date: string | Date | number, format?: string) {
  const baseFormat = 'YYYY-MM-DD HH:mm:ss'
  if (!date) return ''
  return dayjs(date).format(format || baseFormat)
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}


