import { createStore } from 'vuex'
import getters from './getters'
//使用vite 批量导入文件的方法拿到module的文件
const modulesFiles = import.meta.globEager('./modules/*.js')

let modules = {}
for (const path in modulesFiles) {
  // 替换/modules/前缀 只拿到文件名作为模块名
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})

const store = new createStore({
  modules,
  getters,
})

export default store
