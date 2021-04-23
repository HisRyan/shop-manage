import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'

if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
{

}
else {

}
createApp(App).use(store).use(router).mount('#app')




