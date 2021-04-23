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

