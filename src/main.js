// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n' // 多语言支持
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementLocale from 'element-ui/lib/locale/index'
import messages from './utils/lang' // 多语言文字
import App from './App'
import router from './router'

Vue.use(ElementUI)
Vue.use(VueI18n)

// 设置为 false 以阻止 vue 在启动时生成生产提示.
Vue.config.productionTip = false

localStorage.primaryColor = '#409eff'

/*  以下内容为多语言设置  */
// 设置当前语言默认值--localStorage
let langNow
if (localStorage.lang) {
  langNow = localStorage.lang
} else {
  localStorage.lang = 'zh'
  langNow = 'zh'
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: langNow, // set locale
  messages // set locale messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value)) // 为了实现element插件的多语言切换

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
