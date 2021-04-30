import dayjs from 'dayjs'
// base64加密
export function $base64(t: string): void {
  return require("js-base64").Base64.encode(t);
}

//删除数组指定元素
function arrayplace(arr: Array<any>, val: any) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val){
      return i;
    }
  }
  return -1;
};
export function remove(arr: Array<any>,val:any) {
  let index = arrayplace(arr,val)
  if(index === -1) {
    return arr
  }
  arr.splice(index, 1)
  return arr;
}
export const ad = 1

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
