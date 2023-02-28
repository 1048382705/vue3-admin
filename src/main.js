import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/display.css'
// permission 权限文件
import './router/permission'
window.$Message = ElMessage
const app = createApp(App)
// 路由
app.use(router)
// vuex
app.use(store)
//按需引入组件
import elementPlus from './plugin/elementPlus'
elementPlus(app)

// 按需引入图标
import iconPark from './plugin/iconPark'
iconPark(app)

app.mount('#app')
