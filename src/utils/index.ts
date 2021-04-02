export function $base64 (t:string):void {
  return require("js-base64").Base64.encode(t);
}