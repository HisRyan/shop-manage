// import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
//判断是否是手机
if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
{
    // alert('这是手机')
}
const ua =String( window.navigator.userAgent.toLowerCase());
//判断是否是微信浏览器
if(navigator.userAgent.match(/MicroMessenger/i) ){
    // alert('是微信浏览器')
} else{
    // alert('不是微信浏览器')
}
createApp(App).use(store).use(router).mount('#app')




