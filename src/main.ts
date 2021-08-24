// import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'ant-design-vue/dist/antd.less';
import router from './router'
import './index.css'
import store from './store'

const app = createApp(App)
app.use(store).use(router).mount('#app')



